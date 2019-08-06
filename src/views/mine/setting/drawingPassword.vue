<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group :border="false">
        <van-field
          v-model="form.bank_card_number"
          required
          clearable
          label="旧密码"
          placeholder="请输入旧密码"
          type="tel"
        />
        <van-field
          v-model="form.bank_card_number"
          required
          clearable
          label="新密码"
          placeholder="请输入新密码"
          type="tel"
        />
        <van-field
          v-model="form.bank_card_number"
          required
          clearable
          label="确认密码"
          placeholder="请输入确认密码"
          type="tel"
        />
      </van-cell-group>
      <div class="submit">
        <van-button type="danger" size="large" round @click="submit">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "drawingPassword",
  components: {
    navBar
  },
  data() {
    return {
      form: {}
    };
  },
  created() {
      
  },
  methods: {
      submit(){

      }
  },
  activated() {}
};
</script>

<style lang="less" scoped>
.submit {
  margin: 20px;
  padding: 15px;
}
</style>

