# This file contains the common variable sused by several resources.

# The unique organisation identifier
variable "org" {
  description = "The unique organisation identifier"
  type        = string
}

# The unique project identifier
variable "project" {
  description = "The unique project identifier"
  type = object({
    name       = string
    short_name = string
  })
}

# The target deployment environment
variable "environment" {
  description = "The target deployment environment"
  type = object({
    name           = string
    shortName      = string
    subscriptionId = string
  })
}