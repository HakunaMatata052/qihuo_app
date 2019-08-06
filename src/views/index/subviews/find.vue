<template>
  <div class="container">
    <narBar :goback="false">
      <span slot="right" class="right" @click="$router.push('/activities')">精彩活动</span>
    </narBar>
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-collapse v-model="activeNames" :border="false" accordion>
          <van-collapse-item
            name="1"
            icon="play"
            class="collapse"
            :is-link="false"
            :value="$METHOD.format(item.updatetime*1000,'yyyy-MM-dd hh:mm:ss')"
            v-for="(item,index) in list"
            :key="index"
          >
            <div class="title" slot="title">{{item.title}}</div>
            <div class="con">{{item.content}}</div>
          </van-collapse-item>
        </van-collapse>
      </van-list>
    </div>
  </div>
</template>
<script>
import narBar from "@/components/navbar/navbar.vue";
export default {
  name: "find",
  components: {
    narBar
  },
  data() {
    return {
      activeNames: [],
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  methods: {
    onLoad() {
      this.$SERVER
        .findList({
          page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
</style>

<style lang="less" scoped>
.collapse {
  margin-bottom: 15px;
  &:after {
    border-top-width: 0;
  }
}
.title {
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
.con {
  font-size: 13px;
  font-weight: 400;
  color: rgba(141, 154, 183, 1);
  line-height: 24px;
}
.right {
  font-size: 13px !important;
  font-weight: 500;
  color: rgba(255, 39, 55, 1);
  line-height: 24px;
}
</style>