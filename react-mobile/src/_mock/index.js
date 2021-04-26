


import userInfo from './user-info';
import heroList from './hero-list';
import medalGetRecords from './medal-get-records';
import heroStories from './hero-story';
import storyDetail from './story-detail';


export const fetchCurrentUser = params => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(userInfo), 1000));
};

export const fetchHeroList = params => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(heroList), 1000));
};

export const fetchMedalGetedRecords = params => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(medalGetRecords), 1000));
};

export const fetchHeroStories = params => {
  console.log(params, '---- mock ----');
  return new Promise(resolve => setTimeout(() => resolve(heroStories), 3000));
};

export const fetchStoryDetail = params => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(storyDetail), 1000));
};

export const tellStoryReaded = params => () => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(storyDetail), 1000));
};

export const likeStory = params => () => {
  console.log(params, '----');
  return new Promise(resolve => setTimeout(() => resolve(storyDetail), 1000));
};
