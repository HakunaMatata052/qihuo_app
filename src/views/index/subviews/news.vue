<template>
  <div class="container" id="video">
    <navBar title :goback="false">
      <template slot="title">
        <van-tabs v-model="active" :border="false" title-active-color="#fff" color="#fff">
          <van-tab title="资讯直播" :name="1"></van-tab>
          <van-tab title="财经日历" :name="2"></van-tab>
        </van-tabs>
      </template>
    </navBar>
    <div class="main">
      <van-panel>
        <div class="title" slot="header"><van-icon class-prefix="icon" name="wenzhang" />2019-08-01 11:24:35</div>
        <div class="con">内容</div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "news",
  components: {
    navBar
  },
  data() {
    return {
      active: 1
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.title {
  font-size: 15px;
  font-weight: bold;
  color: rgba(14, 189, 255, 1);
  line-height: 24px;
  padding: 10px 15px;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
}
.con {
  padding: 15px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(141, 154, 183, 1);
  line-height: 24px;
}
</style>

