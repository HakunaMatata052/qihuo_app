<template>
  <div class="container" id="home">
    <narBar :goback="false" />
    <div class="main">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image class="banner-item" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-swipe-item>
        <van-swipe-item>
          <van-image class="banner-item" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-swipe-item>
      </van-swipe>
      <van-notice-bar color="#0EBDFF" background="rgba(25,26,31,1)" left-icon="info-o">
        <template slot="left-icon">
          <van-icon class-prefix="icon" name="dunpai" style="margin-right:5px;" />
        </template>
        通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容
      </van-notice-bar>

      <van-grid square class="menu" :border="false" :gutter="1">
        <van-grid-item class="menu-item">
          <div class="icon">
            <van-icon class-prefix="icon" name="tongji" color="rgba(141,154,183,1)" />
          </div>
          <h3>模拟交易</h3>
        </van-grid-item>
        <van-grid-item class="menu-item">
          <div class="icon">
            <van-icon class-prefix="icon" name="xinshouxuetang" color="rgba(141,154,183,1)" />
          </div>
          <h3>新手入门</h3>
        </van-grid-item>
        <van-grid-item class="menu-item">
          <div class="icon">
            <van-icon class-prefix="icon" name="liwu" color="rgba(141,154,183,1)" />
          </div>
          <h3>活动专区</h3>
        </van-grid-item>
        <van-grid-item class="menu-item">
          <div class="icon">
            <van-icon class-prefix="icon" name="qiandai-" color="rgba(141,154,183,1)" />
          </div>
          <h3>充值中心</h3>
        </van-grid-item>
      </van-grid>
      <table border="0" class="table">
        <tr>
          <th>主力合约</th>
          <th width="30%">最新价</th>
          <th width="20%">成交量</th>
          <th width="25%">涨跌幅</th>
        </tr>
        <tr @click="$router.push('/quotationDetail/'+data.id)">
          <td>
            {{data.name}}
            <small>{{data.code}}</small>
          </td>
          <td>
            <small :class="data.zd=='zhang'? 'zhang':'die'">
              {{data.last_price}}
              <van-icon
                class-prefix="icon"
                name="die"
                color="#00CC00"
                size="8"
                v-if="data.zd=='die'"
              />
              <van-icon
                class-prefix="icon"
                name="zhang"
                color="#FF2737"
                size="8"
                v-else-if="data.zd=='zhang'"
              />
            </small>
          </td>
          <td>
            <small>{{data.volume}}</small>
          </td>
          <td>
            <van-tag round type="danger" size="large">{{data.zdf}}</van-tag>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import narBar from "@/components/navbar/navbar.vue";
export default {
  name: "home",
  components: {
    narBar
  },
  data() {
    return {
      data: {},
      websocket: null
    };
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },

  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  mounted() {},
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
      var data = JSON.parse(e.data)
      data.id = data.symbol.slice(-1,4)
      if(data.last_price>this.data.last_price){
        data.zd = "zhang"
      }else{
        data.zd = "die"
      }
      data.zdf = this.$METHOD.fomatFloat(((data.last_price - data.pre_close) / data.pre_close) *100,1)+'%';
      data.code = data.symbol.split('.')[1]
      data.name = this.$store.state.nameList[data.symbol.split('.')[1].slice(0,2)]
      this.data = data;
    },
    websocketsend(agentData) {
      //数据发送
      this.websock.send(agentData);
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
    }
  }
};
</script>

<style lang="less" scoped>
.banner-item {
  width: 100%;
  height: 100px;
  display: block;
}
.menu {
  margin-top: 10px;
  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(25, 26, 31, 1);
    position: relative;
    .icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      background: #000;
      text-align: center;
      margin-bottom: 5px;
    }
    h3 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(141, 154, 183, 1);
      line-height: 24px;
    }
    &:after {
      content: "";
      display: block;
      height: 100px;
      width: 1px;
      position: absolute;
      right: 0;
      top: 0;
      background: #000;
    }
  }
}
.table {
  background: rgba(25, 26, 31, 1);
  width: 100%;
  color: #fff;
  margin-top: 10px;
  font-size: 15px;
  th {
    font-weight: 500;
    line-height: 24px;
    padding: 10px 0;
    border-bottom: 1px solid #000;
  }
  td {
    text-align: center;
    vertical-align: middle;
    padding: 10px 0;
  }
  small {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: rgba(141, 154, 183, 1);
    &.zhang {
      color: #ff2737;
    }
    &.die {
      color: #00cc00;
    }
  }
}
</style>

