<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="form.user_account"
            clearable
            placeholder="请输入手机号"
            class="field"            
            type="tel"
          />
            <van-field
              v-model="form.captcha"
              center
              clearable
              class="field"
              placeholder="请输入短信验证码"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
                class="checknumbtn"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
                :hairline="false"
              >
                <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
                <span v-else>发送验证码</span>
              </van-button>
            </van-field>
          <van-field
            v-model="form.user_pwd"
            type="password"
            placeholder="请输入密码"
            class="field"
          />
          <van-field
            v-model="form.retail_code"
            clearable
            placeholder="请输入邀请码（可选）"
            class="field"            
            type="tel"
          />
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="regLoading"
          loading-type="spinner"
          @click="regFn"
          class="regbtn"
          :hairline="false"
        >立即注册</van-button>
        <p>
          <van-checkbox
            v-model="checked"
            shape="square"
            :checked-color="$store.state.color"
            class="agreement"
          >
            我同意
            <span>《用户注册协议》</span>
          </van-checkbox>
        </p>
        <div class="gologin">
          已有账号？
          <span @click="$router.push('/login')">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "register",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      checkNumDisabled: false,
      form: {
        user_account: "",
        user_pwd: "",
        captcha: "",
        retail_code: ""
      },
      countDown: 60,
      checked: true,
      timer: null
    };
  },
  created(){
    if(this.$METHOD.getStore('token')){
      this.$router.push('/')
    }
  },
  methods: {
    sendchecknum() {
      if (this.form.user_account.length > 0) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .smscode({
            mobile: this.form.user_account
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入手机号码");
      }
    },
    regFn() {
      if (!regexUtil.isPhone(this.form.user_account)) {
        console.log(this.form.user_account)
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.form.captcha == "") {
        this.$toast.fail("请输入验证码");
        return;
      }

      if (!regexUtil.isPassword(this.form.user_pwd)) {
        this.$toast.fail("请输入6-11位字母数字组合密码");
        return;
      }
      if (!this.checked) {
        this.$toast.fail("请阅读并同意《用户注册协议》");
        return;
      }
      this.regLoading = true;
      this.$SERVER.register(this.form).then(res => {
        this.$toast.success("注册成功");
        this.regLoading = false;
        this.$METHOD.setStore('token',res.data.userinfo.token)
        this.$store.state.token = res.data.userinfo.token
        this.$router.push("/");
      }).catch(res=>{
        this.regLoading = false;
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#register {
  width: 100%;
    height: 100%;
  background-color: #191A1F;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .main {
    width: 90%;
  }
  .checknumbtn {
    background: rgba(254, 196, 58, 1);
    border: 0;
  }
  .regbtn {
    background: rgba(254, 196, 58, 1);
    border-radius: 100px;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border: 0;
  }
  p {
    margin-top: 30px;
    color: #fff;
    font-size: 14px;
    span {
      color: rgba(254, 196, 58, 1);
      margin-left: 5px;
    }
  }
  .gologin {
    text-align: center;
    margin-top: 50px;
    color: #999;
    span {
      text-decoration: underline;
    }
  }
}
</style>
