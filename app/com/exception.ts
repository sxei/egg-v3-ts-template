import ErrorCode from './errorCode';

/**
 * 通用HTTP异常
 */
export class HttpException extends Error {
  public code: number;
  public detail: any;

  /**
   * 自定义异常
   * @param message 异常文案
   * @param code 异常code，默认 500
   * @param detail 其它异常明细，可选
   */
  constructor(message?: string, code?: number, detail?: any) {
    super(message || '服务出小差了，稍后再试吧');
    this.code = code || ErrorCode.INTERNAL_SERVER_ERROR;
    this.detail = detail;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

/**
 * 404 异常
 */
export class NotFoundException extends HttpException {
  constructor(message?: string, detail?: any) {
    super(message || 'Not Found');
    this.code = ErrorCode.NOT_FOUND;
    this.detail = detail;
    this.name = this.constructor.name;
  }
}

/**
 * 400 异常
 */
export class BadRequestdException extends HttpException {
  constructor(message?: string, detail?: any) {
    super(message || 'Bad Request');
    this.code = ErrorCode.BAD_REQUEST;
    this.detail = detail;
    this.name = this.constructor.name;
  }
}

/**
 * 400 异常
 */
export class NotFoundDataException extends HttpException {
  constructor(id: any) {
    super(`未找到ID为 ${id || ''} 的记录`);
    this.code = ErrorCode.BAD_REQUEST;
    this.name = this.constructor.name;
  }
}

/**
 * 未授权
 */
export class NotAuthException extends HttpException {
  constructor(message: string) {
    super(message || '权限不足');
    this.code = ErrorCode.NOT_AUTH;
    this.name = this.constructor.name;
  }
}
