<#
.SYNOPSIS
Creates a backend for Terraform using Azure Storage Account.

.DESCRIPTION
This script creates a backend for Terraform by creating an Azure Storage Account and a container named "tfstate" within it.

.PARAMETER Location
Specifies the Azure region where the storage account will be created.

.PARAMETER TFBackendResourceGroup
Specifies the name of the resource group where the storage account will be created.

.PARAMETER terraformstorageaccount
Specifies the name of the storage account to be created.

.PARAMETER SKU
Specifies the SKU (performance tier) of the storage account. Optional parameter.

.PARAMETER Tags
Specifies an array of tags to be applied to the storage account.

.EXAMPLE
create-backend.ps1 -Location "eastus" -TFBackendResourceGroup "myResourceGroup" -terraformstorageaccount "myStorageAccount" -SKU "Standard_LRS" -Tags @{"Environment"="Dev"; "Project"="MyProject"}

This example creates a backend for Terraform in the "eastus" region, using a storage account named "myStorageAccount" with the "Standard_LRS" SKU. It applies the specified tags to the storage account.

#>

Param(
  [string]
  [Parameter(Mandatory = $true)]
  $Location,
  [string]
  [Parameter(Mandatory = $true)]
  $TFBackendResourceGroup,
  [string]
  [Parameter(Mandatory = $true)]
  $terraformstorageaccount,
  [Parameter(Mandatory = $false)]
  $SKU,
  [array]
  [Parameter(Mandatory = $true)]
  $Tags
)

$ErrorActionPreference = "Stop" # Configures the script to stop execution upon encountering any errors.

# Don't need to check if storage exists, as this is taken care of by account vending through LZ.
function ContainerExists {
  param (
      [Parameter(Mandatory=$true, HelpMessage="Storage account name")]
      [string]
      $storageAccount,

      [Parameter(Mandatory=$true, HelpMessage="Resource group name")]
      [string]
      $resourceGroup
  )

  az storage container show `
      --name tfstate `
      --account-name $storageAccount `
      --auth-mode login `
      --only-show-errors 2>$null | Out-Null

  return $LASTEXITCODE -eq 0 ? $true : $false
}

try {
  if(ContainerExists -storageAccount $terraformstorageaccount -resourceGroup $TFBackendResourceGroup) {
    Write-Warning "tfstate container already exists in $terraformstorageaccount. Skipping creation."
    exit 0
  }

  az storage container create `
    --name tfstate `
    --account-name $terraformstorageaccount `
    --auth-mode login
}
catch {
  throw $_
}
