<template>
  <div class="page">
    <img class="city-border" src="../assets/index/img_city_border.png"/>
    <div-flex-column class="center-control">
      <div-flex-row class="head" @click="clickToLogins">
        <img class="logo" src="../assets/logo.png"/>
        <div>驾驶员理论考试模拟系统</div>
      </div-flex-row>
      <div-flex-row class="buttons" v-if="!isTeacherLogin&&!isStudentLogin">
        <div-flex-column class="button" @click="clickToTeacherLogin">
          <img src="../assets/index/ic_teacher.png"/>
          <div>我是教练</div>
        </div-flex-column>
        <div-flex-column class="button" @click="clickToStudentLogin">
          <img src="../assets/index/ic_student.png"/>
          <div>我是学员</div>
        </div-flex-column>
      </div-flex-row>
      <div-flex-column class="login-control teacher" v-if="isTeacherLogin">
        <div-flex-row>
          <div class="label">账号：</div>
          <el-input v-model="account" size="medium" placeholder="请输入账号"></el-input>
        </div-flex-row>
        <div-flex-row>
          <div class="label">密码：</div>
          <el-input v-model="password" type="password" size="medium" placeholder="请输入密码"></el-input>
        </div-flex-row>
        <el-button class="btn-submit" type="primary" @click="clickLogin">登 录</el-button>
      </div-flex-column>
      <div-flex-column class="login-control student" v-if="isStudentLogin&&!isRegister">
        <div-flex-row>
          <div class="label">账号：</div>
          <el-input v-model="account" size="medium" placeholder="请输入账号"></el-input>
        </div-flex-row>
        <div-flex-row>
          <div class="label">密码：</div>
          <el-input v-model="password" type="password" size="medium" placeholder="请输入密码"></el-input>
        </div-flex-row>
        <el-button class="btn-submit" type="primary" @click="clickLogin">登 录</el-button>
        <div-flex-row class="account-control">
          <div @click="clickToRegister">成为学员</div>
        </div-flex-row>
      </div-flex-column>
      <div-flex-column class="login-control" v-if="isRegister">
        <div-flex-row>
          <div class="label">账号：</div>
          <el-input v-model="account" size="medium" placeholder="请输入账号"></el-input>
        </div-flex-row>
        <div-flex-row>
          <div class="label">密码：</div>
          <el-input v-model="password" type="password" size="medium" placeholder="请输入密码"></el-input>
        </div-flex-row>
        <div-flex-row>
          <div class="label-max">确认密码:</div>
          <el-input v-model="password2" type="password" size="medium" placeholder="再次输入密码"></el-input>
        </div-flex-row>
        <el-button class="btn-submit" type="primary" @click="clickRegister">注 册</el-button>
      </div-flex-column>
    </div-flex-column>
    <div class="author-msg">作者：黄品彰&nbsp;&nbsp;&nbsp;&nbsp;学号：1540129247</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isTeacherLogin: false,
        isStudentLogin: false,
        isRegister: false,
        account: "",
        password: "",
        password2: "",
      }
    },
    methods: {
      clickToLogins: function () {
        this.isTeacherLogin = false;
        this.isStudentLogin = false;
        this.isRegister = false;
        this.account = "";
        this.password = "";
        this.password2 = "";
      },
      clickToTeacherLogin: function () {
        this.account = "";
        this.password = "";
        this.isTeacherLogin = true
      },
      clickToStudentLogin: function () {
        this.account = "";
        this.password = "";
        this.isStudentLogin = true
      },
      clickToRegister: function () {
        this.account = "";
        this.password = "";
        this.isRegister = true
      },
      clickRegister: function () {
        this.$Api.stuRegister(this, {
          "account": this.account,
          "password": this.password,
          "password2": this.password2
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "注册成功，请登录",
            });
            this.account = this.password = this.password2 = "";
            this.isRegister = false;
            this.isStudentLogin = true;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      clickLogin: function () {
        if (this.isStudentLogin) {
          this.$Api.stuLogin(this, {
            "account": this.account,
            "password": this.password
          }).then((res) => {
            if (res.code == 200) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$router.replace("/client/index/modes");
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
        } else {
        A
        }
      }
    },
    mounted() {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        if (userInfo.gender == undefined) {
          this.$router.replace("/manager/index/students");
        } else {
          this.$router.replace("/client/index/modes");
        }
      }
    }
  }
</script>

<style scoped>
  .page {
    background: red;
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(35deg, #005dff, #b6f7ff);;
  }

  .page .city-border {
    position: absolute;
    width: 761px;
    height: 160px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .page .center-control {
    width: 570px;
    height: 500px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto auto;
    position: absolute;
    align-items: center;
  }

  .page .center-control .head {
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .page .center-control .head .logo {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
  }

  .page .center-control .head > div {
    color: #555555;
    font-size: 40px;
    margin: 0 0 0 30px;
  }

  .page .center-control .buttons {
    justify-content: center;
    margin: 70px 0 0 0;
    width: 100%;
    animation: .6s buttons-fade-in;
  }

  .page .center-control .buttons .button {
    width: 200px;
    height: 200px;
    background: #e7f3ff;
    border-radius: 20px;
    transition: .3s all;
    box-shadow: 2px 2px 5px #555555;
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  .page .center-control .buttons .button:hover {
    transform: scale(1.05);
    background: #d3eaff;
  }

  .page .center-control .buttons .button:nth-child(2) {
    margin: 0 0 0 50px;
  }

  .page .center-control .buttons .button img {
    width: 50px;
    height: 50px;
  }

  .page .center-control .buttons .button > div {
    font-size: 25px;
    color: #666666;
    margin: 20px 0 0 0;
  }

  .page .login-control {
    width: 280px;
    background: #e8f3ff;
    margin: 40px 0 0 0;
    border-radius: 10px;
    padding: 10px 30px 30px 30px;
    animation: .7s buttons-fade-in;
  }

  .page .author-msg {
    color: rgba(255, 255, 255, 0.83);
    font-size: 15px;
    position: absolute;
    background: rgba(48, 107, 255, 0.5);
    border-radius: 3000px;
    padding: 10px 20px 10px 20px;
    bottom: 0;
    animation: .6s buttons-fade-in;
  }

  .page .teacher {
    margin-top: 60px;
  }

  .page .teacher .account-control {
    font-size: 14px;
    color: #888888;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
  }

  .page .account-control > div {
    cursor: pointer;
  }

  .page .student .account-control {
    font-size: 14px;
    color: #888888;
    margin-top: 15px;
    /*justify-content: space-between;*/
    justify-content: center;
  }

  .page .login-control > div {
    margin: 20px 0 0 0;
    align-items: center;
  }

  .page .login-control .label {
    width: 80px;
    font-size: 18px;
    color: #444444;
  }

  .page .login-control .label-max {
    width: 130px;
    font-size: 18px;
    color: #444444;
  }

  .page .login-control .btn-submit {
    margin: 20px 0 0 0;
  }

  @keyframes buttons-fade-in {
    0% {
      transform: translateY(30%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 100%;
    }
  }
</style>
