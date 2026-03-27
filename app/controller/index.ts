import { Controller } from 'egg';
import { Route, HttpGet } from 'egg-decorator-router';
import { EasyEgg } from '@/com/annotation';

@EasyEgg()
@Route()
export default class HomeController extends Controller {
  @HttpGet('/')
  async home() {
    await this.ctx.render('index.html', {
      // 服务端注入示例
      serverTime: Date.now(),
    });
  }
}
