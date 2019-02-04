<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div class="tip">
            请填写您的个人资料
          </div>
        </div-flex-row>
        <div-flex-column class="card card-first">
          <div-flex-column class="table">
            <div-flex-column class="line sel-head">
              <el-upload
                class="avatar-uploader"
                :action="getFileUploadPath"
                :show-file-list="false"
                :on-success="afterUploadHeadview"
                style="width: auto">
                <img v-if="userInfo.headview" :src="userInfo.headview" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div-flex-column>
            <div-flex-row class="line">
              <div-flex-row>姓名：</div-flex-row>
              <el-input v-model="userInfo.name" placeholder="请输入真实姓名" size="small"></el-input>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>手机号：</div-flex-row>
              <el-input v-model="userInfo.mobile" placeholder="请输入联系手机号" size="small"></el-input>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>性别：</div-flex-row>
              <el-radio-group v-model="userInfo.gender" size="small">
                <el-radio label="1" border>男</el-radio>
                <el-radio label="2" border>女</el-radio>
              </el-radio-group>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>出生日期：</div-flex-row>
              <el-date-picker
                v-model="userInfo.birthday"
                type="date" format="yyyy 年 MM 月 dd 日" value-format="timestamp"
                placeholder="选择日期" size="small">
              </el-date-picker>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>所在地区：</div-flex-row>
              <v-distpicker :province="userInfo.province" :city="userInfo.city" @selected="selCity"
                            hide-area></v-distpicker>
            </div-flex-row>
            <div-flex-row class="line">
              <div-flex-row>身份证号：</div-flex-row>
              <el-input v-model="userInfo.idCard" placeholder="请输入身份证号" size="small"></el-input>
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
  import VDistpicker from 'v-distpicker'

  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    methods: {
      afterUploadHeadview: function (res, file) {
        if (res.code == 200) {
          this.userInfo.headview = res.data;
        } else this.$message({
          message: res.msg,
          type: 'error'
        });
      },
      selCity: function (e) {
        this.userInfo.province = e.province.value;
        this.userInfo.city = e.city.value;
      },
      clickSubmit: function () {
        this.$Api.updatePersonMsg(this, {
          "headview": this.userInfo.headview,
          "name": this.userInfo.name,
          "mobile": this.userInfo.mobile,
          "idCard": this.userInfo.idCard,
          "birthday": this.userInfo.birthday,
          "gender": this.userInfo.gender,
          "province": this.userInfo.province,
          "city": this.userInfo.city
        }).then((res) => {
          if (res.code == 200) {
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
            this.$message({
              message: res.msg,
            });
            this.$router.go(-1)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      clickCancel: function () {
        this.$router.go(-1)
      }
    },
    computed: {
      getFileUploadPath() {
        return this.$Api.FILE_UPLOAD;
      },
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    components: {
      VDistpicker
    }
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

  .page .table .sel-head {
    margin-left: 150px;
    align-items: flex-start;
    position: relative;
  }

  .page .table .sel-head .avatar-uploader {
    background: white;
  }

  .page .table .sel-head .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .page .table .sel-head .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .page .table .sel-head .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .page .table .sel-head .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
