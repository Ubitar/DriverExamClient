<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div-flex-row class="tip">
            信息确认
          </div-flex-row>
        </div-flex-row>
        <div class="card person-msg">
          <div-flex-row style="cursor: pointer">
            <img class="head-view" :src="userInfo.headview">
            <div-flex-column class="msgs">
              <div-flex-row class="line">
                <div class="label">姓名：</div>
                <div class="value-big">{{userInfo.name}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">性别：</div>
                <div class="value-big">{{userInfo.gender==1?'男':'女'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">地区：</div>
                <div class="value-big">{{userInfo.province}}{{userInfo.city}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">身份证：</div>
                <div class="value-big">{{userInfo.idCard}}</div>
              </div-flex-row>
            </div-flex-column>
          </div-flex-row>
        </div>
        <div-flex-row class="buttons">
          <el-button @click="clickCancel">取消</el-button>
          <el-button type="success" @click="clickBegin">开始考试</el-button>
        </div-flex-row>
      </div-flex-column>
      <el-dialog class="dialog" title="请选择考试类型" width="300px" :visible.sync="isShowTypeDialog" :append-to-body="true">
        <div-flex-column class="list">
          <el-button type="primary" :disabled="exams.a1_A3_B1_1_score>=90" @click="clickToType1">A1、A3、B1 科目一
          </el-button>
          <el-button type="primary" :disabled="exams.a1_A3_B1_1_score<90||exams.a1_A3_B1_4_score>=90" @click="clickToType2">A1、A3、B1 科目四
          </el-button>
          <el-button type="primary" :disabled="exams.b2_A2_1_score>=90" @click="clickToType3">B2、A2 科目一</el-button>
          <el-button type="primary" :disabled="exams.b2_A2_1_score<90||exams.b2_A2_4_score>=90" @click="clickToType4">B2、A2 科目四</el-button>
          <el-button type="primary" :disabled="exams.c1_C2_C3_1_score>=90" @click="clickToType5">C1、C2、C3 科目一
          </el-button>
          <el-button type="primary" :disabled="exams.c1_C2_C3_1_score<90||exams.c1_C2_C3_4_score>=90" @click="clickToType6">C1、C2、C3 科目四
          </el-button>
          <el-button type="primary" :disabled="exams.e_F_D_1_score>=90" @click="clickToType7">E、F、D 科目一</el-button>
          <el-button type="primary" :disabled="exams.e_F_D_1_score<90||exams.e_F_D_4_score>=90" @click="clickToType8">E、F、D 科目四</el-button>
        </div-flex-column>
      </el-dialog>
    </div-flex-column>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {},
        isShowTypeDialog: false,
        exams: {}
      }
    },
    methods: {
      clickCancel: function () {
        this.$router.back(-1);
      },
      clickBegin: function () {
        this.isShowTypeDialog = true;
      },
      clickToType1: function () {
        this.$router.replace("/client/index/exam?type=A1_A3_B1&level=1");
      },
      clickToType2: function () {
        this.$router.replace("/client/index/exam?type=A1_A3_B1&level=4");
      },
      clickToType3: function () {
        this.$router.replace("/client/index/exam?type=B2_A2&level=1");
      },
      clickToType4: function () {
        this.$router.replace("/client/index/exam?type=B2_A2&level=4");
      },
      clickToType5: function () {
        this.$router.replace("/client/index/exam?type=C1_C2_C3&level=1");
      },
      clickToType6: function () {
        this.$router.replace("/client/index/exam?type=C1_C2_C3&level=4");
      },
      clickToType7: function () {
        this.$router.replace("/client/index/exam?type=E_F_D&level=1");
      },
      clickToType8: function () {
        this.$router.replace("/client/index/exam?type=E_F_D&level=4");
      },
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.$Api.getExamMsg(this, {}).then((res) => {
        if (res.code == 200) {
          this.exams = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      })
    },
  }
</script>

<style scoped>
  .list .el-button + .el-button {
    margin-left: 0;
    margin-top: 5px;
  }

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
    margin: 20px 0 0 0;
  }

  .page .header .tip {
    position: absolute;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
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

  .page .card:last-child {
    margin-bottom: 50px;
  }

  .page .person-msg {
    margin-top: 20px;
    padding: 50px 20px 50px 20px;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .page .person-msg .head-view {
    width: 100px;
    height: 130px;
    border-radius: 5px;
    margin: 0 0 0 70px;
    box-shadow: 3px 3px 5px #97c0ff;
  }

  .page .person-msg .msgs {
    margin: 0 0 0 50px;
    height: 130px;
    justify-content: space-around;
  }

  .page .person-msg .msgs .line {
    height: 26px;
    align-items: center;
  }

  .page .person-msg .msgs .line .label {
    color: #2b749b;
    font-size: 17px;
  }

  .page .person-msg .msgs .line .value {
    color: #71859b;
    font-size: 16px;
  }

  .page .person-msg .msgs .line .value-big {
    color: #71859b;
    font-size: 16px;
    font-weight: bold;
  }

  .page .person-msg .exam-msg .line {
    color: #2b749b;
    align-items: center;
  }

  .page .person-msg .exam-msg .line > div:nth-child(2) {
    margin: 0 0 0 10px;
  }

  .page .person-msg .exam-msg .line img {
    width: 15px;
    height: 15px;
    margin: 0 0 0 10px;
  }

  .page .buttons {
    margin: 30px 0 0 0;
    width: 800px;
    justify-content: center;
  }
</style>
