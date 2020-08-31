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

  lb_target_group = "web-venom-prd"
  cluster = "production"
  env = "production"
  env_short = "prd"
  revision = "${var.revision}"
  aws_region = "cn-north-1"

  desired_count = 1
  app_cpu = 0
  app_memory = 1024
  app_memory_reservation = 512
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
    value = "production"
  }]
}