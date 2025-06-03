resource "azurerm_static_web_app" "web_app" {
  name                = "${local.org}-${local.project_short_name}-swa-${local.environment_short_name}-${var.static_web_app.region.short_name}"
  resource_group_name = azurerm_resource_group.rg[local.primary_location].name
  location            = var.static_web_app.region.name
}

output "static_web_app_api_key" {
    value = azurerm_static_web_app.web_app.api_key
    sensitive = true
}