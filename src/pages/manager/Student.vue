<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column>
        <div-flex-row class="card head">
          <img src="../../assets/manager/student/ic_back.png" @click="clickToBack">
          <span>查看编辑学员</span>
        </div-flex-row>
        <div-flex-column class="card main text">
          <div-flex-row class="item">
            <span>姓名：</span>
            <span>{{student.name?student.name:'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>性别：</span>
            <span>{{student.gender==1?'男':student.gender==2?'女':'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>生日：</span>
            <span>{{student.birthdayStr?student.birthdayStr:'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>地区：</span>
            <span>{{student.city?student.province+student.city:'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>手机号：</span>
            <span>{{student.mobile?student.mobile:'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>身份证号：</span>
            <span>{{student.idCard?student.idCard:'未填写'}}</span>
          </div-flex-row>
          <div-flex-row class="item">
            <span>注册创建日期：</span>
            <span>{{student.buildTimeStr?student.buildTimeStr:''}}</span>
          </div-flex-row>
          <div class="head-view">
            <img :src="student.headview" preview="0">
          </div>
        </div-flex-column>
        <div-flex-column class="card exam-msg">
          <div-flex-row class="exam">
            <div>A1、A3、B1：</div>
              <el-tag>科目一</el-tag>
              <div>{{exams.a1_A3_B1_1_score}}分</div>
              <el-tag type="success">科目四</el-tag>
              <div>{{exams.a1_A3_B1_4_score}}分</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>B2、A2：</div>
              <el-tag>科目一</el-tag>
              <div>{{exams.b2_A2_1_score}}分</div>
              <el-tag type="success">科目四</el-tag>
              <div>{{exams.b2_A2_4_score}}分</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>C1、C2、C3：</div>
              <el-tag>科目一</el-tag>
              <div>{{exams.c1_C2_C3_1_score}}分</div>
              <el-tag type="success">科目四</el-tag>
              <div>{{exams.c1_C2_C3_4_score}}分</div>
          </div-flex-row>
          <div-flex-row class="exam">
            <div>E、F、D：</div>
              <el-tag>科目一</el-tag>
              <div>{{exams.e_F_D_1_score}}分</div>
              <el-tag type="success">科目四</el-tag>
              <div>{{exams.e_F_D_4_score}}分</div>
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
        exams: {},
        student: {}
      }
    },
    methods: {
      clickToBack: function () {
        this.$router.back(-1)
      }
    },
    mounted() {
      var params = {id: this.$route.query.id};
      this.$Api.teaGetStudentMsg(this, params).then((res) => {
        if (res.code == 200) {
          var student = res.data.student;
          student.buildTimeStr = TimeUtil.format(student.buildTime, "yyyy年MM月dd日");
          if (student.birthday) {
            student.birthdayStr = TimeUtil.format(student.birthday, "yyyy年MM月dd日");
          }
          this.student = res.data.student;
          console.log(res.data.exams);
          this.exams=res.data.exams;
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  }
</script>

<style scoped>
  .page {
    margin-top: 50px;
  }

  .page .card {
    padding: 20px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgba(255, 255, 255, 0.27);
  }

  .page .head {
    padding: 10px 20px 10px 20px;
    color: #555555;
    font-size: 14px;
    align-items: center;
  }

  .page .head img {
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: .3s all;
  }

  .page .head img:hover {
    opacity: 0.6;
  }

  .page .head span {
    margin-left: 20px;
  }

  .page .main {
    margin-top: 15px;
    padding-left: 50px;
    position: relative;
  }

  .page .main .item {
    margin-top: 15px;
  }

  .page .main .item:first-child {
    margin-top: 0;
  }

  .page .main .item span:first-child {
    color: #666666;
    font-size: 16px;
    padding-right: 20px;
  }

  .page .main .head-view {
    position: absolute;
    width: 100px;
    height: 130px;
    min-width: 100px;
    height: 130px;
    cursor: pointer;
    left: 400px;
  }

  .page .main .head-view img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }

  .page .exam-msg {
    position: relative;
    margin-top: 20px;
    padding: 30px;
  }

  .page .exam-msg .cover {
    margin-left: -10px;
  }

  .page .exam-msg .exam {
    align-items: center;
    border-radius: 10px;
    transition: .3s all;
    padding: 15px 25px 15px 25px;
    cursor: pointer;
    color: #666666;
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


</style>
