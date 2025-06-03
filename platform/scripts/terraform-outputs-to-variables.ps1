[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [string]
  $TerraformCodePath
)

function SetPipelineVariable(
  [string]$prefix = [string]::Empty,
  [string]$name,
  [string]$suffix = [string]::Empty,
  [string]$separator = [string]::Empty,
  [bool]$isSecret = $false,
  [bool]$isOutput = $true,
  $value
) {

  if ($prefix -ne [string]::Empty) {
    $prefix = "$prefix$separator"
  }

  if ($suffix -ne [string]::Empty) {
    $suffix = "$separator$suffix"
  }

  $varName = ($name) | Join-String -Separator $separator -OutputPrefix "$prefix" -OutputSuffix "$suffix"
  write-host "Setting variable $varName with value $value"
  write-host "##vso[task.setvariable variable=$varName;isoutput=$($isOutput.tostring().ToLower());issecret=$($isSecret.tostring().ToLower())]$value"
}

$terraformOutput = (terraform -chdir="$($TerraformCodePath)" output -json | ConvertFrom-Json)

if ($terraformOutput.PSObject.Properties.Name -contains 'static_web_app_api_key') {

  $apiKeyValue = $terraformOutput.static_web_app_api_key.value
  SetPipelineVariable -name "static_web_app_api_key" -isSecret $true -value $apiKeyValue
} else {
  Write-Warning "Terraform output did not contain a key named 'static_web_app_api_key'."
}
