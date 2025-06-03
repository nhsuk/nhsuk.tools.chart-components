# This output block defines the resource groups in the local.regions map.
# It iterates over the local.regions map and creates a new map with the short_name as the key.
# The value of each key is a map containing the name and location of the corresponding resource group.
output "resource_groups" {
  value = {
    for k, v in local.regions : v.short_name => {
      name     = azurerm_resource_group.rg[k].name
      location = azurerm_resource_group.rg[k].location
    }
  }
}

# This output block defines the primary_location output.
# It provides the name and short_name of the primary location.
output "primary_location" {
  value = {
    name       = local.primary_location
    short_name = local.primary_location_short_name
  }
}
