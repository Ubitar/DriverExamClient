<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="card person-msg">
          <div-flex-row class="cover card-cover" v-if="userInfo.gender==0" @click="clickToInputPersonMsg">
            需要完善您的个人信息，点击进行完善
          </div-flex-row>
          <div-flex-row>
            <img class="head-view" :src="userInfo.headview">
            <div-flex-column class="msgs">
              <div-flex-row class="line">
                <div class="label">姓名：</div>
                <div class="value-big">{{userInfo.name?userInfo.name:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">性别：</div>
                <div class="value-big">{{userInfo.gender==1?'男':userInfo.gender==2?'女':'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">地区：</div>
                <div class="value-big">{{userInfo.city?userInfo.province+userInfo.city:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">出生年日：</div>
                <div class="value-big">{{userInfo.birthday?getBirthday:'未填写'}}</div>
              </div-flex-row>
              <div-flex-row class="line">
                <div class="label">身份证号：</div>
                <div class="value-big">{{userInfo.idCard?userInfo.idCard:'未填写'}}</div>
              </div-flex-row>
            </div-flex-column>
            <div-flex-column class="msgs2">
              <div-flex-column @click="clickToInputPersonMsg">
                <img src="../../assets/client/personmsg/ic_change_msg.png"/>
                <div>修改信息</div>
              </div-flex-column>
              <div-flex-column @click="clickToChangePwd">
                <img src="../../assets/client/personmsg/ic_change_password.png"/>
                <div>修改密码</div>
              </div-flex-column>
            </div-flex-column>
          </div-flex-row>
        </div-flex-row>
        <div-flex-row class="card-sep">
          <img src="../../assets/client/personmsg/ic_exam_sep.png"/>
          <div-flex-row>考试统计</div-flex-row>
        </div-flex-row>
        <div-flex-column class="card exam-msg">
          <div-flex-row class="cover card-cover" v-if="userInfo.gender==0" @click="clickToInputPersonMsg">
            需要完善您的个人信息，点击进行完善
          </div-flex-row>
          <div-flex-row class="exam">
            <div>A1、A3、B1：</div>
            <el-tag>科目一</el-tag>
            <div>{{exams.a1_A3_B1_1_score}}分&nbsp;&nbsp;</div>
            <el-tag type="success">科目四</el-tag>
            <div>{{exams.a1_A3_B1_4_score}}分&nbsp;&nbsp;</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>B2、A2：</div>
            <el-tag>科目一</el-tag>
            <div>{{exams.b2_A2_1_score}}分&nbsp;&nbsp;</div>
            <el-tag type="success">科目四</el-tag>
            <div>{{exams.b2_A2_4_score}}分&nbsp;&nbsp;</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>C1、C2、C3：</div>
            <el-tag>科目一</el-tag>
            <div>{{exams.c1_C2_C3_1_score}}分&nbsp;&nbsp;</div>
            <el-tag type="success">科目四</el-tag>
            <div>{{exams.c1_C2_C3_4_score}}分&nbsp;&nbsp;</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>E、F、D：</div>
            <el-tag>科目一</el-tag>
            <div>{{exams.e_F_D_1_score}}分&nbsp;&nbsp;</div>
            <el-tag type="success">科目四</el-tag>
            <div>{{exams.e_F_D_4_score}}分&nbsp;&nbsp;</div>
          </div-flex-row>
        </div-flex-column>
        <div-flex-row class="card-sep">
          <img src="../../assets/client/personmsg/ic_exercise_sep.png" style="background:white;border-radius: 1000px"/>
          <div-flex-row>练习统计</div-flex-row>
        </div-flex-row>
        <div-flex-column class="card exercise-msg">
          <div-flex-row class="cover card-cover" v-if="userInfo.gender==0" @click="clickToInputPersonMsg">
            需要完善您的个人信息，点击进行完善
          </div-flex-row>
          <div-flex-row class="exercises">
            <div-flex-column class="exercise order">
              <div>模拟考试：A1、A3、B1 科目一</div>
              <div class="counts">
                <span>100 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.a1_A3_B1_1_score}}分</span>
              </div>
            </div-flex-column>
            <div-flex-column class="exercise order random">
              <div>模拟考试：A1、A3、B1 科目四</div>
              <div class="counts">
                <span>50 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.a1_A3_B1_4_score}}分</span>
              </div>
            </div-flex-column>
          </div-flex-row>
          <div-flex-row class="exercises">
            <div-flex-column class="exercise order">
              <div>模拟考试：B2、A2 科目一</div>
              <div class="counts">
                <span>100 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.b2_A2_1_score}}分</span>
              </div>
            </div-flex-column>
            <div-flex-column class="exercise order random">
              <div>模拟考试：B2、A2 科目四</div>
              <div class="counts">
                <span>50 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.b2_A2_4_score}}分</span>
              </div>
            </div-flex-column>
          </div-flex-row>
          <div-flex-row class="exercises">
            <div-flex-column class="exercise order">
              <div>模拟考试：C1、C2、C3 科目一</div>
              <div class="counts">
                <span>100 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{exams.c1_C2_C3_1_score}}分</span>
              </div>
            </div-flex-column>
            <div-flex-column class="exercise order random">
              <div>模拟考试：C1、C2、C3 科目四</div>
              <div class="counts">
                <span>50 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.c1_C2_C3_4_score}}分</span>
              </div>
            </div-flex-column>
          </div-flex-row>
          <div-flex-row class="exercises">
            <div-flex-column class="exercise order">
              <div>模拟考试：E、F、D 科目一</div>
              <div class="counts">
                <span>100 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.e_F_D_1_score}}分</span>
              </div>
            </div-flex-column>
            <div-flex-column class="exercise order random">
              <div>模拟考试：E、F、D 科目四</div>
              <div class="counts">
                <span>50 题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{simulateExam.e_F_D_4_score}}分</span>
              </div>
            </div-flex-column>
          </div-flex-row>
          <div-flex-row class="exercises">
            <div-flex-row class="exercise error-book" @click="clickToErrorBook">
              <div-flex-column>
                <div>错题本</div>
                <!--<div>xx题</div>-->
              </div-flex-column>
              <img src="../../assets/client/personmsg/ic_error_book.png">
            </div-flex-row>
          </div-flex-row>
        </div-flex-column>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>
  import TimeUtil from '@/utils/TimeUtil.js'

  export default {
    data() {
      return {
        userInfo: {},
        exams: [],
        simulateExam: [],
      }
    },
    methods: {
      clickToInputPersonMsg: function () {
        this.$router.push("/client/index/inputpersonmsg");
      },
      clickToChangePwd: function () {
        this.$router.push("/client/index/changepwd");
      },
      clickToErrorBook: function () {
        this.$router.push("/client/index/errorbook");
      }
    },
    computed: {
      getBirthday: function () {
        return TimeUtil.format(new Date(this.userInfo.birthday), 'yyyy年MM月dd日')
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
            type: 'warning'
          });
        }
      });
      this.$Api.getSimulateExam(this, {}).then((res) => {
        if (res.code == 200) {
          this.simulateExam = res.data;
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

  .page .card {
    width: 800px;
    box-shadow: 1px 1px 3px #b6f7ff;
    background-color: rgba(255, 255, 255, 0.84);
    margin: 30px 0 0 0;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }

  .page .card-cover {
    background: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    align-items: center;
    justify-content: center;
    color: #599aff;
    cursor: pointer;
    font-size: 17px;
  }

  .page .person-msg {
    margin-top: 10px;
    padding: 40px 40px 40px 40px;
    align-items: center;
    cursor: default;
  }

  .page .person-msg .head-view {
    width: 120px;
    height: 156px;
    border-radius: 5px;
    background-color: #cccccc;
    box-shadow: 3px 3px 5px #97c0ff;
  }

  .page .person-msg .msgs {
    margin: 0 0 0 30px;
    justify-content: space-around;
    width: 400px;
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

  .page .person-msg .msgs2 {
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 30px;
  }

  .page .person-msg .msgs2 img {
    width: 30px;
    height: 30px;
  }

  .page .person-msg .msgs2 > div {
    font-size: 12px;
    letter-spacing: 0;
    color: #708aae;
    align-items: center;
    cursor: pointer;
    transition: .3s all;
  }

  .page .person-msg .msgs2 > div:hover {
    transform: scale(1.1);
  }

  .page .person-msg .msgs2 > div > div:last-child {
    margin: 3px 0 0 0;
  }

  .page .person-msg .cover {
    margin-left: -40px;
  }

  .page .card-sep {
    margin: 40px 0 0 0;
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

  .page .exam-msg {
    position: relative;
    margin-top: 20px;
    padding: 0;
  }

  .page .exam-msg .exam {
    align-items: center;
    border-radius: 10px;
    transition: .3s all;
    padding: 15px 25px 15px 25px;
    margin-left: 50px;
    cursor: pointer;
    color: #666666;
  }

  .page .exam-msg .exam:first-child {
    margin-top: 15px;
  }

  .page .exam-msg .exam:last-child {
    margin-bottom: 15px;
  }

  .page .exam-msg .exam:hover {
    background: rgba(212, 225, 238, 0.43);
  }

  .page .exam-msg .exam > div {
    margin-right: 20px;
  }

  .page .exam-msg .exam > span {
    margin-right: 15px;
    width: 80px;
    text-align: center;
  }

  .page .exam-msg .exam > div:first-child {
    width: 120px;
  }

  .page .exam-msg .exam > div:nth-child(2) {
    width: 150px;
  }

  .page .exercise-msg {
    margin-top: 20px;
    padding: 0px;
    margin-bottom: 100px;
  }

  .page .exercise-msg .exercises {
    margin: 0 20px 0 20px;
  }

  .page .exercise-msg .exercises:last-child {
    margin-bottom: 20px;
  }

  .page .exercise-msg .exercises .exercise {
    width: 49%;
    height: 100px;
    margin-left: 20px;
    border-radius: 10px;
    transition: .3s all;
    cursor: pointer;
    background-color: rgba(249, 249, 249, 0.40);
  }

  .page .exercise-msg .exercises .exercise:hover {
    background: rgba(212, 225, 238, 0.43);
    transform: scale(1.05);
    box-shadow: 2px 2px 12px rgba(0, 123, 91, 0.18);
  }

  .page .exercise-msg .exercises .exercise:first-child {
    margin-left: 0;
  }

  .page .exercise-msg .exercises .order {
    padding: 10px 20px 10px 20px;
    justify-content: space-around;
    box-sizing: border-box;
  }

  .page .exercise-msg .exercises .order {
    padding: 10px 20px 10px 20px;
    justify-content: space-around;
    box-sizing: border-box;
  }

  .page .exercise-msg .exercises .order > div:first-child {
    font-weight: bold;
    color: #8bb3ff;
  }

  .page .exercise-msg .exercise .order .counts {
    justify-content: space-between;
    align-items: flex-end;
  }

  .page .exercise-msg .exercises .order .counts > span:first-child {
    color: #9fc7da;
    font-size: 14px;
  }

  .page .exercise-msg .exercises .order .counts > span:last-child {
    font-size: 25px;
    color: coral;
  }

  .page .exercise-msg .exercises .random .counts > img:nth-child(2) {
    width: 20px;
    height: 12px;
  }

  .page .exercise-msg .exercises {
    margin-top: 20px;
  }

  .page .exercise-msg .exercises:last-child .error-book {
    padding: 15px;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
  }

  .page .exercise-msg .exercises:last-child .error-book > div:first-child {
    justify-content: space-around;
    height: 70px;
  }

  .page .exercise-msg .exercises:last-child .error-book > div:first-child > div:first-child {
    font-weight: bold;
    color: #8bb3ff;
  }

  .page .exercise-msg .exercises:last-child .error-book > div:first-child > div:last-child {
    color: #9fc7da;
    font-size: 16px;
  }

  .page .exercise-msg .exercises:last-child .error-book > img:last-child {
    width: 60px;
    height: 60px;
    margin: 0 0 0 20px;
  }
</style>
