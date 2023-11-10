import request from "@/utils/request";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data) {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("verifyCodeKey", data.verifyCodeKey || "");
  formData.append("verifyCode", data.verifyCode || "");
  return request({
    url: "/api/v1/auth/login",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/api/v1/auth/logout",
    method: "delete",
  });
}

/**
 * 获取验证码
 */
export function getCaptchaApi() {
  return request({
    url: "/api/v1/auth/captcha",
    method: "get",
  });
}