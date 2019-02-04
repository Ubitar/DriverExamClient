<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div class="tip">
            修改密码
          </div>
        </div-flex-row>
        <div-flex-column class="card card-first">
          <div-flex-column class="table">
            <div-flex-row class="line">
              <div-flex-row>新密码：</div-flex-row>
              <el-input v-model="pwd" placeholder="请输入新密码" size="small" type="password"></el-input>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>再次输入：</div-flex-row>
              <el-input v-model="pwd2" placeholder="请再次输入密码" size="small" type="password"></el-input>
            </div-flex-row>
            <div-flex-row class="line buttons">
              <el-button type="primary" size="small" style="width: 100px;" @click="clickSubmit">修改</el-button>
              <el-button type="info" size="small" style="width: 100px;margin: 0 0 0 20px" @click="clickCancel">取消
              </el-button>
            </div-flex-row>
          </div-flex-column>
        </div-flex-column>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>

  export default {
    data() {
      return {
        pwd: "",
        pwd2: ""
      }
    },
    methods: {
      clickSubmit: function () {
        this.$Api.stuChangePwd(this, {
          'password': this.pwd,
          'password2': this.pwd2
        }).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg,
            });
            this.$router.go(-1);
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      clickCancel: function () {
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped>
  .page {
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .container {
    width: 100%;
    margin: 80px 0 0 0;
    position: absolute;
    align-items: center;
  }

  .page .header {
    width: 800px;
    position: relative;
    background-color: rgba(255, 255, 255, 0.84);
    height: 40px;
    border-radius: 1000px;
    box-shadow: 1px 1px 3px #b6f7ff;
  }

  .page .header .tip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #3ac0ff;
    cursor: pointer;
  }

  .page .card {
    width: 800px;
    box-shadow: 1px 1px 3px #b6f7ff;
    background-color: rgba(255, 255, 255, 0.84);
    margin: 30px 0 0 0;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  .page .card-first {
    padding: 30px;
  }

  .page .table {
    width: 500px;
    margin: 0 0 0 150px;
  }

  .page .table .line {
    width: 100%;
    align-items: center;
    margin: 10px 0 0 0;
  }

  .page .table .sel-head input {
    display: none;
  }

  .page .table .line > div:first-child {
    font-size: 15px;
    color: #666666;
    width: 100px;
    justify-content: flex-end;
  }

  .page .table .line > div:nth-child(2) {
    width: 270px;
  }

  .page .table .line .distpicker-address-wrapper >>> select {
    width: 130px;
    padding: 0 10px 0 10px;
    font-size: 14px;
    height: 30px;
  }

  .page .table .buttons {
    width: 400px;
    justify-content: center;
    margin: 20px 0 0 0;
  }

</style>
