# This file contains the local variables used in the Terraform configuration.
# It defines various local variables that are used to store computed values or perform transformations on input variables.

locals {

  # The following code has an inner for loop to add an index property based on lexical sorting done by using toset.
  # This is useful for generating unique VNet address spaces per region.
  regions = { for region in var.regions : lower(region.name) => merge(region, { "index" = [for i, r in sort([for r in var.regions : r.name]) : i if r == region.name][0] }) }

  # The primary_location variable stores the name of the primary region.
  primary_location = [for region in var.regions : lower(region.name) if region.is_primary == true][0]

  # The primary_location_short_name variable stores the short name of the primary region.
  primary_location_short_name = local.regions[local.primary_location].short_name

  # The environment_short_name variable stores the short name of the environment.
  environment_short_name = var.environment.shortName

   # The is_dev_environment variable is true if the environment is "dev", false otherwise.
  # tflint-ignore: terraform_unused_declarations
  is_dev_environment = local.environment_short_name == "dev"

  # The is_int_environment variable is true if the environment is "int", false otherwise.
  # tflint-ignore: terraform_unused_declarations
  is_int_environment = local.environment_short_name == "int"

  # The is_prod_environment variable is true if the environment is "prod", false otherwise.
  # tflint-ignore: terraform_unused_declarations
  is_prod_environment = local.environment_short_name == "prod"

  # The org variable stores the lowercase value of the org input variable.
  org = lower(var.org)

  # The project_name variable stores the lowercase value of the project name input variable.
  project_name = lower(var.project.name)

  # The project_short_name variable stores the lowercase value of the project short name input variable.
  project_short_name = lower(var.project.short_name)

  # The default_tags variable stores the default tags for resources.
  default_tags = {
    "created_date" = timestamp()
    "environment"  = lower(var.environment.name)
  }

 # The tags variable merges the default_tags and resource_tags input variables.
  tags = merge(local.default_tags, var.tags.resource_tags)

}