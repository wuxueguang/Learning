import React, {useState,useEffect} from "react"

class Time extends React.Component{
  
    this.state={
      time:0
    }
    
    componentDidUpdate(){   // 最开始这里写的是  componentDidMount, 提示了一下，又直接改成了这样
      this.tinajia()
    }
    tinajia(){
      setTimeout(() => {
        this.setState({
          time:this.state.time+1
        })
      }, 1000);
    }
    render() {
        return <div>{this.state.time}</div>
    }
}
export default Time

function Times(){
  const [time,setTime]=useState(0)
  useEffect({
   setTimeout(()=>{
      setTime(time+1)
   },1000) 
  })
  
  return <div>{time}</div>
}












const o = {
  a: 'a',
  say() {
    console.log(this.a);
  }
};


o.say();

(o.say)();

const say = o.say;

say();

































