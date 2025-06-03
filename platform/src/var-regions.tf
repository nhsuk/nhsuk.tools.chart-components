# This variable represents the Azure primary regions to deploy resources to.
# It is a list of objects, where each object contains the following properties:
# - name: The name of the region (string)
# - is_primary: Indicates if the region is the primary region (bool)
# - short_name: The short name of the region (string)
# - cosmosdb: Optional object representing Cosmos DB configuration, with the following properties:
#   - failover_priority: The failover priority of the Cosmos DB region (number)
# - frontdoor_integration: Object representing Front Door integration configuration, with the following properties:
#   - app: Optional object representing Front Door app configuration, with the following properties:
#     - enabled: Indicates if the Front Door app is enabled (bool)
#     - priority: The priority of the Front Door app (number)
#     - weight: The weight of the Front Door app (number)
#   - backend: Optional object representing Front Door backend configuration, with the following properties:
#     - enabled: Indicates if the Front Door backend is enabled (bool)
#     - priority: The priority of the Front Door backend (number)
#     - weight: The weight of the Front Door backend (number)

variable "regions" {
  description = "The Azure primary regions to deploy resources to"
  type = list(object({
    name       = string
    is_primary = bool
    short_name = string
  }))
}
