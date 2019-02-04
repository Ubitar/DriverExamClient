<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="title">考试结束</div-flex-row>
        <div-flex-column class="card main">
          <div-flex-row class="score">
            <div>成绩：</div>
            <div>{{score}}分</div>
          </div-flex-row>
          <div class="result">{{score>=90?'恭喜通过':'很可惜，没有通过，请再接再厉'}}</div>
          <el-button class="to-home" type="primary" @click="clickToHome">返回主页</el-button>
        </div-flex-column>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        score: 0
      }
    },
    methods: {
      clickToHome: function () {
        this.$router.replace("/client/index/modes");
      }
    },
    mounted() {
      var query = this.$route.query;
      this.score = query.score;
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

  .container .title {
    margin: 10px 0 0 0;
    font-size: 22px;
    font-weight: bold;
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

  .page .main {
    margin-top: 20px;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;

  }

  .page .main .score {
    align-items: flex-end;
    font-size: 20px;
    color: #444444;
  }

  .page .main .score > div:last-child {
    font-size: 60px;
    color: #00ff2c;
    margin: 0 0 0 20px;
    font-weight: bold;
  }

  .page .main .result {
    font-size: 22px;
    margin: 30px 0 0 0;
    color: #666666;
  }

  .page .main .to-home {
    margin: 20px 0 0 0;
  }
</style>
