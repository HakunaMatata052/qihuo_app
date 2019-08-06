<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <table border="0" class="table">
          <tr>
            <th>订单编号</th>
            <th width="30%">金额</th>
            <th width="20%">状态</th>
            <th width="25%">时间</th>
          </tr>
          <tr v-for="(item,index) in list" :key="index">
            <td>
              <small>{{item.out_sn}}</small>
            </td>
            <td>
              <small>￥{{item.amount}}</small>
            </td>
            <td>
              <small>{{item.op_state}}</small>
            </td>
            <td>
              <small>{{$METHOD.format(item.updated_at*1000,'yyyy.MM.dd')}}</small>
            </td>
          </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import { debug } from 'util';
export default {
  name: "discountRecord",
  components: {
    navBar
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: []
    };
  },
  methods: {
    getList() {
      this.$SERVER
        .withdrawlist({
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
<style lang="less" scoped>
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
  }
}
</style>
