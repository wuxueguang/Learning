const mqtt = require("mqtt");


const operatorId = 1248;
const clientId = `bm@${operatorId}`;
const username = `operator@${operatorId}`;
const password = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhY20iLCJwbGF0Zm9ybSI6ImJtIiwib3BlcmF0b3JJZCI6MTI0OCwib3BlcmF0b3JOYW1lIjoi5ZC05a2m5bm_Iiwicm9sZXMiOlsi6LaF57qn566h55CG5ZGYIl0sImlhdCI6MTYyNjQwMjg4NCwiZXhwIjoxNjI2NDg5Mjg0fQ.AhCxZRqDZwpEn_h8cLxoWtNnmmClMCeiCVDEJaoZ6IY';
const topic = `/bm/message/topic/${operatorId}`;
const options = {clientId, username, password};

const client = mqtt.connect("ws://192.168.64.76:8083/mqtt", options);

client.on("connect", function() {
  console.log("服务器连接成功");

  client.subscribe(topic); //订阅主题为test的消息
});

client.on("error", function(...args) {
  console.log("error", ...args);
});

client.on('message', function(topic, payload) {
  console.log("当前topic：", topic);
  console.log("当前温度：", payload.toString());
});