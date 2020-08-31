variable "revision" {}

terraform {
  backend "s3" {
    bucket = "veer-oregon-terraform"
    key = "Venom/terraform.tfstate"
    region = "us-west-2"
    profile = "terraform"
    shared_credentials_file = "~/.aws/credentials"
    dynamodb_table = "terraform_locks"
  }
}

provider "aws" {
  region = "us-west-2"
  shared_credentials_file = "~/.aws/credentials"
  profile = "terraform"
}

module "Venom" {
  source = "../../Venom"

  lb_target_group = "web-Venom-prd"
  cluster = "production"
  env = "production"
  env_short = "prd"
  revision = "${var.revision}"
  aws_region = "us-west-2"

  desired_count = 1
  app_cpu = 0
  app_memory = 1024
  app_memory_reservation = 512
  app_env_vars = [{
    name = "DEFAULT_LANG"
    value = "en"
  },
  {
    name = "SUMO_CATEGORY"
    value = "us/Venom"
  },
  {
    name = "CONFIG_ENV"
    value = "production"
  }]
}