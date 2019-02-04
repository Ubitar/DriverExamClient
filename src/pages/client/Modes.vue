<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div class="tip">
            请选择下一步
          </div>
        </div-flex-row>
        <div-flex-row class="card">
          <div-flex-row class="modes">
            <div-flex-column class="mode" @click="clickToOrderExercise">
              <div-flex-column class="btn">
                <img src="../../assets/client/modes/ic_mode_exercise.png"/>
                <div>练习模式</div>
              </div-flex-column>
              <div-flex-column class="texts">
                进行计时、不计时的习题练习<br>
                统计练习中的易错题<br>
                自动判断错题<br>
              </div-flex-column>
            </div-flex-column>
            <div class="sep"></div>
            <div-flex-column class="mode" @click="clickToReadyExam">
              <div-flex-column class="btn">
                <img src="../../assets/client/modes/ic_mode_exam.png"/>
                <div>考试模式</div>
              </div-flex-column>
              <div-flex-column class="texts">
                进行模拟考试模式<br>
                考试过程会进行计时<br>
                自动判断错题，自动计算得分<br>
                <div class="need-verify">需要验证身份</div>
                <br>
              </div-flex-column>
            </div-flex-column>
          </div-flex-row>
        </div-flex-row>
        <div-flex-row class="card-sep">
          <img src="../../assets/client/modes/img_person_msg_sep.png"/>
          <div-flex-row>个人简讯</div-flex-row>
        </div-flex-row>
        <div-flex-row class="card person-msg">
          <div-flex-row style="cursor: pointer" @click="clickToPersonMsg">
            <img class="head-view" :src="userInfo.headview">
            <div-flex-column class="msgs">
              <div-flex-row class="line">
                <div class="label">姓名：</div>
                <div class="value-big">{{userInfo.name?userInfo.name:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">地区：</div>
                <div class="value-big">{{userInfo.city?userInfo.province+userInfo.city:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">手机号：</div>
                <div class="value-big">{{userInfo.mobile?userInfo.mobile:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">性别：</div>
                <div class="value-big">{{userInfo.gender==1?'男':userInfo.gender==2?'女':'未填写'}}</div>
              </div-flex-row>
            </div-flex-column>
            <div class="sep"></div>
            <div-flex-column class="exam-msg">
              <div-flex-row class="line">
                <div>A1、A3、B1</div>
                <el-tag type="danger" v-if="exams.a1_A3_B1_1_score<90&&exams.a1_A3_B1_4_score<90">未通过</el-tag>
                <el-tag v-if="exams.a1_A3_B1_1_score>=90">科目一</el-tag>
                <el-tag type="success" v-if="exams.a1_A3_B1_4_score>=90">科目四</el-tag>
              </div-flex-row>
              <div-flex-row class="line">
                <div>B2、A2</div>
                <el-tag type="danger" v-if="exams.b2_A2_1_score<90&&exams.b2_A2_4_score<90">未通过</el-tag>
                <el-tag v-if="exams.b2_A2_1_score>=90">科目一</el-tag>
                <el-tag type="success" v-if="exams.b2_A2_4_score>=90">科目四</el-tag>
              </div-flex-row>
              <div-flex-row class="line">
                <div>C1、C2、C3</div>
                <el-tag type="danger" v-if="exams.c1_C2_C3_1_score<90&&exams.c1_C2_C3_4_score<90">未通过</el-tag>
                <el-tag v-if="exams.c1_C2_C3_1_score>=90">科目一</el-tag>
                <el-tag type="success" v-if="exams.c1_C2_C3_4_score>=90">科目四</el-tag>
              </div-flex-row>
              <div-flex-row class="line">
                <div>E、F、D</div>
                <el-tag type="danger" v-if="exams.e_F_D_1_score<90&&exams.e_F_D_4_score<90">未通过</el-tag>
                <el-tag v-if="exams.e_F_D_1_score>=90">科目一</el-tag>
                <el-tag type="success" v-if="exams.e_F_D_4_score>=90">科目四</el-tag>
              </div-flex-row>
            </div-flex-column>
          </div-flex-row>
        </div-flex-row>
        <div-flex-column class="author-msg">
        </div-flex-column>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {},
        exams: {}
      }
    },
    methods: {
      clickToPersonMsg: function () {
        this.$router.push("/client/index/personmsg");
      },
      clickToOrderExercise: function () {
        if (this.userInfo.name)
          this.$router.push("/client/index/selexerciselevel");
        else {
          this.$message({
            message: "请先完善个人信息",
          });
          this.$router.push("/client/index/personmsg");
        }
      },
      clickToReadyExam: function () {
        if (this.userInfo.name)
          this.$router.push("/client/index/readyexam");
        else {
          this.$message({
            message: "请先完善个人信息",
          });
          this.$router.push("/client/index/personmsg");
        }
      }
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

  .page .modes {
    justify-content: space-between;
    width: 100%;
  }

  .page .modes .mode {
    flex-grow: 1;
    transition: .5s all;
    cursor: pointer;
    align-items: center;
  }

  .page .modes .mode:hover {
    transform: scale(1.03);
  }

  .page .modes .mode .btn {
    width: 140px;
    height: 140px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    background: #96e6ff;
    border: 1px solid #b1e2ff;
    border-radius: 10px;
    transition: .5s all;
    cursor: pointer;
    font-size: 18px;
    color: #71859b;
    margin: 30px 0 0 0;
    font-weight: bold;
  }

  .page .modes .mode .btn:hover {
    box-shadow: 2px 2px 5px #72cfff;
  }

  .page .modes .mode .btn img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }

  .page .modes .mode .texts {
    color: #71859b;
    margin: 20px 0 30px 0;
    font-size: 17px;
    line-height: 25px;
  }

  .page .modes .mode .texts .need-verify {
    color: #ff9094;
  }

  .page .modes .sep {
    width: 1px;
    background: #cbd0ff;
    height: 70%;
    margin: 40px 10px 0 10px;
  }

  .page .card-sep {
    margin: 50px 0 0 0;
    justify-content: center;
  }

  .page .card-sep img {
    width: 30px;
    height: 30px;
  }

  .page .card-sep > div {
    font-size: 17px;
    color: white;
    margin: 0 0 0 20px;
    align-items: center;
  }

  .page .person-msg {
    margin-top: 20px;
    padding: 50px 0 50px 0;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .page .person-msg .head-view {
    width: 100px;
    height: 130px;
    border-radius: 5px;
    background: #cccccc;
    box-shadow: 3px 3px 5px #97c0ff;
  }

  .page .person-msg .msgs {
    margin: 0 0 0 30px;
    height: 130px;
    justify-content: space-around;
    width: 200px;
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

  .page .person-msg .sep {
    width: 2px;
    height: 130px;
    background: #b8d2ff;
    margin: 0 20px 0 20px;
  }

  .page .person-msg .exam-msg {
    height: 130px;
  }

  .page .person-msg .exam-msg .line {
    color: #2b749b;
    align-items: center;
    justify-content: flex-start;
    height: 100px;
  }

  .page .person-msg .exam-msg .line > div:first-child {
    width: 150px;
  }

  .page .person-msg .exam-msg .line > span:nth-child(2) {
    margin-right: 15px;
  }

  .page .author-msg {
    height: 100px;
    width: 100%;
    background: rgba(11, 155, 255, 0.48);
    box-shadow: 0 -2px 5px #4985ff;
    margin: 70px 0 0 0;
  }

</style>
