<template>
  <div class="container">
    <navBar :title="title"></navBar>
    <div class="main">
      <div class="box box1">
        <h2>
          沪深300
          <small>(IF1908)</small>
        </h2>
        <div class="last-price">
          最新价
          <span class="zhang">20865</span>
          <van-icon class-prefix="icon" name="die" color="#00CC00" size="8" />
        </div>
        <p>持仓至 04:55:00自动平仓</p>
      </div>
      <div class="empty"></div>
      <div class="box box2">
        <h3>
          交易数量
          <small>最小波动10美元（70人民币）</small>
        </h3>
        <div class="con" @click="radioFn('shoushu',$event)">
          <div
            :class="item == form.shoushu ? 'radio active' : 'radio'"
            v-for="(item,index) in shoushu"
            :key="index"
            :data-index="item"
          >{{item}}手</div>
        </div>
      </div>
      <div class="box">
        <h3
          @click="tips('当行情价到达止盈价时，会立即触发止盈风控，平台将自动向交易所提交平仓申请，实际平仓价格以在交易所成交价格为准。当行情波动较大时，实际成交价可能高于/低于止盈价。')"
        >
          触发止盈
          <svg-icon iconClass="help" class="help-icon" />
        </h3>
        <span>5250元</span>
      </div>
      <div class="box">
        <h3
          @click="tips('当行情价到达止损价时，会立即触发止损风控，平台将自动向交易所提交平仓申请，实际平仓价格以在交易所成交价格为准。当行情波动较大时，实际成交价可能高于/低于止损价。')"
        >
          触发止损
          <svg-icon iconClass="help" class="help-icon" />
        </h3>
        <div class="con" @click="radioFn('zhisun',$event)">
          <div
            :class="item == form.zhisun ? 'radio active' : 'radio'"
            v-for="(item,index) in zhisun"
            :key="index"
            :data-index="item"
          >{{item}}</div>
        </div>
      </div>

      <div class="box">
        <h3 @click="tips('保证金指此订单最大的亏损金额，在行情波动较大时，实际亏损费用可能高于/低于缴纳的保证金费用。')">
          履约保证金（冻结）
          <svg-icon iconClass="help" class="help-icon" />
        </h3>
        <span class="zhang">1050元</span>
      </div>
      <div class="box">
        <h3 @click="tips('交易综合费指在开仓时需要缴纳的交易费用，平仓时不再收取，且每交易1手即会收取一次费用。')">
          交易综合费
          <svg-icon iconClass="help" class="help-icon" />
        </h3>
        <span class="zhang">158.00元</span>
      </div>

      <div class="box">
        <h3>红包余额：0.00</h3>
        <van-switch v-model="form.hongbao" />
      </div>
      <div class="boxbg">可用余额：23541.50元</div>
    </div>
    <div class="box">
      合计支付：
      <span>3541.50元</span>
      <van-button type="danger" round size="large" class="submit">确认{{title}}</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "trade",
  components: {
    navBar
  },
  computed: {
    title() {
      if (this.$route.params.type == 0) {
        return "买跌";
      } else {
        return "买涨";
      }
    }
  },
  data() {
    return {
      shoushu: [1, 2, 3, 5, 8, 10],
      zhisun: [750, 1150, 2150, 3500, 5000],
      form: { shoushu: 0, zhisun: 0, hongbao: true }
    };
  },
  methods: {
    radioFn(field, e) {
      this.form[field] = e.target.dataset.index;
    },
    tips(msg) {
      this.$dialog.alert({
        title: "提示",
        message: msg,
        confirmButtonColor: "#fff"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.empty {
  height: 15px;
}
.boxbg {
  padding: 12px 15px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(141, 154, 183, 1);
  line-height: 25px;
}
.box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px 15px;
  h3 {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
    small {
      font-size: 12px;
      font-weight: 400;
      color: rgba(141, 154, 183, 1);
      line-height: 25px;
    }
  }
  .con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }
  .help-icon {
    width: 16px;
    height: 13px;
    margin-left: 5px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 25px;
    &.zhang {
      color: #ff2737;
    }
    &.die {
      color: #00cc00;
    }
  }
}
.box1 {
  h2 {
    font-size: 17px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    small {
      font-size: 12px;
      font-weight: 400;
      color: rgba(141, 154, 183, 1);
      line-height: 24px;
    }
  }
  .last-price {
    font-size: 15px;
    font-weight: 500;
    color: rgba(141, 154, 183, 1);
    line-height: 25px;
  }
  p {
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: rgba(14, 189, 255, 1);
    line-height: 25px;
  }
}
.radio {
  font-size: 12px;
  font-weight: bold;
  color: rgba(141, 154, 183, 1);
  width: 45px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: rgba(25, 26, 31, 1);
  border: 1px solid rgba(141, 154, 183, 1);
  border-radius: 5px;
  &.active {
    color: #fff;
    border: 1px solid rgba(255, 39, 55, 1);
    background: rgba(255, 39, 55, 1);
  }
}
.submit {
  width:250px;
height:44px;
line-height: 44px;
font-size:18px;
font-weight:500;
color:rgba(255,255,255,1);
line-height:24px;
margin: 10px auto 0;
}
</style>
