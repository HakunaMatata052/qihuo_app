<template>
  <div class="container" id="mine">
    <navBar :goback="false" />
    <div class="main">
      <div class="userinfo">
        <van-image class="avatar" :src="userInfo.user_img || ''" @click="editAvatar" />
        <h3>{{userInfo.user_account}}</h3>
        <van-grid class="info" :column-num="2" :center="true">
          <van-grid-item class="info-item">
            账户余额
            <p>
              <span>¥</span>
              {{userInfo.ac_balance}}
            </p>
          </van-grid-item>
          <van-grid-item class="info-item">
            红包余额
            <p>
              <span>¥</span>
              {{userInfo.ac_reward}}
            </p>
          </van-grid-item>
        </van-grid>
      </div>
      <van-grid :column-num="2" :center="true">
        <van-grid-item>
          <div class="btn">提现</div>
        </van-grid-item>
        <van-grid-item>
          <div class="btn">充值</div>
        </van-grid-item>
      </van-grid>
      <van-cell-group :border="false">
        <van-cell title="充值记录" is-link to="/rechargeRecord">
          <template slot="icon">
            <van-icon class-prefix="icon" name="chongzhi" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>
        <van-cell title="提现记录" is-link to="/discountRecord">
          <template slot="icon">
            <van-icon class-prefix="icon" name="tixian" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>
        <van-cell title="个人信息" is-link to="/setting">
          <template slot="icon">
            <van-icon class-prefix="icon" name="user" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>
        <van-cell title="资金明细" is-link>
          <template slot="icon">
            <van-icon class-prefix="icon" name="mingxi" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>

        <van-cell title="红包明细" is-link to="/amountgive">
          <template slot="icon">
            <van-icon class-prefix="icon" name="hongbao" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>
        <van-cell title="推荐好友" is-link>
          <template slot="icon">
            <van-icon class-prefix="icon" name="laba" size="14px" style="margin-right:5px;" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="logout" @click="logout">退出</div>
    </div>
    <!-- 上传头像层 -->
    <uploadImage ref="upload" @uploadSuccess="uploadSuccess" appearance="circular" mode="image" />
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import uploadImage from "@/components/upload/uploadImage.vue";
export default {
  name: "mine",
  components: {
    navBar,
    uploadImage
  },
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.$SERVER.userinfo().then(res => {
      this.userInfo = res.data;
      console.log(this.userInfo.user_img);
    });
  },
  methods: {
    editAvatar() {
      this.$refs.upload.openLoadPopup();
    },
    uploadSuccess(val) {
      this.$SERVER
        .faceup({
          user_img: val
        })
        .then(res => {
          this.userInfo.user_img = val;
        });
    },
    logout() {
      this.$SERVER.logout().then(res => {
        this.$METHOD.removeStore("token");
        this.$METHOD.removeStore("userInfo");
        this.$store.state.token = ""
        this.$toast.success(res.msg);
        this.$router.push('/');
      });
    }
  },
  activated() {}
};
</script>
<style lang="less">
[class*="van-hairline"]::after {
  border-color: #000;
}
</style>

<style lang="less" scoped>
.userinfo {
  background: rgba(25, 26, 31, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
  }
  h3 {
    font-size: 13px;
    font-weight: 400;
    color: rgba(141, 154, 183, 1);
    line-height: 24px;
    margin: 10px 0;
  }
  .info {
    width: 100%;
    .info-item {
      font-size: 13px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
      p {
        font-size: 20px;
        font-family: Bahnschrift-Regular;
        font-weight: 400;
        color: rgba(14, 189, 255, 1);
        line-height: 24px;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
.btn {
  width: 130px;
  height: 36px;
  line-height: 36px;
  background: rgba(255, 36, 73, 1);
  border-radius: 18px;
  color: #fff;
  text-align: center;
}
.logout {
  border: 1px solid #8d9ab7;
  border-radius: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 40%;
  margin: 20px auto;
  color: #8d9ab7;
}
</style>

