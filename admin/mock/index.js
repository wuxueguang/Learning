console.log('enter=======')
module.exports = {
  "POST /offline/biz/auth/signin": {
    "data": {
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mjk1ODU3LCJ1c2VyaWQiOiIwMWUwZWQ2NWM4NDk3Yzg4IiwidXNlcm5hbWUiOiJseXBoaWxpcCIsImV4cCI6MTU1ODIzNTM5OH0.d4V8cYhppK_ZOlC49_9Xny8Q5fIDk-ypIxJTdSiZCSI",
      "user": {
        "id": 1,
        "username": "veertest",
        "name": "VeeR Test Account",
        "phone": "1234567890",
        "address": "北京市海淀区中关村大厦2018"
      }
    }
  },
  "GET /offline/business/menu": {
    "data": [{
      name: "Dashboard",
      target: '/'
    }, {
      name: "体验区管理",
      children: [{
          name: "体验区A",
          target: "zone",
          param: {
            id: "iuhnawpeunapsdo"
          }
        }, {
          name: "体验区B",
          children: [{
            name: "体验区BA",
            target: "zone",
            param: {
              id: "uonau9nsdfasdf"
            }
          }]
        },
        {
          name: "体验区C",
          target: "zone",
          param: {
            id: "iadsfdsfdeunapsdo"
          }
        },
      ]
    }, {
      name: "Settings",
      target: "settings"
    }]
  },
  "GET /offline/biz/zones": {
    "data": [{
        "id": "8fuUV85dT1aD8KS1YcCBsg",
        "type": "zone",
        "name": "权金城西八里庄店1",
        "address": "权金城西八里庄店（北京市海淀区西八里庄北里25号）",
        "qr_code": "https://qvcdn.veervr.tv/offline/zone/8fuUV85dT1aD8KS1YcCBsg/u9suf5fccsstyfgwvnlrv44ggwafi9v8.png?sign=b28d8702633b880c174b9c849a20d80a&t=5cef1d00&watermark/2/text/Q0JzZw==/gravity/NorthEast/dx/10/dy/10",
        "contents_count": 5,
        "tickets_count": 152,
        "total_income": "1191.9",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "asdfalsdjkfl412",
            "type": "zoneAsset",
            "asset_type": "cover_pic",
            "name": "test cover",
            "file": "https://qvcdn.veervr.tv/asdugpoi4124.png?sign=26b178f6773d4f983c323d87d5811ad3&t=5cef1d00"
          },
          "preview": {
            "id": "asdhgtk4124",
            "type": "zoneAsset",
            "asset_type": "preview",
            "name": "test preview",
            "file": "https://qvcdn.veervr.tv/dafkljsldj?sign=24adf6c3e651929c1e6d525b70eb9e81&t=5cef1d00"
          }
        }
      },
      {
        "id": "AwVbMBw2TGu_T6Z1PdeegQ",
        "type": "zone",
        "name": "惊恐密室",
        "address": "北京市海淀区中关村南大街甲10号银海大厦B1e国网咖二楼",
        "qr_code": "",
        "contents_count": 4,
        "tickets_count": 100,
        "total_income": "865",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "asdhgtk4124",
            "type": "zoneAsset",
            "asset_type": "preview",
            "name": "test preview",
            "file": "https://qvcdn.veervr.tv/dafkljsldj?sign=24adf6c3e651929c1e6d525b70eb9e81&t=5cef1d00"
          }
        }
      },
      {
        "id": "HZxoUW4IQnuzes21_rRa9g",
        "type": "zone",
        "name": "汤泉良子（中关村店）",
        "address": "北四环西路56号辉煌时代大厦B1",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "asdhgtk4124",
            "type": "zoneAsset",
            "asset_type": "preview",
            "name": "test preview",
            "file": "https://qvcdn.veervr.tv/dafkljsldj?sign=24adf6c3e651929c1e6d525b70eb9e81&t=5cef1d00"
          }
        }
      },
      {
        "id": "iAxgrJeOS12hiQ_MPUvFvg",
        "type": "zone",
        "name": "新中关体验区3",
        "address": "",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          }
        }
      },
      {
        "id": "5oeumumpTSqyi__rtyEJHw",
        "type": "zone",
        "name": "新中关体验区2",
        "address": "中关村大厦2017",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          }
        }
      },
      {
        "id": "J81sGyyKQfqB_XqhLKt00Q",
        "type": "zone",
        "name": "新中关体验区0",
        "address": "中关村大厦2017",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          }
        }
      },
      {
        "id": "TT56ZM-WTZGiJMPRwKr2GQ",
        "type": "zone",
        "name": "新中关体验区6",
        "address": "海淀黄庄中关村大厦 2018 2",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          }
        }
      },
      {
        "id": "GMrxK5GrTlCg3-jpr2SpWA",
        "type": "zone",
        "name": "新中关体验区7",
        "address": "海淀黄庄中关村大厦 2018 2",
        "qr_code": "",
        "contents_count": 0,
        "tickets_count": 0,
        "total_income": "0",
        "relationships": {
          "business": {
            "id": "qwerqwer",
            "type": "business",
            "name": "VeeR Test Account",
            "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
            "phone": "1234567890",
            "address": "北京市海淀区中关村大厦2018 room1"
          },
          "cover_pic": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          },
          "preview": {
            "id": "",
            "type": "zoneAsset",
            "asset_type": "",
            "name": "",
            "file": ""
          }
        }
      }
    ],
    "pagination": {
      "size": 10,
      "total_count": 8,
      "current_page": 1,
      "total_page": 1,
      "has_more": false
    },
    "type": "list"
  },
  "POST /offline/biz/zones": {
    "data": {
      "id": "GMrxK5GrTlCg3-jpr2SpHQ",
      "name": "新中关体验区8",
      "address": "海淀黄庄中关村大厦 2018 2",
      "qr_code": "",
      "relationships": {
        "business": {
          "id": "qwerqwer",
          "name": "VeeR Test Account",
          "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
          "phone": "1234567890",
          "address": "北京市海淀区中关村大厦2018 room1"
        }
      }
    },
    "type": "object"
  },
  "PUT /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg": {
    "data": {
      "id": "iAxgrJeOS12hiQ_MPUvFvg",
      "name": "新中关体验区33333",
      "address": "中关村大厦222222017",
      "qr_code": "",
      "relationships": {
        "business": {
          "id": "",
          "name": "",
          "description": "",
          "phone": "",
          "address": ""
        }
      }
    },
    "type": "object"
  },
  "GET /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg": {
    "data": {
      "id": "8fuUV85dT1aD8KS1YcCBsg",
      "type": "zone",
      "name": "权金城西八里庄店1",
      "address": "权金城西八里庄店（北京市海淀区西八里庄北里25号）",
      "qr_code": "https://qvcdn.veervr.tv/offline/zone/8fuUV85dT1aD8KS1YcCBsg/u9suf5fccsstyfgwvnlrv44ggwafi9v8.png?sign=b28d8702633b880c174b9c849a20d80a&t=5cef1d00&watermark/2/text/Q0JzZw==/gravity/NorthEast/dx/10/dy/10",
      "contents_count": 5,
      "tickets_count": 12726,
      "total_income": 3455899,
      "relationships": {
        "business": {
          "id": "qwerqwer",
          "type": "business",
          "name": "VeeR Test Account",
          "description": "this is a long description xxxxxxxxxxxxxxxxxxxx",
          "phone": "1234567890",
          "address": "北京市海淀区中关村大厦2018 room1"
        },
        "cover_pic": {
          "id": "asdfalsdjkfl412",
          "type": "zoneAsset",
          "asset_type": "cover_pic",
          "name": "test cover",
          "file": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png"
        },
        "preview": {
          "id": "asdhgtk4124",
          "type": "zoneAsset",
          "asset_type": "preview",
          "name": "test preview",
          "file": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png"
        }
      }
    },
    "type": "object"
  },
  "GET /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/catalogs": {
    "data": {
      "id": "hRy1whskQciG1WEECbxViQ",
      "type": "catalog",
      "status": "DRAFT",
      "relationships": {
        "product": [{
            "id": "EvZ5_klfR7mOvK7ii6S0zQ",
            "type": "product",
            "name": "史前世界 （侏罗纪）",
            "description": "该片真实再现了侏罗纪时期恐龙间弱肉强食的生存法则，一群凶悍的异特龙猎杀剑龙的场面，然而在这个蛮荒的时代，永远猜不到谁是最后的赢家...",
            "tagline": "重返侏罗纪时代，近观恐龙大决战。十分钟走进科学，熊孩子看了都说好。",
            "thumbnail": "https://qvcdn.veervr.tv/UlJUv6SGrtzsAqAziCq_mQ/source.png-video.medium?sign=dc198ef2be5b93fe474b96409f6b24d4&t=5cef1d00",
            "duration": 587,
            "currency": "CNY",
            "price": "16.99",
            "tags": [],
            "zone_id": "AwVbMBw2TGu_T6Z1PdeegQ",
            "relationships": {
              "stock_item": {
                "id": "jRq2LkRnLEC6GZQT60BMRa",
                "type": "stock_item",
                "name": "史前世界 （侏罗纪）",
                "tagline": "重返侏罗纪时代，近观恐龙大决战。十分钟走进科学，熊孩子看了都说好。",
                "description": "该片真实再现了侏罗纪时期恐龙间弱肉强食的生存法则，一群凶悍的异特龙猎杀剑龙的场面，然而在这个蛮荒的时代，永远猜不到谁是最后的赢家...",
                "thumbnail": "https://qvcdn.veervr.tv/UlJUv6SGrtzsAqAziCq_mQ/source.png-video.medium?sign=dc198ef2be5b93fe474b96409f6b24d4&t=5cef1d00",
                "author": "",
                "content_safe_id": "1wVbo4LgM6gJb5NfqeSICKlHhuM",
                "currency": "CNY",
                "min_price": "14.9"
              }
            }
          },
          {
            "id": "Hf4U9rSGTr6D8NyvqkuXvw",
            "type": "product",
            "name": "红蓝特攻（上）",
            "description": "主人公Otis和Roberto被派往喜剧俱乐部，调查一个通缉嫌犯的线索。然而这个线索将他们引入一个极其艰巨的任务——在危机四伏的世界机器人最高权力总部，寻找一个神秘的服务器...",
            "tagline": "首部海外引进的VR动画连续剧。科幻类轻喜剧，您不妨轻松一下。",
            "thumbnail": "https://qvcdn.veervr.tv/fff16db50a8f406cbb1c0f8e0088be6a.png-video.medium?sign=2ce00676ec0b0d59f6d829ad11f477b6&t=5cef1d00",
            "duration": 359,
            "currency": "CNY",
            "price": "19.99",
            "tags": [],
            "zone_id": "AwVbMBw2TGu_T6Z1PdeegQ",
            "relationships": {
              "stock_item": {
                "id": "BdDEsaW8hX0krp8OnoAK9a",
                "type": "stock_item",
                "name": "红蓝特攻（上）",
                "tagline": "首部海外引进的VR动画连续剧。科幻类轻喜剧，您不妨轻松一下。",
                "description": "主人公Otis和Roberto被派往喜剧俱乐部，调查一个通缉嫌犯的线索。然而这个线索将他们引入一个极其艰巨的任务——在危机四伏的世界机器人最高权力总部，寻找一个神秘的服务器...",
                "thumbnail": "https://qvcdn.veervr.tv/fff16db50a8f406cbb1c0f8e0088be6a.png-video.medium?sign=2ce00676ec0b0d59f6d829ad11f477b6&t=5cef1d00",
                "author": "",
                "content_safe_id": "GUqYea8SWNXMrkzoE_CS4prXIs8",
                "currency": "CNY",
                "min_price": "4.9"
              }
            }
          },
          {
            "id": "ub2uzjEGRkOefTY74mlCsQ",
            "type": "product",
            "name": "红蓝特攻（下）",
            "description": "主人公Otis和Roberto的上一个任务将他们带到了Botcorp大厦，机器人最高权力总部。进入之后他们发现必须与超级反派Milo斗智斗勇...",
            "tagline": "该片入围多个国际电影节VR单元，好莱坞团队斥巨资打造。老少咸宜，不乏逗比。",
            "thumbnail": "https://qvcdn.veervr.tv/542eb5d088db44618deb6876cbddd997.png-video.medium?sign=c954742fda6753dfba4fb40ee2950e9a&t=5cef1d00",
            "duration": 430,
            "currency": "CNY",
            "price": "10.01",
            "tags": [],
            "zone_id": "AwVbMBw2TGu_T6Z1PdeegQ",
            "relationships": {
              "stock_item": {
                "id": "08pFODzPTy8xLOMZEdi5Ub",
                "type": "stock_item",
                "name": "红蓝特攻（下）",
                "tagline": "该片入围多个国际电影节VR单元，好莱坞团队斥巨资打造。老少咸宜，不乏逗比。",
                "description": "主人公Otis和Roberto的上一个任务将他们带到了Botcorp大厦，机器人最高权力总部。进入之后他们发现必须与超级反派Milo斗智斗勇...",
                "thumbnail": "https://qvcdn.veervr.tv/542eb5d088db44618deb6876cbddd997.png-video.medium?sign=c954742fda6753dfba4fb40ee2950e9a&t=5cef1d00",
                "author": "",
                "content_safe_id": "vSqHv3RBPN0euXBWQhH3uSTED98",
                "currency": "CNY",
                "min_price": "9.9"
              }
            }
          }
        ]
      }
    },
    "type": "object"
  },
  "POST /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/catalogs": {
    "data": {
      "id": "snWvaJx6R-64I5Iohc3I5A",
      "type": "catalog",
      "status": "DRAFT",
      "relationships": {
        "product": [{
            "id": "BLYSY4SASnKE8ARJFKxDPA",
            "type": "product",
            "name": "史前世界 （侏罗纪）",
            "description": "该片真实再现了侏罗纪时期恐龙间弱肉强食的生存法则，一群凶悍的异特龙猎杀剑龙的场面，然而在这个蛮荒的时代，永远猜不到谁是最后的赢家...",
            "tagline": "重返侏罗纪时代，近观恐龙大决战。十分钟走进科学，熊孩子看了都说好。",
            "thumbnail": "https://qvcdn.veervr.tv/-video.medium?sign=57ad37e4dc44f4e8a74bb7fbc85151c0&t=5cdca800",
            "duration": 0,
            "currency": "CNY",
            "price": "11.99",
            "tags": [],
            "zone_id": "AwVbMBw2TGu_T6Z1PdeegQ"
          },
          {
            "id": "kAbTUAcsQB-LQUkwburDAQ",
            "type": "product",
            "name": "红蓝特攻（上）",
            "description": "主人公Otis和Roberto被派往喜剧俱乐部，调查一个通缉嫌犯的线索。然而这个线索将他们引入一个极其艰巨的任务——在危机四伏的世界机器人最高权力总部，寻找一个神秘的服务器...",
            "tagline": "首部海外引进的VR动画连续剧。科幻类轻喜剧，您不妨轻松一下。",
            "thumbnail": "https://qvcdn.veervr.tv/-video.medium?sign=57ad37e4dc44f4e8a74bb7fbc85151c0&t=5cdca800",
            "duration": 0,
            "currency": "CNY",
            "price": "14.99",
            "tags": [],
            "zone_id": "AwVbMBw2TGu_T6Z1PdeegQ"
          }
        ]
      }
    },
    "type": "object"
  },
  "PUT /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/catalogs/publish": {
    "message": "ok"

  },
  "GET /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/qr_code": {
    "data": {
      "qr_code": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png"
    },
    "type": "object"
  },
  "GET /offline/biz/stock_items": {
    "data": [{
        "id": "jRq2LkRnLEC6GZQT60BMRa",
        "type": "stock_item",
        "name": "史前世界 （侏罗纪）",
        "tagline": "重返侏罗纪时代，近观恐龙大决战。十分钟走进科学，熊孩子看了都说好。",
        "description": "该片真实再现了侏罗纪时期恐龙间弱肉强食的生存法则，一群凶悍的异特龙猎杀剑龙的场面，然而在这个蛮荒的时代，永远猜不到谁是最后的赢家...",
        "banner": "",
        "preview_path": "",
        "duration": "587",
        "thumbnail": "https://qvcdn.veervr.tv/UlJUv6SGrtzsAqAziCq_mQ/source.png-video.medium?sign=dc198ef2be5b93fe474b96409f6b24d4&t=5cef1d00",
        "author": "",
        "content_safe_id": "1wVbo4LgM6gJb5NfqeSICKlHhuM",
        "currency": "CNY",
        "min_price": "14.9",
        "relationships": {
          "tags": []
        }
      },
      {
        "id": "BdDEsaW8hX0krp8OnoAK9a",
        "type": "stock_item",
        "name": "红蓝特攻（上）",
        "tagline": "首部海外引进的VR动画连续剧。科幻类轻喜剧，您不妨轻松一下。",
        "description": "主人公Otis和Roberto被派往喜剧俱乐部，调查一个通缉嫌犯的线索。然而这个线索将他们引入一个极其艰巨的任务——在危机四伏的世界机器人最高权力总部，寻找一个神秘的服务器...",
        "banner": "",
        "preview_path": "",
        "duration": "359",
        "thumbnail": "https://qvcdn.veervr.tv/fff16db50a8f406cbb1c0f8e0088be6a.png-video.medium?sign=2ce00676ec0b0d59f6d829ad11f477b6&t=5cef1d00",
        "author": "",
        "content_safe_id": "GUqYea8SWNXMrkzoE_CS4prXIs8",
        "currency": "CNY",
        "min_price": "4.9",
        "relationships": {
          "tags": []
        }
      },
      {
        "id": "08pFODzPTy8xLOMZEdi5Ub",
        "type": "stock_item",
        "name": "红蓝特攻（下）",
        "tagline": "该片入围多个国际电影节VR单元，好莱坞团队斥巨资打造。老少咸宜，不乏逗比。",
        "description": "主人公Otis和Roberto的上一个任务将他们带到了Botcorp大厦，机器人最高权力总部。进入之后他们发现必须与超级反派Milo斗智斗勇...",
        "banner": "",
        "preview_path": "",
        "duration": "430",
        "thumbnail": "https://qvcdn.veervr.tv/542eb5d088db44618deb6876cbddd997.png-video.medium?sign=c954742fda6753dfba4fb40ee2950e9a&t=5cef1d00",
        "author": "",
        "content_safe_id": "vSqHv3RBPN0euXBWQhH3uSTED98",
        "currency": "CNY",
        "min_price": "9.9",
        "relationships": {
          "tags": []
        }
      },
      {
        "id": "zM7rrrWtTk-E0GedG9m7KA",
        "type": "stock_item",
        "name": "HELP",
        "tagline": "真人版大战小怪兽，VR界大片鼻祖，还不快来膜拜膜拜！",
        "description": "《HELP》是由谷歌拍摄的真人360全景微电影，由“速度与激情”系列导演林诣彬（Justin Lin）执导，男主也是《速度与激情》系列中的亚裔帅哥姜成镐Kung Song！外星怪兽坠落地球，无故追赶女主角。途中任何攻击都不能对怪兽造成伤害，而且怪兽体型在不断的变大，甚至越来越凶残。直到最后女主角交出了那个神秘的导火索，怪兽才慢慢收敛变回温顺的样子。",
        "banner": "",
        "preview_path": "",
        "duration": "293.315",
        "thumbnail": "https://qvcdn.veervr.tv/tigE7ZJZEwrPhZaM9yCD8g/source.png-video.medium?sign=c036678cf4caa9172df0334172397c21&t=5cef1d00",
        "author": "yingsa",
        "content_safe_id": "sW9dAmcviZBUSk_rH4TiyIDp0II",
        "currency": "CNY",
        "min_price": "0.01",
        "relationships": {
          "tags": []
        }
      },
      {
        "id": "09xmY3nfRieg_SmwIKYUdg",
        "type": "stock_item",
        "name": "透明少女合集",
        "tagline": "与三个小姐姐的亲密接触，日本市场的销量冠军。",
        "description": "治愈系清纯少女是男人们初恋情人的模样，在这里三个小姐姐环绕着你，跟你聊天、为你吹气球、陪你打游戏，梦寐以求的场景，戴上头显即刻抵达。",
        "banner": "fake_banner.png",
        "preview_path": "fake_preview.mp4",
        "duration": "601.067",
        "thumbnail": "https://qvcdn.veervr.tv/9614f7ac10014c9a90bebb7b05b8c1f5.png-video.medium?sign=d5cbecfdde624843088dcfdbb3f79551&t=5cef1d00",
        "author": "yingsa",
        "content_safe_id": "FmyDtjrrXglrvGhaMXIbjCtYMrY",
        "currency": "CNY",
        "min_price": "9.9",
        "relationships": {
          "tags": [{
              "id": "laksdf",
              "type": "tag",
              "name": "test"
            },
            {
              "id": "k8yr77dWS-KW5XGC_HHwiA",
              "type": "tag",
              "name": "hello"
            }
          ]
        }
      },
      {
        "id": "-fmTg1TBT3WAcmDTIDTM3Q",
        "type": "stock_item",
        "name": "Carriberrie 中文版",
        "tagline": "1234",
        "description": "带上头显跟导演一起置身其中澳大利亚最深处、最原始的舞蹈和音乐。",
        "banner": "",
        "preview_path": "",
        "duration": "843.349",
        "thumbnail": "https://qvcdn.veervr.tv/92231cde35e0480ba98e31a2e5d901bb.png-video.medium?sign=f06681d7118ca777707b49cea87068e5&t=5cef1d00",
        "author": "",
        "content_safe_id": "dIZpfYmSjYCZet2vwQiyYg3UAOY",
        "currency": "CNY",
        "min_price": "0.02",
        "relationships": {
          "tags": [{
              "id": "k8yr77dWS-KW5XGC_HHwiA",
              "type": "tag",
              "name": "hello"
            },
            {
              "id": "nQPW3KWOQ72ND5iOVN8GTA",
              "type": "tag",
              "name": "美丽"
            },
            {
              "id": "GlvrnFRkQY6cmltiAvJyAg",
              "type": "tag",
              "name": "what"
            }
          ]
        }
      }
    ],
    "pagination": {
      "size": 10,
      "total_count": 6,
      "current_page": 1,
      "total_page": 1,
      "has_more": false
    },
    "type": "list"
  },
  "GET /offline/biz/products/YC-Mymno51iWxzpKLUoW5Qn6HZTpyQ": {
    data: {
      "id": "YC-Mymno51iWxzpKLUoW5Qn6HZTpyQ",
      "type": "product",
      "name": "The Great C The Great C The Great C",
      "description": "长达 30 多分钟的全面体验，讲述惊险的故事情节，令人惊叹的环境和强大的配乐。",
      "tagline": "长达 30 多分钟的全面体验，讲述惊险的故事情节，令人惊叹的环境和强大的配乐。",
      "thumbnail": "https://qvcdn.veervr.tv/0e61c5771c274037a953528e4c487d75.png-video.medium?sign=730688a99406f8eebb4bfd880ad61d4c&t=5cdca800",
      "duration": 135,
      "price": "29",
      "currency": "CNY",
      "tags": [
        "动画",
        "故事",
        "冒险"
      ],
      "zone_id": "VmturK5JrMxpOBTBOSaTsrLkqD6n7g"
    }
  },
  "GET /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/devices": {
    data: [{
        "id": "zOcdygeRQ7mnfNX8rmbwvg",
        "uid": "PA7510MGCA120452W",
        "thing_name": "tGpPYfF4FQKeynhWHzXkC05lzkEO3b1N",
        "sequence": 1,
        "alias": "",
        "qr_code": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png",
        "mode": "user",
        "state": "standby",
        "connected": false,
        "renewstatus": "on",
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      },
      {
        "id": "LVZc9GmrRuqBt5m318DSwA",
        "uid": "PA7510MGCA100454W",
        "thing_name": "MZzvL5Wvx0C4GDGY8JwbwhlS47mgCOy3",
        "sequence": 2,
        "alias": "",
        "qr_code": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png",
        "mode": "user",
        "state": "playing",
        "connected": false,
        "renewstatus": "success",
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      },
      {
        "id": "jzr1jEG2RxGqqe-2UK4Nig",
        "uid": "PA7510CGC7230009W",
        "thing_name": "test_vr1111111",
        "sequence": 3,
        "alias": "",
        "qr_code": "",
        "mode": "user",
        "state": "offline",
        "connected": true,
        "renewstatus": "fail",
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      },
      {
        "id": "ZxtSU94JYnI7iGoQ4abHaC",
        "uid": "PA7510MGCC170377W",
        "thing_name": "xhDRZDh3BraTwS4QbGamOtWgphyZl8Az",
        "sequence": 4,
        "alias": "",
        "qr_code": "",
        "mode": "admin",
        "state": "pause_playing",
        "connected": true,
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      },
      {
        "id": "tmGZPY3JRv2Y3C7RAjSHiA",
        "uid": "test_serial_number",
        "thing_name": "45ODrueqlqyljndGadktxcmntL6VWSS2",
        "sequence": 5,
        "alias": "",
        "qr_code": "",
        "mode": "",
        "state": "download_failed",
        "connected": false,
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      }, {
        "id": "zOcdygeRQ8mnfNX8rmbwvg",
        "uid": "PA7510MGCA120452W",
        "thing_name": "tGpPYfF4FQKeynhWHzXkC05lzkEO3b1N",
        "sequence": 1,
        "alias": "",
        "qr_code": "",
        "mode": "user",
        "state": "downloading",
        "connected": false,
        "renewstatus": "on",
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      }, {
        "id": "LVPc9GmrRuqBt5m318DSwA",
        "uid": "PA7510MGCA100454W",
        "thing_name": "MZzvL5Wvx0C4GDGY8JwbwhlS47mgCOy3",
        "sequence": 2,
        "alias": "",
        "qr_code": "",
        "mode": "user",
        "state": "downloaded",
        "connected": false,
        "renewstatus": "success",
        "relationships": {
          "zone": {
            "id": "eTwCns0Jk5PL478ALnQQpw",
            "name": "新中关体验区",
            "address": "海淀黄庄中关村大厦 2018",
            "qr_code": ""
          }
        }
      }
    ],
    "pagination": {
      "size": 10,
      "total_count": 5,
      "current_page": 1,
      "total_page": 1,
      "has_more": false
    },
    "type": "list"
  },
  "POST /offline/biz/zones/iAxgrJeOS12hiQ_MPUvFvg/activations": {
    data: {
      type: "device_activation_code",
      activation_code: 89789872
    }
  },
  "GET /offline/biz/device/zOcdygeRQ7mnfNX8rmbwvg": {
    data: {
      "id": "zOcdygeRQ7mnfNX8rmbwvg",
      "uid": "PA7510MGCA120452W",
      "thing_name": "tGpPYfF4FQKeynhWHzXkC05lzkEO3b1N",
      "sequence": 1,
      "alias": "",
      "qr_code": "https://assets.veervr.tv/@vrups/66250b8e-4aae-4276-85dc-3f82af2fbb68.png",
      "mode": "user",
      "state": "idle",
      "connected": false,
      "renewstatus": "on",
      "relationships": {
        "zone": {
          "id": "eTwCns0Jk5PL478ALnQQpw",
          "name": "新中关体验区",
          "address": "海淀黄庄中关村大厦 2018",
          "qr_code": ""
        }
      }
    }
  },
  "GET offline/biz/preset_catalogs": {
    "data": [
    	{
	        "id": "Uly700IWSXaJiPXLXWiTTg",
	        "type": "preset_catalog",
	        "name": "children's favourite",
	        "description": "VeeR's recommendation collection for children",
	        "relationships": {
	            "stock_item": [
	                {
	                	"id": "jRq2LkRnLEC6GZQT60BMRa",
			            "type": "stock_item",
			            "name": "史前世界 （侏罗纪）",
			            "tagline": "重返侏罗纪时代，近观恐龙大决战。十分钟走进科学，熊孩子看了都说好。",
			            "description": "该片真实再现了侏罗纪时期恐龙间弱肉强食的生存法则，一群凶悍的异特龙猎杀剑龙的场面，然而在这个蛮荒的时代，永远猜不到谁是最后的赢家...",
			            "banner": "",
			            "preview_path": "",
			            "duration": "587",
			            "thumbnail": "UlJUv6SGrtzsAqAziCq_mQ/source.png",
			            "author": "",
			            "content_safe_id": "1wVbo4LgM6gJb5NfqeSICKlHhuM",
			            "currency": "CNY",
			            "min_price": "14.9",
			            "default_sales_price": "29.8"
	                }
	            ]
	        }
	    },
	  ],
    "pagination": {
        "size": 10,
        "total_count": 1,
        "current_page": 1,
        "total_page": 1,
        "has_more": false
    },
    "type": "list"
  },
  "GET /thor/users/1/privileges": {"data":[{"safe_id":"fC5W8NxARfaAo89ijtrNXg","code":"offline_biz_zones_catalogs_publish"},{"safe_id":"SxgftRBnQkqtAQNxNAhcKw","code":"offline_biz_zones_catalog_update"},{"safe_id":"LPTcwOFkTMmAg9Y3Jb97kw","code":"offline_biz_zones_orders_list"},{"safe_id":"n14GKXSZToCRHS6y1UihMQ","code":"megane_receiver_income_summary_retrieve"},{"safe_id":"n14GKXSZToCRHS6y1UihMQ","code":"megane_receiver_income_summary_retrieve"},{"safe_id":"rX2p_VJHQJW3RN1M-46GhQ","code":"megane_receiver_orders_retrieve"},{"safe_id":"huLpdtusQNmvnb2mEOHXdQ","code":"megane_receiver_income_summaries_retrieve"},{"safe_id":"Qjn3uiv2Q_KFiPCgcKS9zA","code":"megane_receiver_balance_retrieve"},{"safe_id":"ZyBkjGBzRv2Gj_A8g-xVng","code":"megane_receiver_withdrawal_create"},{"safe_id":"aI5ThIHnSA-fNQaqcPY2Lw","code":"offline_biz_refund_reviews_approve"},{"safe_id":"OqzFroeFRX6uvoOMKIZVgA","code":"offline_biz_zones_create"},{"safe_id":"MMp60czPRY-R8KCQXjhRyw","code":"offline_biz_zones_update"},{"safe_id":"q9-LsHW5SNGlgjVW_wWNbg","code":"offline_biz_zones_activations_create"},{"safe_id":"MMp60czPRY-R8KCQXjhRyw","code":"offline_biz_zones_update"},{"safe_id":"dSTvAdsgSCexrZrfak-v5Q","code":"megane_receiver_cooperators_income_summaries"},{"safe_id":"-RIgkH6WQa6iupOHUBu__A","code":"offline_business_pc_web_login"},{"safe_id":"fC5W8NxARfaAo89ijtrNXg","code":"offline_biz_zones_catalogs_publish"},{"safe_id":"LPTcwOFkTMmAg9Y3Jb97kw","code":"offline_biz_zones_orders_list"},{"safe_id":"n14GKXSZToCRHS6y1UihMQ","code":"megane_receiver_income_summary_retrieve"},{"safe_id":"n14GKXSZToCRHS6y1UihMQ","code":"megane_receiver_income_summary_retrieve"},{"safe_id":"rX2p_VJHQJW3RN1M-46GhQ","code":"megane_receiver_orders_retrieve"},{"safe_id":"huLpdtusQNmvnb2mEOHXdQ","code":"megane_receiver_income_summaries_retrieve"},{"safe_id":"aI5ThIHnSA-fNQaqcPY2Lw","code":"offline_biz_refund_reviews_approve"},{"safe_id":"-RIgkH6WQa6iupOHUBu__A","code":"offline_business_pc_web_login"}]},
  "POST /users/signin": {"code":200,"message":"OK","data":{"user":{"uid":1,"userid":"0000d2ec5716f8b1","username":"ccnn_all","profile":{"uid":119,"name":"ccnn_all","info":"4公主吃灰了哈1","avatar_url":"https://qcdn.veervr.tv/profile/avatar/e98aa88642874c7dba608dd10f35ce04.png-avatar.medium?sign=f716b3a13b1b85a231146a654c7267e9&t=5f62a700","avatar_url_watermark":"https://qcdn.veervr.tv/profile/avatar/e98aa88642874c7dba608dd10f35ce04.png-share.medium.cn?sign=5b7780ebfa1452e92472ca69b499fa72&t=5f62a700","avatar_url_small":"https://qcdn.veervr.tv/profile/avatar/e98aa88642874c7dba608dd10f35ce04.png-avatar.small?sign=361d19c634a08f96ff2fe8aac4d26a65&t=5f62a700","avatar_url_large":"https://qcdn.veervr.tv/profile/avatar/e98aa88642874c7dba608dd10f35ce04.png-avatar.large?sign=b3faeafcf1ff9fd3fa8af843ab3ad91a&t=5f62a700","background_url":"","like_viewable":true,"gender":1,"birthday":null,"location":"","homepage":"","geolocation":"city_1284","display_geolocation":"北京, 北京, 中国","category_sequence":"41,38,29,33,32,31,44,27,42,28,40,30,34,43,39,35"},"is_creator":true,"mobile":"18600127829","email":null,"email_link":null,"email_preferences":[{"title":"每周快报","info":"汇聚每周热门VR视频与最近动态更新","type":"weekly_digest","subscribed":true},{"title":"评论","info":"当你收到新评论时，我们会及时发送信息提醒","type":"comment_digest","subscribed":true},{"title":"通知","info":"与你账号相关的消息通知","type":"notifications","subscribed":false},{"title":"公告与更新","info":"新功能、推广机会以及其他更新","type":"announcements","subscribed":false}],"confirmed_at":"2017-09-27T14:53:48.000+08:00","has_password":true,"email_checked":false,"vip_days_left":2353,"is_vip":true,"user_interests":{"none":[null]},"following_count":1,"follower_count":14,"have_i_followed":false,"beta_feature_permissions":{"web_streaming":false,"experience":true,"internal":false,"megatron_uploading":false},"third_party_accounts":{"facebook":null,"wechat":{"name":"能仔"},"twitter":null,"weibo":null,"google":null,"instagram":null},"viewable_settings":{"weibo":true,"twitter":true,"instagram":true},"is_new_register":false,"verified_status":"","video_count":21,"upload_count":86,"video_like_count":0,"total_like_count":13,"video_active_like_count":57,"has_wechat_unionid":true},"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcmlkIjoiMDAwMGQyZWM1NzE2ZjhiMSIsInVzZXJuYW1lIjoiY2Nubl9hbGwiLCJleHAiOjE2MDMxODExOTl9.s0d7D3N9K854ttKc41xKPBdHlg6J7X9FV3XDWD6IRY4"}},
  "GET /thor/users/permission": {
    "data": [100,200,300,400,5,6]
  },
}