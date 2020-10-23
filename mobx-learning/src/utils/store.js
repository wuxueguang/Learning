

export const combine = (model, actions) => {
  model.actions = {};
  for(const n in actions){
    model.actions[n] = actions[n].bind(model);
  }
  return model;
};