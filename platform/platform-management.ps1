<#
.SYNOPSIS
  Initialize Azure platform resources and execute terraform commands
.DESCRIPTION
  This script allows to initialize required Azure resources to allow Terraform operations on them.
.NOTES
  Requires:
  - Powershell core
  - Azure CLI
  - Terraform CLI
.EXAMPLE
  ./platform-management.ps1 -action init -configurationName int
  Initializing a int configuration.
.EXAMPLE
  ./platform-management.ps1 -action plan
  Run a Terraform plan for previously initialized configuration.
.EXAMPLE
  ./platform-management.ps1 -action plan -configurationName int
  Run a Terraform plan for a configuration already initialized (after a reboot).
.EXAMPLE
  ./platform-management.ps1 -action apply
  Apply a previously generated Terraform plan to current initialized configuration.
.EXAMPLE
  ./platform-management.ps1 -action apply -forceNewPlan
  Generate a terraform plan and apply it to current initialized configuration.
.PARAMETER action
  This parameter is used to specify the Terraform action to perform. The following actions are supported:
  - "init": Initialize a new or existing Terraform working directory by creating initial files, loading any remote state, downloading modules, etc.
  - "plan": Create an execution plan.
  - "apply": Apply the changes required to reach the desired state of the configuration.
  - "console": Interactive console for Terraform interpolations.
  - "import": Import existing infrastructure into your Terraform state.
  - "validate": Validates the Terraform files.
  - "destroy": Destroy Terraform-managed infrastructure.
  - "force-unlock": Manually unlock the state for the defined configuration.
  - "output": Read an output from a state file.
  - "graph": Create a graph of Terraform resources.
.PARAMETER configurationName
  The configuration to be used.
  A corresponding ./vars/<configurationName>.json file has to exist.
.PARAMETER replaceResource
  This switch parameter is used to indicate that a specific Terraform resource should be replaced.
  When this parameter is used, the resource name must be provided via the 'resource' parameter.
.PARAMETER resource
  This parameter is used to specify the name of the Terraform resource to import or replace.
  It is mandatory when the 'replaceResource' parameter is used.
.PARAMETER address
  The Azure resource Id to be matched for a Terraform resource name when importing.
  This parameter is required for resource specific actions like:
  import
.PARAMETER forceNewPlan
  This switch parameter is used to force the creation of a new Terraform plan.
.PARAMETER lockId
  This parameter is used with action "unlock" to unlock a Terraform state file, and specifies the lock id given by failed operation.
.PARAMETER useServicePrincipalCredential
  This parameter instructs th script to use service principal authentication using a supplied PSCredential object.

  To create a PSCredential object:
  New-Object PSCredential -argumentlist "service principal id", (ConvertTo-SecureString "service principal secret" -AsPlainText -Force)
.PARAMETER servicePrincipalCredential
  This parameter is used with useServicePrincipalCredential parameter to supply a PSCredential object for service principal authentication.
.PARAMETER tenantId
  This parameter is used with useServicePrincipalCredential parameter to supply a tenant id for service principal authentication.
#>

[CmdletBinding(DefaultParameterSetName = 'Default')]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Enter terraform action to perform, e.g. plan, apply, console, import, destroy, force-unlock")]
  [ValidateSet("init", "plan", "apply", "console", "import", "validate", "destroy", "force-unlock", "output", "graph")]
  [string]
  $action,

  [Parameter(Mandatory = $false , HelpMessage = "Enter configuration name, e.g. int, stag, prod`rIt requires a config JSON file exists for it in vars folder.")]
  [ValidateScript({
            (!([string]::IsNullOrEmpty($_)) -or $env:TERRAFORM_CONFIGURATION -ne $null) -and (Test-path -Path $PSScriptRoot/vars/$_.json -PathType Leaf)
    },ErrorMessage = "Configuration name {0} can't be empty or not found in vars folder")]
  [string]
  $configurationName,

  [Parameter(Mandatory = $false)]
  [switch]$forceNewPlan,

  [Parameter(ParameterSetName = "ReplaceResource", Mandatory = $false)]
  [switch]$replaceResource,

  [Parameter(HelpMessage = "Enter terraform resource name", ParameterSetName = "ImportResource", Mandatory = $false)]
  [Parameter(HelpMessage = "Enter terraform resource name", ParameterSetName = "ReplaceResource", Mandatory = $true)]
  [ValidateScript({
      $action -eq "import" -and !([string]::IsNullOrEmpty($_))
    },ErrorMessage = "resource can't be empty")]
  [string]
  $resource,

  [Parameter(HelpMessage = "Enter Azure resource Id", ParameterSetName = "ImportResource", Mandatory = $true)]
  [ValidateScript({
      $action -eq "import" -and !([string]::IsNullOrEmpty($_))
    }, ErrorMessage = "address can't be empty")]
  [string]
  $address,

  [Parameter(Mandatory = $false)]
  [ValidateScript({
    $action -eq "force-unlock" -and !([string]::IsNullOrEmpty($_))
  }, ErrorMessage = "lockId can't be empty")]
  [string]$lockId,

  [Parameter(ParameterSetName = "ServicePrincipal", Mandatory = $false)]
  [switch]$useServicePrincipalCredential,

  [Parameter(ParameterSetName = "ServicePrincipal", Mandatory = $true)]
  [pscredential]$servicePrincipalCredential,

  [Parameter(ParameterSetName = "ServicePrincipal", Mandatory = $true)]
  [string]$tenantId,

  [Parameter(Mandatory=$false, HelpMessage="Initialize Terraform remote backend")]
  [switch]
  $BootstrapBackend
)

