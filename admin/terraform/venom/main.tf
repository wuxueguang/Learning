data "aws_iam_role" "main" {
  name = "ecsServiceRole"
}

data "aws_lb_target_group" "main" {
  name = "${var.lb_target_group}"
}

data "aws_ecs_cluster" "cluster" {
  cluster_name = "${var.cluster}"
}


data "aws_ecr_repository" "venom" {
  name = "venom"
}

data "template_file" "task_file" {
  template = "${file("${path.module}/task.json")}"

  vars {
    env = "${var.env}"
    aws_region   = "${var.aws_region}"

    app_cpu = "${var.app_cpu}"
    app_image = "${data.aws_ecr_repository.venom.repository_url}:${var.revision}"
    app_memory = "${var.app_memory}"
    app_memory_reservation = "${var.app_memory_reservation}"
    app_env_vars = "${jsonencode(var.app_env_vars)}"
  }
}

resource "aws_ecs_task_definition" "main" {
  family = "venom-${var.env_short}"

  volume {
    name = "venom_log"
    host_path = "/mnt/data/logs/venom"
  }

  volume {
    name = "sumologic_sources"
    host_path = "/mnt/data/sumologic/sources"
  }

  container_definitions = "${data.template_file.task_file.rendered}"
}

resource "aws_ecs_service" "main" {
  name = "venom-${var.env_short}"
  cluster = "${data.aws_ecs_cluster.cluster.arn}"
  task_definition = "${aws_ecs_task_definition.main.arn}"
  desired_count = "${var.desired_count}"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200
  iam_role = "${data.aws_iam_role.main.arn}"

  load_balancer {
    target_group_arn = "${data.aws_lb_target_group.main.arn}"
    container_name = "venom-app"
    container_port = 80
  }

  ordered_placement_strategy {
    type = "spread"
    field = "attribute:ecs.availability-zone"
  }

  ordered_placement_strategy {
    type = "spread"
    field = "instanceId"
  }
}

resource "aws_cloudwatch_log_group" "main" {
  name = "/veer/venom/${var.env}"

  tags {
    env = "${var.env}"
    app = "venom"
  }
}

data "aws_lambda_function" "datadog_collector" {
  function_name = "datadog_log_collector"
  qualifier = "release"
}

resource "aws_cloudwatch_log_subscription_filter" "datadog_collector" {
  name            = "venom-${var.env_short}-datadog_collector"
  destination_arn = "${data.aws_lambda_function.datadog_collector.arn}"
  filter_pattern  = ""
  log_group_name  = "/veer/venom/${var.env}"

  depends_on = ["aws_lambda_permission.datadog_collector"]
}

resource "aws_lambda_permission" "datadog_collector" {
  statement_id  = "venom-${var.env_short}-datadog_collector"
  action        = "lambda:InvokeFunction"
  function_name = "${data.aws_lambda_function.datadog_collector.function_name}"
  qualifier     = "release"
  principal     = "logs.amazonaws.com"
  source_arn    = "${aws_cloudwatch_log_group.main.arn}"
}