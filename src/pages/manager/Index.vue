<template>
  <transition name="fade">
    <div-flex-column class="container">
      <div class="page-bg"></div>
      <div-flex-row class="header-nav">
        <div class="bg"></div>
        <div-flex-row class="left" @click="clickToHome">
          <img src="../../assets/logo.png"/>
          <div-flex-row>教练端</div-flex-row>
        </div-flex-row>
        <div-flex-row class="right">
          <img class="head-view" :style="'background-image:url('+require('../../assets/logo.png')+')'"/>
          <div-flex-row class="logout" @click="clickToLogout">注销</div-flex-row>
        </div-flex-row>
      </div-flex-row>
      <el-container class="main">
        <el-aside class="left-nav" width="180px">
          <el-menu class="menu" :unique-opened="true" :default-active="curIndex">
            <el-menu-item index="1" @click="clickToHome">
              <img class="icon" src="../../assets/manager/ic_menu_students.png">
              <span slot="title">学员管理</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <img class="icon" src="../../assets/manager/ic_menu_questions.png">
                <span>题目管理</span>
              </template>
              <el-menu-item index="2-1" @click="clickToA1_A3_B1_Que">A1、A3、B1 类</el-menu-item>
              <el-menu-item index="2-2" @click="clickToB2_A2_Que">B2、A2 类</el-menu-item>
              <el-menu-item index="2-3" @click="clickToC1_C2_C3_Que">C1、C2、C3 类</el-menu-item>
              <el-menu-item index="2-4" @click="clickToE_F_D_Que">E、F、D 类</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div-flex-column>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        curIndex: "1",
        userInfo:{},

      }
    },
    methods: {
      clickToHome: function () {
        this.$router.replace("/manager/index/students?menu=1");
      },
      clickToA1_A3_B1_Que: function () {
        this.$router.replace("/manager/index/a1_a3_b1_que");
      },
      clickToB2_A2_Que: function () {
        this.$router.replace("/manager/index/b2_a2_que");
      },
      clickToC1_C2_C3_Que: function () {
        this.$router.replace("/manager/index/c1_c2_c3_que");
      },
      clickToE_F_D_Que: function () {
        this.$router.replace("/manager/index/e_f_d_que");
      },
      clickToLogout: function () {
        this.$Api.teaLogout(this, {}).then((res) => {
          if (res.code == 200) {
            localStorage.setItem("token", null);
            localStorage.setItem("userInfo", null);
            this.$router.replace("/index");
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
    },
    mounted() {
      document.title = "教练端 | 驾驶员理论考试模拟系统"
      if (this.$route.query.menu)
        this.curIndex = this.$route.query.menu;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.userInfo == undefined)
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
    width: 180px;
    transition: .3s all;
    cursor: pointer;
    height: 100%;
    align-items: center;
    justify-content: center;
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

  .container .main .left-nav {
    padding: 50px 0 50px 0;
    background: linear-gradient(15deg, rgba(17, 196, 255, 0.49), rgba(75, 218, 255, 0.47));
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.07);
  }

  .container .main .left-nav .menu {
    background: transparent;
    border: 0;
    width: 180px;
  }

  .container .main .left-nav .menu >>> .el-menu--inline {
    background: transparent;
    background: rgba(0, 0, 0, 0.035);
  }

  .container .main .left-nav .menu >>> .el-submenu__title {
    background: transparent;
    color: #555555;
  }

  .container .main .left-nav .menu >>> .el-menu-item {
    color: #555555;
    min-width: auto;
  }

  .container .main .left-nav .menu >>> .el-menu-item:focus, .el-menu-item:hover {
    background: rgba(0, 0, 0, 0.13);
    color: white;
  }

  .container .main .left-nav .menu >>> .el-menu-item.is-active {
    color: white;
    background: rgba(0, 0, 0, 0.13);
  }

  .container .main .left-nav .menu .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>
