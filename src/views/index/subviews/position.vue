<template>
  <div class="container" id="video">
    <navBar :goback="false" />
    <div class="main">
      <div class="box box-top">
        <dl>
          <dt>总盈亏(元)</dt>
          <dd>75241.05</dd>
        </dl>
        <dl>
          <dt>冻结保证金(元)</dt>
          <dd>5246.04</dd>
        </dl>
        <van-button type="info" class="btn">一键平仓</van-button>
      </div>
      <div class="item">
        <div class="item-top">
          <h3>
            上证50
            <small>IH1908</small>
          </h3>
          <span>买涨1手 </span>
          <p class="die">-300</p>
        </div>
        <div class="item-con">
          <table border="0" class="table">
            <tr>
              <td width="33.3%">
                <dl>
                  <dt>止盈</dt>
                  <dd>20000</dd>
                </dl>
                <dl>
                  <dt>止盈</dt>
                  <dd>20000</dd>
                </dl>
              </td>

              <td width="33.3%">
                <dl>
                  <dt>止盈</dt>
                  <dd>20000</dd>
                </dl>
                <dl>
                  <dt>止盈</dt>
                  <dd class="die">
                    20000
                    <van-icon class-prefix="icon" name="die" color="#00CC00" size="8" />
                  </dd>
                </dl>
              </td>

              <td width="33.3%">
                <dl>
                  <dt>止盈</dt>
                  <dd>20000</dd>
                </dl>
                <dl>
                  <dt>止盈</dt>
                  <dd>20000</dd>
                </dl>
              </td>
            </tr>
          </table>
          <div class="item-btn-group"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "position",
  components: {
    navBar
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 15px;
  dl {
    flex-shrink: 0;
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
}
.box-top {
  .btn {
    width: 90px;
    height: 30px;
    background: rgba(14, 189, 255, 1);
    border-radius: 15px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
  }
}
.item {
  background: #191a1f;
  margin-bottom: 15px;
  color: #fff;
  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #000;
    h3 {
      font-size: 17px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      small {
        font-size: 12px;
        font-weight: 400;
        color: rgba(141, 154, 183, 1);
      }
    }
    span {
      flex-grow: 1;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 36, 73, 1);
      padding: 0 25px;
    }
    p {
      font-size: 15px;
      font-weight: 500;
      &.zhang {
        color: rgba(255, 39, 55, 1);
      }
      &.die {
        color: rgba(0, 204, 0, 1);
      }
    }
  }
  .item-con {
    padding: 10px 20px;
    .table {
      width: 100%;
      dl {
        text-align: center;
        margin-bottom: 25px;
        dt {
          font-size: 13px;
          font-weight: 400;
          color: rgba(141, 154, 183, 1);
          line-height: 25px;
        }
        dd {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 25px;
          &.zhang {
            color: rgba(255, 39, 55, 1);
          }
          &.die {
            color: rgba(0, 204, 0, 1);
          }
        }
      }
    }
  }
}
</style>