$ErrorActionPreference = "Stop"

Function IIf($If, $Right, $Wrong) {
  If ($If) {
    $Right
  }
  Else {
    $Wrong
  }
}

Function ValidateCurrentAzAccount() {
  $userType = $(az account show --query 'user.type' -o tsv)

  if ($? -eq $false) {
    write-error "No subscriptions found, please run az login first!"
    return $false
  }

  if ($userType -eq "servicePrincipal") {
    write-error "Terraform can't use Azure CLI authentication done with a service principal.`nPlease run az logout and run az login with a user account!"
    return $false
  }

  return $true
}

$script_location = $PSScriptRoot
$src_path = "$script_location/src"
$var_files_path = "$script_location/vars"

$env:TF_VAR_release_date = "$([Datetime]::UtcNow.Date.toString("yyyy/MM"))"
$env:TF_VAR_release_version = "0.0.0"

# Set use environment variables if present, to set values for location and environment

$configurationName = (iif ([string]::IsNullOrEmpty($configurationName)) $env:TERRAFORM_CONFIGURATION $configurationName)

# Read environment configuration file
$configurationObj = (Get-Content $var_files_path/$configurationName.json | convertfrom-json)

$environment = $configurationObj.environment

# Attempt to load primary location information from local config file
$locationObj = $configurationObj.regions | Where-Object { $_.is_primary -eq $true }

# Get organization name from environment configuration object
$organization = $configurationObj.org

$subscriptionId = $configurationObj.environment.subscriptionId

# Attempt to load primary location information from local config file
$projectName = $configurationObj.project.name
$projectShortName = $configurationObj.project.short_name

if ($locationObj.length -ne 1) {
  throw("Expected only 1 primary region and found $($locationObj.length)!")
}

# Define Terraform backend resource group and storage names
$resourceGroup = "$organization-$projectName-rg-$($environment.shortName)-$($locationObj.short_name)"
$tfStorageAccountName = "${projectName}tfst$($environment.shortName)$($locationObj.short_name)"
$storageSKU = "Standard_GRS"

[bool]$useRegionVars = (Test-Path -Path "$var_files_path/$configurationName-$($locationObj.short_name).json" -PathType Leaf)

# Define Azure tags to be used when initializing resource groups
$mandatory_tags = (Get-Content $script_location/tags.json | ConvertFrom-Json).tags.mandatory_tags
$resource_tags = (Get-Content $script_location/tags.json | ConvertFrom-Json).tags.resource_tags

$intersected_tags = Compare-Object -PassThru $resource_tags.PSObject.Properties.name $mandatory_tags -IncludeEqual -ExcludeDifferent

if ($intersected_tags.count -lt $mandatory_tags.count) {
  throw("Missing one or more specified mandatory tags!")
}

$tags = $resource_tags.PSObject.Properties | foreach-object { "$($_.name)=$($_.value)" }

$defaultTags = @(
  "created date=$([Datetime]::UtcNow.Date.toString("yyyy/MM"))",
  "environment=$($environment.name)"
)

$tags += $defaultTags

<#-
    This function is a small wrapper around terraform commands and parameters for this specific project
    Given an action it will run decide if there's sequence to run before or if it will run immediately.

    E.g. an init action runs without terraform previous command, a plan/apply will issue a validate action first to save time
