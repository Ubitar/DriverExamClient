<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header">
          <div-flex-row class="tip">
            {{level=="4"?'科目四':'科目一'}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{index+1}}/{{questionIds.length}}题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            得分：{{score}}
            <el-button type="danger" size="mini" style="margin-left: 20px" @click="clickToFinishExam">
              {{parseInt(time/60)}}:{{parseInt(time%60)}} 提交
            </el-button>
          </div-flex-row>
        </div-flex-row>
        <div class="card main">
          <div-flex-column class="preview" @click="clickToPreCard">
            <img src="../../assets/client/orderexercise/ic_arrow_to_right.png" style="transform: rotate(180deg)">
          </div-flex-column>
          <div-flex-column class="preview next" @click="clickToNextCard">
            <img src="../../assets/client/orderexercise/ic_arrow_to_right.png">
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
                <el-button class="selectors-submit" type="primary" :disabled="submitTypes[index]!=0"
                           @click="clickToSubmit">确 定
                </el-button>
              </div-flex-column>
              <div class="title-img">
                <img v-if="questionData.questionPic" :src="questionData.questionPic" preview="0"
                     :preview-text="questionData.question"/>
              </div>
            </div-flex-row>
            <div-flex-row class="error" v-if="submitTypes[index]<0">
              <div>标准答案：{{questionData.answer}}</div>
              <div @click="clickToShowAnswer">查看为什么？</div>
              <div>错误</div>
            </div-flex-row>
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
        <div-flex-row class="card questions">
          <div-flex-row class="question"
                        :class="getQuestionSelectorClass(i)"
                        v-for="(item,i) in questionIds" @click="clickToQuestion(item,i)">{{i+1}}
          </div-flex-row>
        </div-flex-row>
      </div-flex-column>
      <el-dialog
        :visible.sync="showFinish"
        :append-to-body="true"
        width="30%">
        <span>{{finishWarning}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFinish">取 消</el-button>
         <el-button type="danger" @click="clickFinish">完 成</el-button>
       </span>
      </el-dialog>
    </div-flex-column>
  </transition>
</template>
<script>
  import RegexUtil from '@/utils/RegexUtil.js'
  import ArrayUtil from '@/utils/ArrayUtil.js'

  export default {
    data() {
      return {
        level: "1",
        index: 0,
        type: "A1_A3_B1",
        score: 0,
        time: 60 * 45 - 1,
        timeInterval: null,
        selAnswer: null,
        isShowAnswer: false,
        showFinish: false,
        submitTypes: [],//0为未提交 1为正确  -1为错误的
        questionData: {},
        questionIds: [],
      }
    },
    methods: {
      cancelFinish: function () {
        this.showFinish = false;
      },
      clickFinish: function () {
        this.showFinish = false;
        clearInterval(this.timeInterval);
        this.finish({
          type: this.type,
          level: this.level,
          score: this.score
        })
      },
      clickToFinishExam: function () {
        this.showFinish = true;
      },
      clickToPreCard: function () {
        if (this.index <= 0) {
          this.$message('已经是第一题了');
          return;
        }
        this.index--;
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.questionIds[this.index]
        })
      },
      clickToNextCard: function () {
        if (this.index >= this.questionIds.length - 1) {
          this.$message('已经是最后一题了');
          return;
        }
        this.index++;
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.questionIds[this.index]
        })
      },
      clickSkipTo: function () {
        if (!RegexUtil.isNumber(this.inputTo)) {
          this.$message.error('请输入数字');
          return;
        }
        this.$router.replace(this.$route.path + "?level=" + this.level + "&type=" + this.type + "&index=" + (parseInt(this.inputTo) - 1));
      },
      clickToSubmit: function () {
        if (this.selAnswer) {
          if (this.questionData.type == 3 && this.selAnswer.length < 2) {
            this.$message.error('请选择1个以上选项');
            return;
          }
          if (Array.isArray(this.selAnswer)) {
            if (this.selAnswer.length == this.questionData.answer.length) {
              for (var item of this.selAnswer)
                if (this.questionData.answer.indexOf(item) < 0) {
                  this.submitTypes[this.index] = -1;
                  return;
                }
              this.$message({
                message: '正确',
                type: 'success'
              });
              if (this.level == 1) this.score = this.score + 1;
              else this.score = this.score + 2;
            } else {
              this.submitTypes[this.index] = -1;
            }
          } else {
            if (this.selAnswer == this.questionData.answer) {
              this.$message({
                message: '正确',
                type: 'success'
              });
              this.submitTypes[this.index] = 1;
              if (this.level == 1) this.score = this.score + 1;
              else this.score = this.score + 2;
            } else {
              this.submitTypes[this.index] = -1;
            }
          }
          this.submitTypes.push(0);
          this.submitTypes.pop();
        } else {
          this.$message.error('请选择选项');
        }
      },
      clickToShowAnswer: function () {
        if (!this.isShowAnswer)
          this.isShowAnswer = true;
        this.scrollToBottom();
      },
      clickToQuestion: function (item, index) {
        if (index != this.index) {
          this.scrollToTop();
          this.index = index;
          this.loadTo({
            type: this.type,
            level: this.level,
            id: this.questionIds[this.index]
          })
        }
      },
      loadIds: function (params) {
        var that = this;
        this.$Api.getQuestionIds(this, params).then((res) => {
          if (res.code == 200) {
            this.submitTypes = [];
            var count = this.level == 1 ? 100 : 50;
            for (var i = 0; i < count; i++)
              this.submitTypes.push(0);
            this.questionIds = ArrayUtil.shuffle(res.data);
            this.questionIds = this.questionIds.slice(0, count);
            this.index = 0;
            this.timeInterval = setInterval(function () {
              that.time = that.time - 1;
              if (that.time <= 0) {
                clearInterval(that.timeInterval)
                this.clickFinish();
              }
            }, 1000)
            this.loadTo({
              type: this.type,
              level: this.level,
              id: this.questionIds[this.index]
            })
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
              if (this.questionData.type == 3) this.selAnswer = [];
              else this.selAnswer = null;
              this.isShowAnswer = false;
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },
      finish: function (params) {
        this.$Api.stuFinishExam(this, params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.replace("/client/index/examresult?type=" + this.type + "&level=" + this.level + "&score=" + this.score);
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
          this.level = query.level;
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
      getQuestionSelectorClass: function (index) {
        if (this.index == index) return 'question-select';
        else if (this.submitTypes[index] > 0) return 'question-true';
        else if (this.submitTypes[index] < 0) return 'question-error';
      }
    },
    computed:{
      finishWarning:function() {
        for(var item of this.submitTypes){
          if(item==0) {
            return "还有题目未完成，是否提交成绩？"
          }
        }
        return "是否提交成绩？"
      }
    },
    mounted() {
      this.parseRouteParms();
      if (this.questionIds.length <= 0) {
        //加载题目列表
        this.loadIds({
          type: this.type,
          level: this.level,
          exam: 1
        });
      } else {
        //加载现在题目
        this.loadTo({
          type: this.type,
          level: this.level,
          id: this.index
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

  .page .questions {
    padding: 20px;
    flex-wrap: wrap;
  }

  .page .questions .question {
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba(144, 144, 144, 0.07);
    border: 1px solid rgba(0, 0, 0, 0.02);
    transition: .3s all;
    margin: 2px;
  }

  .page .questions .question:hover {
    background: rgba(0, 0, 0, 0.13);
  }

  .page .questions .question-select {
    background: rgba(0, 0, 0, 0.23);
  }

  .page .questions .question-error {
    background: rgba(255, 77, 77, 0.72);
  }

  .page .questions .question-true {
    background: rgba(0, 255, 12, 0.64);
  }

</style>
