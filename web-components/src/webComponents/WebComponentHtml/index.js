

class WebC extends HTMLElement{
  constructor(...args) {
    super(...args);
    const shadow = this.attachShadow({
      mode: 'open'
    });

    const container = document.createElement('div');
    container.setAttribute('class', 'my-test');
    shadow.appendChild(container);
    fetch('./_test.html').then(response => {
      return response.text();
    }).then(html => {
      container.innerHTML = html;
    });
    this.container = container;
  }














  // 当自定义元素第一次被连接到文档DOM时被调用
  connectedCallback() {
    console.log('connectedCallback');
  }
  // 当自定义元素与文档DOM断开连接时被调用
  disconnectedCallback() {
    console.log('disconnectedCallback');
    // ReactDOM.unmountComponentAtNode(this.container);
  }
  adoptedCallback() {
    console.log('adoptedCallback');
  }
  attributeChangedCallback() {
    console.log('attributeChangedCallback');
  }
}


export default WebC;