export default {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  sequelize: {
    // 默认注释，数据库配置好了再开启
    enable: true,
    package: 'egg-sequelize',
  },
  decoratorRouter: {
    enable: true,
    package: 'egg-decorator-router',
  },
};
