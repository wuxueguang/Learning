variable "revision" {}

terraform {
  backend "s3" {
    bucket = "veer-beijing-terraform"
    key = "venom/terraform.tfstate"
    region = "cn-north-1"
    profile = "terraform"
    shared_credentials_file = "~/.aws/credentials"
    dynamodb_table = "terraform_locks"
  }
}

provider "aws" {
  region = "cn-north-1"
  shared_credentials_file = "~/.aws/credentials"
  profile = "terraform"
}

module "venom" {
  source = "../../venom"

  lb_target_group = "web-venom-stg"
  cluster = "staging"
  env = "staging"
  env_short = "stg"
  revision = "${var.revision}"
  aws_region = "cn-north-1"

  desired_count = 1
  app_cpu = 0
  app_memory = 512
  app_memory_reservation = 256
  app_env_vars = [{
    name = "DEFAULT_LANG"
    value = "zh-CN"
  },
  {
    name = "SUMO_CATEGORY"
    value = "cn/venom"
  },
  {
    name = "CONFIG_ENV"
    value = "staging"
  }]
}