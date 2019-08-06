<template>
  <div class="container">
    <navBar title>
      <template slot="title">123</template>
    </navBar>
    <div class="main">
      <div class="box box1">
        <dl>
          <dt>账户余额(元)</dt>
          <dd>3241.05</dd>
        </dl>
        <dl>
          <dt>持仓盈亏(元)</dt>
          <dd>3241.05</dd>
        </dl>
        <van-button type="info" round class="btn">充值</van-button>
      </div>
      <div :class="data.zd=='zhang'? 'zhang box box2':'die box box2' ">
        <h4>{{data.last_price}}</h4>
        <small>{{data.zdf}}</small>
        <small>
            {{$METHOD.fomatFloat(data.last_price-data.pre_close,1)}}</small>
        <div class="selectMode">换成模拟盘</div>
      </div>
      <div class="business">
        <div class="text">
          <div>
            买入
            <span class="mai">5</span>
          </div>
          <div>
            卖出
            <span class="maii">3</span>
          </div>
        </div>
        <van-progress class="progress" :percentage="progress" :show-pivot="false" color="#FF2737" />
      </div>
      <div class="box">
        <van-tabs
          v-model="tabActive"
          title-active-color="#0EBDFF"
          :swipe-threshold="7"
          :border="false"
        >
          <van-tab title="分时" :name="1">
              <!-- <kline :data="data"/> -->
          </van-tab>
          <van-tab title="日分时" :name="2"></van-tab>
          <van-tab title="1分" :name="3"></van-tab>
          <van-tab title="3分" :name="4"></van-tab>
          <van-tab title="5分" :name="5"></van-tab>
          <van-tab title="15分" :name="6"></van-tab>
          <van-tab title="盘口" :name="7"></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import kline from "@/components/echarts/kline.vue";
export default {
  name: "quotationDetail",
  components: {
    navBar,
    kline
  },
  data() {
    return {
      tabActive: 1,
      data:{}
    };
  },
  computed: {
    progress() {
      return 10;
    }
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = this.$store.state.webSocket; //ws地址
      this.websocket = new WebSocket(wsuri);
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },

    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      //注意：长连接我们是后台直接1秒推送一条数据，
      //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      var data = JSON.parse(e.data);
      if (data.last_price > this.data.last_price) {
        data.zd = "zhang";
      } else {
        data.zd = "die";
      }
      data.zdf =
        this.$METHOD.fomatFloat(
          ((data.last_price - data.pre_close) / data.pre_close) * 100,
          1
        ) + "%";
      data.code = data.symbol.split(".")[1];
      data.name = this.$store.state.nameList[data.symbol.split(".")[1].slice(0, 2)];
      this.data = data;
    },

    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },

    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e + ")");
    }
  }
};
</script>
<style lang="less">
.van-progress__portion {
  border-radius: 10px 0 0 10px;
}
</style>

<style lang="less" scoped>
.box1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  dl {
    text-align: center;
    dt {
      font-size: 13px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
    dd {
      font-size: 21px;
      font-family: Bahnschrift-Regular;
      font-weight: 400;
      color: rgba(14, 189, 255, 1);
      line-height: 24px;
    }
  }
  .btn {
    flex-shrink: 0;
    width: 90px;
    height: 30px;
    line-height: 30px;
  }
}
.box2 {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 15px 0;
  h4 {
    font-size: 25px;
    
    line-height: 24px;
  }
  small {
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
  }
  .selectMode {
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
  }
  &.zhang {
    color: #FF2737;
  }
  &.die {
    color: rgba(0, 204, 0, 1);
  }

}
.business {
  padding: 5px 15px;
  .text {
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 5px;
    font-size: 13px;
    color: rgba(141, 154, 183, 1);
    line-height: 25px;
    .mai {
      color: #ff2737;
    }
    .maii {
      color: #00cc00;
    }
  }
}
</style>
