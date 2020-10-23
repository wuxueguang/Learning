
export { default as request } from './request';

export const rootPath = pathName => /^\/[^/]*/.exec(pathName)[0];

export const type = arr => /^\[object (.*)\]/.exec(Object.prototype.toString.call(arr))[1].toLowerCase();

export const deepClone = data => {
  try{
    return JSON.parse(JSON.stringify(data));
  }catch(err){
    console.error(new TypeError('Can only clone JSON data! Error: '));
    console.error(err);
  }
};

export const treeData = data => {
  if(Array.isArray(data)){
    return data.map(({name, path, children}) => {
      return {
        title: name,
        value: path,
        children: treeData(children),
      };
    });
  }
};

export const structRoutes = _routes => {
  const routes = deepClone(_routes);
  const recorder = new Map;
  const ret = [];

  routes.forEach(item => {
    const itemChildren = recorder.get(item.id);
    if(!Array.isArray(itemChildren)){
      recorder.set(item.id, []);
    }
    item.children = recorder.get(item.id);

    if([undefined, null].includes(item.parentId)){
      ret.push(item);
    }else{
      const parentChildren = recorder.get(item.parentId);
      if(Array.isArray(parentChildren)){
        parentChildren.push(item);
      }else{
        recorder.set(item.parentId, [item]);
      }
    }
  });

  return ret;
};