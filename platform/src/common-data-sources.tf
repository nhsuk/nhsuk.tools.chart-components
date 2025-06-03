# This data block retrieves the current Azure client configuration.
data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "platform_mgmt" {
  name     = "${local.org}-${local.project_name}-platform-rg-${local.environment_short_name}-${local.primary_location_short_name}"
}

data "azurerm_storage_account" "terraform_backend" {
  name                = "${local.project_name}tfst${local.environment_short_name}${local.primary_location_short_name}"
  resource_group_name = data.azurerm_resource_group.platform_mgmt.name
}
