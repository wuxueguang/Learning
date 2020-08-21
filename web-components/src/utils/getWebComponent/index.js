
import { remoteLoader } from '..';

export default (jsUrls, targetName) => {
  class Container extends HTMLElement{
    constructor(...args) {
      super(...args);
      const shadow = this.attachShadow({
        mode: 'open'
      });
      const container = document.createElement('div');
      container.setAttribute('class', 'my-test');
      shadow.appendChild(container);
  
      remoteLoader(jsUrls, targetName).then(render => {
        render(container);
      });
    }
  }
  
  return Container;
}

