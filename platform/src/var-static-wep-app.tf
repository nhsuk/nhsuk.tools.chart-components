variable "static_web_app" {
  description = "Static Web App configuration"
  type = object({
    region = object({
      name     = string
      short_name = string
    })
  })
}