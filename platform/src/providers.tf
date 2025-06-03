terraform {
  backend "azurerm" {
    resource_group_name  = "from-config"
    storage_account_name = "from-config"
    container_name       = "from-config"
    key                  = "from-config"
    use_azuread_auth     = true
    use_oidc             = true
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
    }
  }
  skip_provider_registration = true
  storage_use_azuread        = true
  subscription_id            = var.environment.subscriptionId
}

provider "azapi" {}

