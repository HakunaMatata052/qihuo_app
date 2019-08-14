<template>
  <div class="container">
    <narBar />
    <div class="main">
      <h3>每日活动</h3>
      <div class="panel">
        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>签到</h2>
            <p>每日签到送红包</p>
          </div>
          <van-button class="panel-right" @click="qiandao" v-if="data.qiandao_state">立即签到</van-button>
          <van-button class="panel-right disable" :disabled="true" v-else>已签到</van-button>
        </div>

        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>充值送红包</h2>
            <p>银行卡转账即送{{data.chongzhi_price}}红包</p>
          </div>
          <van-button class="panel-right">去充值</van-button>
        </div>
      </div>
      <h3>新手活动</h3>
      <div class="panel">
        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>新人加入</h2>
            <p>新用户注册（送{{data.zhuce_price}}元红包）</p>
          </div>
          <van-button class="panel-right" v-if="data.zhuce_state" @click="xinren">立即领取</van-button>
          <van-button class="panel-right disable" :disabled="true" v-else>已领取</van-button>
        </div>
        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>实名认证</h2>
            <p>完成个人信息验证（送{{data.shiming_price}}元红包）</p>
          </div>
          <van-button class="panel-right" v-if="data.shoukai_state">去认证</van-button>
          <van-button class="panel-right disable" :disabled="true" v-else>已认证</van-button>
        </div>
        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>首次入金</h2>
            <p>首次充值成功（送{{data.shouchong_price}}元红包）</p>
          </div>
          <van-button class="panel-right" v-if="data.shouchong_state">去完成</van-button>
          <van-button class="panel-right disable" :disabled="true" v-else>已完成</van-button>
        </div>
        <div class="panel-item van-hairline--bottom">
          <div class="panel-left">
            <h2>小试牛刀</h2>
            <p>首次开仓成功（送{{data.shoukai_price}}元红包）</p>
          </div>
          <van-button class="panel-right" v-if="data.shoukai_state">去完成</van-button>
          <van-button class="panel-right disable" :disabled="true" v-else>已完成</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import narBar from "@/components/navbar/navbar.vue";
export default {
  name: "activities",
  components: {
    narBar
  },
  data() {
    return {
      activeNames: [],
      data: {
        chongzhi_price: "",
        chongzhi_state: true,
        qiandao_price: "",
        qiandao_state: true,
        shiming_price: "",
        shiming_state: true,
        shouchong_price: "",
        shouchong_state: true,
        shoukai_price: "",
        shoukai_state: true,
        zhuce_price: "",
        zhuce_state: true
      }
    };
  },
  created() {
    this.$SERVER.giveIndex().then(res => {
      this.$toast.clear();
      this.data = res.data;
    });
  },
  mounted() {
    this.$toast.loading({
      mask: true,
      message: "加载中..."
    });
  },
  methods: {
    qiandao(e) {
      e.target.disabled = true;
      this.$SERVER
        .signadd()
        .then(res => {
          e.target.disabled = false;
          this.data.qiandao_state = false;
          this.$toast.success(res.msg);
        })
        .catch(err => {
          e.target.disabled = false;
        });
    },
    xinren(e) {
      e.target.disabled = true;
      this.$SERVER
        .resultGive()
        .then(res => {
          e.target.disabled = false;
          this.data.zhuce_state = false;
          this.$toast.success(res.msg);
        })
        .catch(err => {
          e.target.disabled = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  font-size: 14px;
  font-weight: 400;
  color: rgba(141, 154, 183, 1);
  line-height: 24px;
  padding: 15px;
}
.panel {
  .panel-item {
    display: flex;
    align-items: center;
    padding: 10px 15px 10px 30px;
    background: rgba(25, 26, 31, 1);
    .panel-left {
      flex-grow: 1;
      h2 {
        font-size: 15px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        color: rgba(141, 154, 183, 1);
        line-height: 24px;
      }
    }
    .panel-right {
      flex-shrink: 0;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(14, 189, 255, 1);
      border-radius: 15px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &.disable {
        background: rgba(141, 154, 183, 1);
      }
    }
  }
}
</style>