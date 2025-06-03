/**
 * Variable: tags
 * 
 * Description: A map of strings representing Azure resource tags
 * 
 * Validation:
 * - Checks if all mandatory tags specified in tags.json, object mandatory_tags, are provided.
 * - Throws an error message if any mandatory tags are missing.
 */
variable "tags" {
  type = object({
    resource_tags  = map(string)
    mandatory_tags = list(string)
  })

  description = "A map of strings representing Azure resource tags"
  validation {
    condition     = length(setintersection(keys(var.tags.resource_tags), var.tags.mandatory_tags)) >= length(var.tags.mandatory_tags)
    error_message = "It's required to provide all mandatory tags specified in tags.json, object mandatory_tags."
  }
}
