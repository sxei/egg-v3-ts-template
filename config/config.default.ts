import { EggAppConfig, PowerPartial } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
  news: {
    pageSize: number;
    serverUrl: string;
  };
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;
  config.news = {
    pageSize: 30,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  // TODO 切记要改这里
  config.keys = appInfo.name + '123456789';

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.tpl': 'nunjucks',
      '.ejs': 'ejs',
    },
    root: [path.join(appInfo.baseDir, 'app/view')].join(','),
  };

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
  };

  config.sequelize = {
    datasources: [
      {
        dialect: 'mysql',
        // 挂载到 app 上的名字
        delegate: 'model',
        baseDir: 'model',
        host: '127.0.0.1',
        port: 3306,
        database: 'test-egg',
        username: 'root',
        password: 'abc123',
      },
    ],
  };

  return config;
};
