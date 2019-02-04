<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="exercise-selectors">
          <div-flex-row class="button" @click="clickToOrderExercise">
            <div>顺序练习</div>
            <img src="@/assets/client/orderexercise/ic_to_order_exercise.png"/>
          </div-flex-row>
          <div-flex-row class="button selected">
            <div>随机练习</div>
            <img src="@/assets/client/orderexercise/ic_to_random_exercise.png"/>
          </div-flex-row>
          <div-flex-row class="button" @click="clickToExamExercise">
            <div>模拟考试</div>
            <img src="@/assets/client/orderexercise/ic_to_exam_exercise.png"/>
          </div-flex-row>
        </div-flex-row>
        <div-flex-row class="header">
          <div-flex-row class="tip">
            {{level=="4"?'科目四':'科目一'}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{index+1}}/{{questionIds.length}}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-checkbox v-model="isAutoNext">答对自动下一题
            </el-checkbox>
          </div-flex-row>
        </div-flex-row>
        <div class="card main">
          <div-flex-column class="preview" @click="clickToPreCard">
            <img src="@/assets/client/orderexercise/ic_arrow_to_right.png" style="transform: rotate(180deg)">
          </div-flex-column>
          <div-flex-column class="preview next" @click="clickToNextCard">
            <img src="@/assets/client/orderexercise/ic_arrow_to_right.png">
          </div-flex-column>
          <div class="center">
            <div class="title">{{questionData.question}}</div>
            <div-flex-row>
              <div-flex-column>
                <radio-button-group class="selectors" v-model="selAnswer" vertical="true" v-if="questionData.type==1">
                  <radio-button label="对">对</radio-button>
                  <radio-button label="错">错</radio-button>
                </radio-button-group>
                <radio-button-group class="selectors" v-model="selAnswer" vertical="true"
                                    v-else-if="questionData.type==2">
                  <radio-button :label="item.selectIndex" v-for="(item ,index) in questionData.selects">
                    {{item.selectIndex}}、{{item.options}}
                  </radio-button>
                </radio-button-group>
                <check-box-group class="selectors" v-model="selAnswer" vertical="true" v-else>
                  <check-box :label="item.selectIndex" v-for="(item ,index) in questionData.selects">
                    {{item.selectIndex}}、{{item.options}}
                  </check-box>
                </check-box-group>
                <el-button class="selectors-submit" type="primary" :disabled="isSubmited" @click="clickToSubmit">确 定
                </el-button>
              </div-flex-column>
              <div class="title-img">
                <img v-if="questionData.questionPic" :src="questionData.questionPic" preview="0"
                     :preview-text="questionData.question"/>
              </div>
            </div-flex-row>
            <div-flex-row class="error" v-if="isError">
              <div>标准答案：{{questionData.answer}}</div>
              <div @click="clickToShowAnswer">查看为什么？</div>
              <div>错误</div>
            </div-flex-row>
            <div-flex-row class="add-to-book add-to-book-selected" v-if="isInTheBook">已加入错题本</div-flex-row>
            <div-flex-row class="add-to-book" @click="clickAddInBook" v-else-if="isError">加入错题本</div-flex-row>
          </div>
        </div>
        <div class="card answer" v-if="isShowAnswer">
          <div-flex-row class="pic-texts">
            <div class="pic-text" v-if="item.img" v-for="(item,index) in questionData.analyses">
              <div>
                <img :src="item.img" preview="1"/>
              </div>
              <div>{{item.text}}</div>
            </div>
          </div-flex-row>
          <div class="text-explain" v-if="!item.img" v-for="(item,index) in questionData.analyses">{{item.text}}</div>
        </div>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>
  import RegexUtil from '@/utils/RegexUtil.js'

  export default {
    data() {
      return {
        level: 1,
        index: 0,
        type: "A1_A3_B1",
        inputTo: 1,
        selAnswer: null,
        isAutoNext: false,
        isError: false,
        isSubmited: false,
        isShowAnswer: false,
        isInTheBook: false,
        questionData: {},
        questionIds: [],
        lastQuestionIndex: [],
        lastQusetionId: -1,
      }
    },
    methods: {
      clickToOrderExercise: function () {
        this.$router.replace("/client/index/orderexercise?level=" + this.level + "&type=" + this.type);
      },
      clickToExamExercise: function () {
        this.$router.replace("/client/index/examexercise?level=" + this.level + "&type=" + this.type);
      },
      clickToPreCard: function () {
        if (this.lastQuestionIndex.length <= 0) {
          this.$message('已经是第一题了');
          return;
        }
        this.index=this.lastQuestionIndex.pop();
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.questionIds[this.index]
        })
      },
      clickToNextCard: function () {
        if (this.lastQuestionIndex.length >= this.questionIds.length) {
          this.lastQuestionIndex = [];
          this.$message('已完成一次所有题目');
        }
        this.lastQuestionIndex.push(this.index);
        this.index = Math.round(Math.random() * this.questionIds.length);
        for (var index in this.lastQuestionIndex) {
          if (index == this.index)
            this.index = Math.round(Math.random() * this.questionIds.length);
          else break;
        }
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.questionIds[this.index]
        })
      },
      clickToSubmit: function () {
        if (this.selAnswer) {
          this.isSubmited = true;
          if (this.questionData.type == 3 && this.selAnswer.length < 2) {
            this.$message.error('请选择1个以上选项');
            this.isSubmited = false;
            return;
          }
          if (Array.isArray(this.selAnswer)) {
            if (this.selAnswer.length == this.questionData.answer.length) {
              for (var item of this.selAnswer)
                if (this.questionData.answer.indexOf(item) < 0) {
                  this.isError = true;
                  break;
                }
              this.$message({
                message: '正确',
                type: 'success'
              });
            } else {
              this.isError = true;
            }
          } else {
            if (this.selAnswer == this.questionData.answer) {
              this.$message({
                message: '正确',
                type: 'success'
              });
            } else {
              this.isError = true;
            }
          }
          if (!this.isError && this.isAutoNext) {
            this.clickToNextCard();
          }
        } else {
          this.$message.error('请选择选项');
        }
      },
      clickToShowAnswer: function () {
        if (!this.isShowAnswer)
          this.isShowAnswer = true;
        this.scrollToBottom();
      },
      clickAddInBook: function () {
        this.$Api.stuUpdateErrorBook(this, {
          type: this.type,
          level: this.level,
          id: this.questionData.id
        }).then((res) => {
          if (res.code == 200) {
            this.isInTheBook = true;
            this.$message('已加入错题本');
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      loadIds: function (params) {
        this.$Api.getQuestionIds(this, params).then((res) => {
          if (res.code == 200) {
            this.questionIds = res.data;
            this.clickToNextCard();
            this.lastQuestionIndex = [];
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      loadTo: function (params) {
        this.$Api.getQuestion(this, params).then((res) => {
          if (res.code == 200) {
            if (res.data == null) {
              this.$message({
                message: "没有id为" + params.id + "题目",
              });
            } else {
              this.questionData = res.data;
              if(this.questionData.type==3) this.selAnswer=[];
              else this.selAnswer=null;
              this.isError = this.isShowAnswer = this.isSubmited = this.isInTheBook = false;
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      parseRouteParms: function () {
        var query = this.$route.query;
        if (query.level == "1" || query.level == "4")
          this.level = parseInt(query.level);
        this.type = query.type;
      },
      scrollToTop: function () {
        setTimeout(function () {
          window.scrollTo(0, 0)
        }, 10)
      },
      scrollToBottom: function () {
        setTimeout(function () {
          window.scrollTo(0, this.$el.scrollHeight)
        }, 10)
      },
    },
    watch: {
      index: function (newValue, oldValue) {
        this.inputTo = newValue + 1;
      }
    },
    mounted() {
      this.parseRouteParms();
      if (this.questionIds.length <= 0) {
        //加载题目列表
        this.loadIds({
          type: this.type,
          level: this.level,
          exam: 0
        });
      } else {
        //加载现在题目
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.lastQusetionId
        })
      }
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

  .page .exercise-selectors {
    width: 600px;
    justify-content: space-around;
  }

  .page .exercise-selectors .button {
    width: 170px;
    height: 50px;
    background-color: rgba(241, 248, 255, 0.84);
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 2px 2px 4px #aad5ff;
    transition: .3s all;
  }

  .page .exercise-selectors .button:hover {
    transform: scale(1.05);
    background-color: rgba(215, 230, 255, 0.84);
  }

  .page .exercise-selectors .selected {
    background-color: rgb(83, 175, 255);
    color: #f1f8ff;
  }

  .page .exercise-selectors .button div {
    font-size: 15px;
    color: #6dc0ff;
  }

  .page .exercise-selectors .button img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
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

  .page .header .tip .input-to {
    width: 60px;
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
    min-height: 500px;
    position: relative;
    padding: 0;
    overflow: hidden;
  }

  .page .main .preview {
    width: 50px;
    height: 100%;
    transition: .3s all;
    position: absolute;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
    cursor: pointer;
  }

  .page .main .preview:hover {
    background-color: rgba(255, 255, 255, 0.5);
    opacity: 1;
  }

  .page .main .preview img {
    width: 40px;
    height: 40px;
  }

  .page .main .next {
    right: 0;
  }

  .page .main .center {
    padding: 20px;
    margin: 0 50px 0 50px;
    height: 100%;
  }

  .page .main .center .title {
    font-size: 18px;
    font-weight: bold;
    color: #666666;
    margin: 10px 0 0 30px;
  }

  .page .main .center > div:nth-child(2) {
    justify-content: space-between;
  }

  .page .main .center .error {
    background: #ff4d4d;
    padding: 15px;
    border-radius: 5px;
    align-items: flex-end;
    margin-top: 30px;
  }

  .page .main .center .error > div:first-child {
    font-size: 17px;
    color: white;
  }

  .page .main .center .error > div:nth-child(2) {
    font-size: 14px;
    color: #cccccc;
    cursor: pointer;
    margin-left: 20px;
    padding: 0 0 0 10px;
  }

  .page .main .center .error > div:nth-child(2):hover {
    border-bottom: 1px solid #cccccc;
  }

  .page .main .center .error > div:nth-child(3) {
    font-size: 17px;
    color: white;
    flex-grow: 1;
    text-align: right;
  }

  .page .main .center .title-img {
    width: 270px;
    height: 270px;
    min-width: 270px;
    min-height: 270px;
    margin: 40px 0 0 30px;
    text-align: center;
    cursor: pointer;
  }

  .page .main .center .title-img img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }

  .page .main .center .selectors {
    margin: 40px 0 0 20px;
  }

  .page .main .center .selectors > div {
    margin-top: 15px;
    min-width: 200px;
  }

  .page .main .center .selectors-submit {
    width: 180px;
    margin: 30px 0 0 20px;
  }

  .page .main .center .add-to-book {
    color: #777777;
    margin-top: 10px;
    justify-content: center;
    cursor: pointer;
  }

  .page .main .center .add-to-book-selected {
    cursor: initial;
    color: #005dff;
  }

  .page .answer {
    padding: 40px 80px 40px 80px;
  }

  .page .answer .pic-texts {
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
  }

  .page .answer .pic-texts .pic-text > div:first-child {
    width: 100px;
    height: 100px;
  }

  .page .answer .pic-texts .pic-text img {
    width: 100px;
    height: 100px;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
    border-radius: 5px;
  }

  .page .answer .pic-texts .pic-text > div:last-child {
    color: #555555;
    margin: 5px 0 0 0;
    text-align: center;
  }

  .page .answer .text-explain {
    color: #444444;
    font-size: 17px;
  }

</style>
