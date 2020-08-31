# Venom

测试服 https://stgoffline.veervr.tv

正式服 https://offline.veervr.tv

## GET STARTED

```bash
$ npm run dev
$ npm run dev:mock
```

## 部署

部署请一定按照下面邮件模板，发送给能哥申请 域名, docker 空间，elb 部署。

```mail

线上项目部署申请

确保 Gitlab 已经导入了当前 repository;

申请域名 Venom.veervr.tv Venom.veer.tv;

申请 ECR , 申请成功后，你能哥得到一个 [类似的pdf]()。

```

所有资源就位后，你需要手动完善 [gitlab-ci.yml]() 的部署逻辑。

找到 ecr 的 pdf 然后将

<img src="https://assets.veervr.tv/@vrups/57d6590c-a594-45e6-a373-ddbcb5785248.png">

红线内容替换掉 gitlab-ci.yml 中的 YOUR_ECR_US_REPO 或者 YOUR_ECR_CN_REPO。(如果是 cn-north-_ 则表示国内 us-west-_ 代表外海外)。

部署默认会部署国内海外，如果只需要部署国内或者外海，你可以自行注释 gitlab-ci.yml 里的内容；

- \*beijing 代表国内的部署脚本
- \*oregon 代表海外的部署脚本
