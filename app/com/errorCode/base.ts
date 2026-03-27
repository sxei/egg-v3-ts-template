/** 基座相关错误码 */
enum BaseErrorCode {
  /** 成功 */
  SUCCESS = 0,
  /** 未登录 */
  NOT_LOGIN = 10001,
  /** 未授权 */
  NOT_AUTH = 10002,
  /** 调用JSF网关异常 */
  INVOKE_JSF_ERROR = 10003,
  /** 调用AUTH接口异常 */
  INVOKE_AUTH_ERROR = 10004,
  /** 未找到指定ID的数据 */
  NOT_FOUND_DATA_ERROR = 10005,
}
export default BaseErrorCode;
