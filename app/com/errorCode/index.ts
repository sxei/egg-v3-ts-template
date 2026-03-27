import http from './http';
import base from './base';

/**
 * 全站统一错误码定义
 * 3位数表示通用的HTTP类错误，直接复用 HTTP 标准
 * 5位数表示业务定义错误码，例如：10001，其中：
 * 10 开头表示基座错误码
 * 11 开头表示子业务A错误码
 * 12 开头表示子业务B错误码，依此类推
 */
const ErrorCode = {
  ...http,
  ...base,
} as const;

export default ErrorCode;
