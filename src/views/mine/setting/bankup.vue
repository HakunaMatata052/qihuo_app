<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group :border="false">
        <van-field
          v-model="bank.bank_card_number"
          required
          clearable
          label="银行卡号"
          placeholder="请输入银行卡号"
          type="tel"
        />
        <van-field
          v-model="bank.bank_name"
          required
          clearable
          label="银行名称"
          placeholder="请选择银行名称"
          readonly
          @click="popupShow = true"
        />
        <van-field
          v-model="bank.bank_province_city"
          required
          clearable
          label="开户支行"
          placeholder="请输入开户支行"
        />
        <van-field
          v-model="bank.bank_user_name"
          required
          clearable
          label="开户人名称"
          placeholder="请输入开户人名称"
        />
      </van-cell-group>
      <div class="submit">
        <van-button type="danger" size="large" round @click="submit">提交</van-button>
      </div>
    </div>
    <van-popup v-model="popupShow" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="popupShow = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "bankup",
  components: {
    navBar
  },
  data() {
    return {
      bank: {},
      popupShow: false,
      columns: [
        "招商银行",
        "建设银行",
        "交通银行",
        "邮政储蓄银行行",
        "工商银行",
        "农业银行",
        "中国银行",
        "中信银行",
        "光大银行",
        "华夏银行",
        "民生银行",
        "广发银行",
        "平安银行",
        "星展银行",
        "恒生银行",
        "渣打银行",
        "汇丰银行",
        "东亚银行",
        "花旗银行",
        "浙商银行",
        "恒丰银行",
        "浦东发展银行",
        "兴业银行",
        "齐鲁银行",
        "烟台银行",
        "潍坊银行",
        "渤海银行",
        "上海银行",
        "厦门银行",
        "北京银行",
        "福建海峡银行行",
        "吉林银行",
        "宁波银行",
        "焦作市商业银行",
        "温州银行",
        "广州银行",
        "汉口银行",
        "龙江银行",
        "盛京银行",
        "洛阳银行",
        "辽阳银行",
        "大连银行",
        "苏州银行",
        "河北银行",
        "杭州银行",
        "南京银行",
        "东莞银行",
        "金华银行",
        "乌鲁木齐商业银行",
        "绍兴银行",
        "成都银行",
        "抚顺银行",
        "临商银行",
        "宜昌市商业银行",
        "葫芦岛银行",
        "郑州银行",
        "宁夏银行",
        "齐商银行",
        "锦州银行",
        "珠海华润银行",
        "微商银行",
        "重庆银行",
        "哈尔滨银行",
        "贵阳银行",
        "西安银行",
        "无锡市商业银行",
        "丹东银行",
        "兰州银行",
        "南昌银行",
        "晋商银行",
        "青岛银行",
        "南通商业银行",
        "九江银行",
        "日照银行",
        "鞍山银行",
        "秦皇岛银行",
        "青海银行",
        "台州银行",
        "盐城银行",
        "长沙银行",
        "赣州银行",
        "泉州银行",
        "营口银行",
        "富滇银行",
        "阜新银行",
        "嘉兴银行",
        "廊坊银行",
        "浙江泰隆商业银行",
        "内蒙古银行",
        "湖州银行",
        "沧州银行",
        "广西北部湾银行",
        "包商银行",
        "威海商业银行",
        "攀枝花市商业银行",
        "锦阳市商业银行",
        "泸州市商业银行",
        "三门峡银行",
        "邢台银行",
        "商丘市商业银行",
        "安徽省农村信用",
        "江西省农村信用",
        "湖南省农村信用",
        "无锡农村商业银行"
      ]
    };
  },
  created() {
    this.$SERVER.userinfo().then(res => {
      this.bank = res.data;
    });
  },
  methods: {
    onConfirm(value, index) {
      this.bank.bank_name = value;
      this.popupShow = false;
    },
    submit(){
      if(!(/^([1-9]{1})(\d{14}|\d{18})$/.test(this.bank.bank_card_number))){
        this.$toast.fail('银行卡号不正确')
        return
      }
      if(this.bank.bank_name==""){
        this.$toast.fail('请选择银行')
        return
      }
      if(this.bank.bank_province_city==""){
        this.$toast.fail('请填写开户行')
        return
      }
      if(this.bank.bank_user_name==""){
        this.$toast.fail('请填写开户姓名')
        return
      }
      this.$SERVER.bankup(this.bank).then(res=>{
        this.$toast.success(res.msg)
        this.$router.go(-1)
      })
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

