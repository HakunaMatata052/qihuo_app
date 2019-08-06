<template>
  <div class="container">
    <navBar/>
    <div class="main">
      <van-cell-group :border="false">
        <van-cell title="实名认证" is-link to="/rechargeRecord" />
        <van-cell title="绑定银行卡" is-link to="/setting/bankup" />
        <van-cell title="修改登录密码" is-link to="/resetPassword" />
        <van-cell title="修改提款密码" is-link to="/setting/drawingPassword"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "setting",
  components: {
    navBar
  }
};
</script>

<style lang="less" scoped>
</style>

