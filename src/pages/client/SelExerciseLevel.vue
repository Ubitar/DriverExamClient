<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div class="tip">
            请选择练习科目
          </div>
        </div-flex-row>
        <div-flex-row class="card">
          <div-flex-row class="modes">
            <div-flex-column class="mode" @click="clickShowTypeDialog(1)">
              <div-flex-column class="btn">
                <img src="../../assets/client/selexerciselevel/img_sel_level1.png"/>
                <div>科目一</div>
              </div-flex-column>
              <div-flex-column class="texts">
                考试时长45分钟<br>
                100道题，90分及以上过关<br>
                题型：判断题、单项选择题<br>
              </div-flex-column>
            </div-flex-column>
            <div class="sep"></div>
            <div-flex-column class="mode" @click="clickShowTypeDialog(4)">
              <div-flex-column class="btn">
                <img src="../../assets/client/selexerciselevel/img_sel_level4.png"/>
                <div>科目四</div>
              </div-flex-column>
              <div-flex-column class="texts">
                考试时长45分钟<br>
                50道题，90分及以上过关<br>
                题型：判断题、单项选择题、<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多项选择题<br>
              </div-flex-column>
            </div-flex-column>
          </div-flex-row>
        </div-flex-row>
      </div-flex-column>
      <el-dialog class="dialog" title="请选择考试类型" width="300px" :visible.sync="isShowTypeDialog" :append-to-body="true">
        <div-flex-column class="list">
          <el-button type="primary" @click="clickToType1">A1、A3、B1</el-button>
          <el-button type="success" @click="clickToType2">B2、A2</el-button>
          <el-button type="primary" @click="clickToType3">C1、C2、C3</el-button>
          <el-button type="warning" @click="clickToType4">E、F、D</el-button>
        </div-flex-column>
      </el-dialog>

    </div-flex-column>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        isShowTypeDialog: false,
        level:1
      }
    },
    methods: {
      clickShowTypeDialog: function (level) {
        this.isShowTypeDialog = true;
        this.level=level;
      },
      clickToType1:function () {
          this.$router.push("/client/index/orderexercise?level="+this.level+"&type="+"A1_A3_B1");
      },
      clickToType2:function () {
        this.$router.push("/client/index/orderexercise?level="+this.level+"&type="+"B2_A2");
      },
      clickToType3:function () {
        this.$router.push("/client/index/orderexercise?level="+this.level+"&type="+"C1_C2_C3");
      },
      clickToType4:function () {
        this.$router.push("/client/index/orderexercise?level="+this.level+"&type="+"E_F_D");
      },
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

  .page .modes .sep {
    width: 1px;
    background: #cbd0ff;
    height: 70%;
    margin: 40px 10px 0 10px;
  }

  .dialog .list{
    width: 220px;
  }

  .dialog .list button{
    margin: 10px 0 0 30px;
  }
  .dialog .list button:first-child{
  }

</style>
