<template>
  <div-flex-column class="container">
    <div class="page-bg"></div>
    <div-flex-row class="header-nav">
      <div class="bg"></div>
      <div-flex-row class="left" @click="clickToHome">
        <img src="../../assets/logo.png"/>
        <div-flex-row>学员端</div-flex-row>
      </div-flex-row>
      <div-flex-row class="right">
        <div-flex-row class="to-refer-person-msg" @click="clickToPersonMsg">查看个人信息 </div-flex-row>
        <div-flex-row class="logout" @click="clickToLogout">注销</div-flex-row>
      </div-flex-row>
    </div-flex-row>
    <div-flex-column class="main">
      <router-view></router-view>
    </div-flex-column>
  </div-flex-column>
</template>

<script>
  export default {
    data() {
      return {
        userInfo:{
        }
      }
    },
    methods: {
      clickToHome: function () {
        this.$router.push("/client/index/modes");
      },
      clickToPersonMsg: function () {
        this.$router.push("/client/index/personmsg");
      },
      clickToLogout:function () {
        this.$Api.stuLogout(this,{}).then((res) => {
          if (res.code == 200) {
            localStorage.setItem("token", null);
            localStorage.setItem("userInfo",null);
            this.$router.replace("/index");
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    mounted() {
      document.title = "学员 | 驾驶员理论考试模拟系统";
      this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
      if(this.userInfo.gender==undefined)
        this.$router.replace("/index");
    }
  }
</script>

<style scoped>

  .container {
    width: 100%;
    height: 100%;
  }

  .container .page-bg {
    background: linear-gradient(15deg, #116fff, #8ae7ff);
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .container .header-nav {
    position: fixed;
    width: 100%;
    height: 50px;
    align-items: center;
    top: 0;
    z-index: 2;
  }

  .container .header-nav .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 2px 0 3px #dddddd;
    z-index: 0;
  }

  .container .header-nav .left {
    position: absolute;
    left: 0;
    transition: .3s all;
    cursor: pointer;
    height: 100%;
    align-items: center;
    padding: 0 20px 0 20px;
  }

  .container .header-nav .left:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .container .header-nav .left img {
    width: 25px;
    height: 25px;
  }

  .container .header-nav .left > div {
    font-size: 16px;
    font-weight: bold;
    color: #708499;
    margin: 0 0 0 15px;
    align-items: center;
  }

  .container .header-nav .right {
    position: absolute;
    right: 0;
    transition: .3s all;
    height: 100%;
    align-items: center;
  }

  .container .header-nav .right .logout {
    font-size: 15px;
    color: #7f8c99;
    padding: 0 15px 0 15px;
    cursor: pointer;
    transition: .3s all;
    height: 100%;
    align-items: center;
  }

  .container .header-nav .right .logout:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .container .header-nav .right .head-view {
    width: 37px;
    height: 37px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #cccccc;
    cursor: pointer;
    margin: 0 10px 0 10px;
    border-radius: 1000px;
    box-shadow: 1px 1px 3px #bbbbbb;
  }

  .container .header-nav .right .to-refer-person-msg {
    padding: 0 10px 0 10px;
    color: #50a3ff;
    font-size: 12px;
    letter-spacing: 0px;
    cursor: pointer;
  }

  .container .main {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }

</style>
