import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */
  async login(params = {}) {
    try {
      let result = await this.axios("POST", "user/login", params);
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取数据失败",
          response: result,
          data: params,
          url: "/Home/Kaiyun/indexData"
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
  // 登录用户信息
  async userinfo(params = {}) {
    return await this.axios("POST", "User/userinfo", params)
  }
  // 充值列表
  async changelist(params = {}) {
    return await this.axios("POST", "User/changelist", params)
  }
  // 提现列表
  async withdrawlist(params = {}) {
    return await this.axios("POST", "User/withdrawlist", params)
  }
  // 红包列表
  async amountgive(params = {}) {
    return await this.axios("POST", "User/amountgive", params)
  }
  // 修改头像
  async faceup(params = {}) {
    return await this.axios("POST", "user/faceup", params)
  }
  // 修改绑定银行卡
  async bankup(params = {}) {
    return await this.axios("POST", "user/bankup", params)
  }
  // 注册
  async register(params = {}) {
    return await this.axios("POST", "user/register", params)
  }
  // 发送短信验证码
  async smscode(params = {}) {
    return await this.axios("POST", "user/smscode", params)
  }
  // 退出
  async logout(params = {}) {
    return await this.axios("POST", "user/logout", params)
  }
  // 修改密码
  async pwdup(params = {}) {
    return await this.axios("POST", "user/pwdup", params)
  }
  // 发现列表
  async findList(params = {}) {
    return await this.axios("POST", "publiccon/index", params)
  }
  
  
}

export default new Api();