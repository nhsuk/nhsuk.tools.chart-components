resource "azurerm_resource_group" "rg" {
  for_each = local.regions
  name     = "${local.org}-${local.project_name}-rg-${local.environment_short_name}-${each.value.short_name}"
  location = each.value.name
  tags     = local.tags

  lifecycle {
    # costing_pcode, service_level are set via policy
    # created_date, created_by are derived from variables which are updated each time the CI/CD pipeline is run. We only need to keep the initial value for these. 
    ignore_changes = [tags["costing_pcode"], tags["service_level"], tags["created_date"], tags["created_by"]]
  }
}