#>
function ExecuteTerraform($action) {

  # Uncomment the following line to enable Terraform debug logs
   #$env:TF_LOG="debug"

  write-host "Terraform: $action" -ForegroundColor Green

  switch ($action) {
    # Specific block for init command
    "init" {

      if ($useServicePrincipalCredential) {
        # Login to Azure using service principal credentials
        az login `
          --service-principal `
          -u $servicePrincipalCredential.UserName `
          -p "$($servicePrincipalCredential.GetNetworkCredential().Password)"  `
          --tenant $tenantId
      }
      
      # Run a script that upserts the storage account tfstate container
      & $script_location\scripts\create-backend.ps1 `
        -Location $locationObj.name `
        -TFBackendResourceGroup $resourceGroup `
        -terraformstorageaccount $tfStorageAccountName `
        -SKU $storageSKU `
        -Tags $tags

      if ($useServicePrincipalCredential) {
        # Initialize Terraform
        az logout
      }

      terraform -chdir="$src_path" `
        init `
        -no-color `
        -backend-config="$var_files_path/$configurationName$($locationObj.short_name)-backend.tfvars" `
        -reconfigure -upgrade   # The upgrade parameter is here just to handle sudden changes in provider versions, so it can immediately downgrade/upgrade/install providers

      # Set environment variables for commodity, so other commands can be invoked without repeating configurationName
      $env:TERRAFORM_CONFIGURATION = $configurationName

      write-host "`n"
      Write-host "Environment variable TERRAFORM_CONFIGURATION set to $configurationName" -ForegroundColor Blue
      Write-host "You can now run other local-run.ps1 actions without specifying configuration name" -ForegroundColor Blue
      write-host "`n"
    }

    # Specific block for import command that takes 2 aditional parameters, resource and address
    "import" {
      write-host "Running validation first" -ForegroundColor Blue

      # Run validation first
      ExecuteTerraform "validate"

      # Import a resource into the state
      terraform -chdir="$src_path" `
        import `
        -var-file="$var_files_path/$configurationName.json" `
        -var-file="$script_location/tags.json" `
        $resource `
        $address
    }
    # Terraform validate block
    "validate" {
      terraform -chdir="$src_path" `
        validate
    }

    "console" {
      write-host "Running validation first" -ForegroundColor Blue

      # Run validation first
      ExecuteTerraform "validate"

      # Run the action
      if ($?) {

        $cmd = @"
terraform -chdir="$src_path" \
  $action \
  -var-file="$var_files_path/$configurationName.json" \
  -var-file="$script_location/tags.json" $(iif $useRegionVars "-var-file=`"$var_files_path/$configurationName-$($locationObj.short_name).json`"" $null )
"@
        write-host "Run the following terraform console in bash for better input experience" -ForegroundColor Blue
        write-host $cmd -ForegroundColor White

        # Save the exit code
        $terraformPlanExitCode = $LASTEXITCODE
      }
    }

    "apply" {
      write-host "Running validation first" -ForegroundColor Blue

      # Run validation first
      ExecuteTerraform "validate"

      if ($?) {
        [Boolean]$usePlan = $false

        # Check if a plan exists
        $usePlan = ((Test-Path -Path "$src_path/../output/$configurationName.tfplan" -PathType Leaf) -and !$forceNewPlan)

        if ($usePlan) {
          write-host "Found a previously saved plan at $src_path/../output/$configurationName.tfplan and will use it."
        }
        else {
          write-host "No cached plan found or a new plan being enforced."
        }

        # Apply the plan
        terraform -chdir="$src_path" `
          $action `
          -parallelism=10 `
        $(iif (!$usePlan) "-var-file=$var_files_path/$configurationName.json" $null) `
        $(iif (!$usePlan) "-var-file=$script_location/tags.json" $null) `
        $(iif ($useRegionVars -and !$usePlan)  "-var-file=`"$var_files_path/$configurationName-$($locationObj.short_name).json`"" $null ) `
        $(iif ($replaceResource) "-replace=`"$resource`"" $null) `
        $(iif ($usePlan) "$src_path/../output/$configurationName.tfplan" $null ) # If a plan exists, use it
      }
    }

    "graph" {
      write-host "Running validation first" -ForegroundColor Blue

      # Run validation first
      ExecuteTerraform "validate"

      if ($?) {
        [Boolean]$usePlan = $false

        # Check if a plan exists
        $usePlan = ((Test-Path -Path "$src_path/../output/$configurationName.tfplan" -PathType Leaf) -and !$forceNewPlan)

        if ($usePlan) {
          write-host "Found a previously saved plan at $src_path/../output/$configurationName.tfplan and will use it."
        }
        else {
          write-host "No cached plan found or a new plan being enforced."
        }
        # Generate graph
        terraform -chdir="$src_path" `
          $action `
        $(iif ($usePlan) "-plan=`"$src_path/../output/$configurationName.tfplan`"" $null ) # If a plan exists, use it
      }
    }

    "force-unlock" {
      if ([string]::IsNullOrEmpty($lockId)) {
        throw "Missing lockId parameter required with unlock action"
      }

      terraform -chdir="$src_path" `
        $action `
        $lockId
    }

    "output" {
      terraform -chdir="$src_path" `
      $action
    }

    # Generic block for remaining commands handled by this script
    Default {
      write-host "Running validation first" -ForegroundColor Blue

      # Run validation first
      ExecuteTerraform "validate"

      # Run the action
      if ($?) {
        terraform -chdir="$src_path" `
          $action `
          -var-file="$var_files_path/$configurationName.json" `
          -var-file="$script_location/tags.json" `
        $(iif $useRegionVars "-var-file=`"$var_files_path/$configurationName-$($locationObj.short_name).json`"" $null ) `
        $(iif $($action -ilike "plan") "-detailed-exitcode" $null) `
        $(iif $($action -ilike "plan") "-out=$src_path/../output/$configurationName.tfplan" $null)

        # Save the exit code
        $terraformPlanExitCode = $LASTEXITCODE

        # If the action is plan and the exit code is 0 or 2, show the plan
        if ($action -ilike "plan" -and $terraformPlanExitCode -in 0, 2 ) {
          terraform -chdir="$src_path" `
            show `
            -json `
            "$src_path/../output/$configurationName.tfplan" `
            > "$src_path/../output/$configurationName.json"
        }
      }
    }
  }
}

# Stores current working directory to later restore it
if ((get-location).path -ne $script_location) {
  Push-Location
}

Set-Location $script_location

write-host "`r"
write-host "Executing from: " $script_location -ForegroundColor Blue
Write-host "Parameters:" -ForegroundColor Blue
Write-host "Action: $action" -ForegroundColor Blue
write-host "Force new plan on apply: $forceNewPlan" -ForegroundColor Blue
write-host "Using service principal: $useServicePrincipalCredential" -ForegroundColor Blue
Write-host "Configuration name: $configurationName" -ForegroundColor Blue
Write-host "Primary location: $($locationObj.name)" -ForegroundColor Blue
write-host "Resource: $resource" -ForegroundColor Blue
write-host "Address: $address" -ForegroundColor Blue
write-host "`r"

# Set the error action preference to stop on all errors
$ErrorActionPreference = "Stop"

try {

  # Check if the useServicePrincipalCredential parameter is set
  if ($useServicePrincipalCredential) {

    # Check if the servicePrincipalCredential parameter is null or empty
    if ($null -eq $servicePrincipalCredential -or [string]::IsNullOrEmpty($tenantId)) {

      # Throw an error if the servicePrincipalCredential parameter is null or empty
      throw "Missing required parameters to use Service Principal authentication!"
    }

    # Set the ARM_CLIENT_ID environment variable to the servicePrincipalCredential username
    $ENV:ARM_CLIENT_ID = $servicePrincipalCredential.UserName

    # Set the ARM_CLIENT_SECRET environment variable to the servicePrincipalCredential password
    $ENV:ARM_CLIENT_SECRET = $servicePrincipalCredential.GetNetworkCredential().Password

    # Set the ARM_SUBSCRIPTION_ID environment variable to the subscriptionId parameter
    $ENV:ARM_SUBSCRIPTION_ID = $subscriptionId

    # Set the ARM_TENANT_ID environment variable to the tenantId parameter
    $ENV:ARM_TENANT_ID = $tenantId
  }
  else {
    # Validate that the current Azure CLI authentication/subscriptions are valid
    if (!(ValidateCurrentAzAccount)) {
      # Throw an error if no valid Azure CLI authentication/subscriptions are found
      throw "No valid Azure CLI authentication/subscriptions found."
    }
  }

  # Force Azure CLI and Powershell Az module to use the right subscription depending on the configuration value
  if (!$useServicePrincipalCredential){
    az account set -s "$subscriptionId"
  }

  # Run desired Terraform action
  ExecuteTerraform $action

}
catch {
  # Write the error to the error stream
  Write-Error $Error[0]
}
finally {
  # Restore previous working directory being used before running this script
  Pop-Location

  # Clear the ARM_CLIENT_ID environment variable
  $ENV:ARM_CLIENT_ID = $null

  # Clear the ARM_CLIENT_SECRET environment variable
  $ENV:ARM_CLIENT_SECRET = $null

  # Clear the ARM_SUBSCRIPTION_ID environment variable
  $ENV:ARM_SUBSCRIPTION_ID = $null

  # Clear the ARM_TENANT_ID environment variable
  $ENV:ARM_TENANT_ID = $null
}

# Exit with the last exit code
exit $LASTEXITCODECODEITCODE

