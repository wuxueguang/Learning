import OauthUtil from 'utils/oauth-util';

const oauthHandler = async (ctx, next) => {
  let userInfo = ctx.cookies.get('veer-user');

  if (userInfo) {
    userInfo = decodeURIComponent(userInfo);
  }

  await next();
};

export default oauthHandler;
