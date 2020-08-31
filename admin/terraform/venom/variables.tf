variable "revision" {
  description = "commit SHA"
}

variable "lb_target_group" {
  description = "The ALB target group"
}

variable "cluster" {
  description = "the cluster to deploy ecs service"
}

variable "env" {}
variable "env_short" {}
variable "aws_region" {}

variable "app_cpu" {}
variable "app_memory" {}
variable "app_memory_reservation" {}
variable "app_env_vars" {
  type = "list"
  description = "The environments for Venom app container"
}
variable "desired_count" {}