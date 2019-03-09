<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column>
        <div-flex-row class="card head">
          <img src="../../assets/manager/student/ic_back.png" @click="clickToBack">
          <span>返回</span>
        </div-flex-row>
        <div-flex-column class="card main">
          <div-flex-row class="item">
            <span>问题：</span>
            <el-input class="input-question" type="textarea" resize="none" autosize placeholder="请输入问题内容"
                      v-model="question.question">
            </el-input>
          </div-flex-row>
          <div-flex-row class="item">
            <span>附带图片：</span>
            <el-upload
              class="avatar-uploader"
              :action=getFileUploadPath
              :show-file-list="false"
              :on-success="uploadQuestionPic">
              <img v-if="question.questionPic" :src="question.questionPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type="primary" style="margin-left: 10px" v-if="question.questionPic" @click="clickDelQuestionPic">删除图片</el-button>
          </div-flex-row>
          <div-flex-row class="item">
            <span>题目类型：</span>
            <radio-button-group v-model="question.type">
              <radio-button label="1">判断题</radio-button>
              <radio-button label="2">单选题</radio-button>
              <radio-button label="3">多选题</radio-button>
            </radio-button-group>
          </div-flex-row>
          <transition name="fade">
            <div-flex-column class="item" v-if="question.type==2||question.type==3">
              <span>选项：</span>
              <div-flex-column>
                <el-input :placeholder="'请输入'+item.selectIndex+'问题选项'" v-for="(item,index) in question.selects"
                          v-model="item.options">
                  <template slot="prepend">{{item.selectIndex}}</template>
                </el-input>
              </div-flex-column>
            </div-flex-column>
          </transition>
        </div-flex-column>
        <div-flex-column class="card answer">
          <span>解析</span>
          <div-flex-row class="item">
            <span style="width: 60px">答案：</span>
            <el-input :maxlength="question.type==3?4:1" placeholder="请输入问题答案" v-model="question.answer">
            </el-input>
          </div-flex-row>
          <div-flex-row class="item">
            <span>附带图片：</span>
          </div-flex-row>
          <div-flex-row class="item">
            <el-upload
              :action="getFileUploadPath"
              list-type="picture-card"
              :limit="5"
              :file-list="uploadedAnswerPics"
              :on-exceed="selAnswerPicMax"
              :on-remove="removeAnswerPic"
              :on-success="uploadAnswerPic">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div-flex-row>
          <div-flex-column class="item answer-texts">
            <el-input v-for="(item,index) in question.analyses" v-if="item.img" v-model="item.text" class="input"
                      type="textarea" resize="none" placeholder="请输入描述"></el-input>
          </div-flex-column>
          <div-flex-row class="item">
            <span>主要描述文字：</span>
            <el-input resize="none" type="textarea" autosize placeholder="请输入解析内容" v-model="questionAnswerImgDescript">
            </el-input>
          </div-flex-row>
          <div-flex-row class="item">
            <el-button type="primary" @click="clickSubmit">确 定</el-button>
            <el-button @click="$router.back(-1)">取 消</el-button>
          </div-flex-row>
        </div-flex-column>
      </div-flex-column>
    </div-flex-column>
  </transition>
</template>

<script>
  import Api from "../../Api";

  export default {
    data() {
      return {
        question: {
          question: "",
          questionPic: "",
          type: 1,
          selects: [{selectIndex: "A"}, {selectIndex: "B"}, {selectIndex: "C"}, {selectIndex: "D"}],
          analyses: [],
          answer:""
        },
        uploadedAnswerPics: []
      }
    },
    methods: {
      clickToBack: function () {
        this.$router.back(-1)
      },
      clickSubmit: function () {
        var query = this.$route.query;
        var params = {
          level: query.level,
          type: query.type,
          data: JSON.stringify(this.question)
        };
        console.log(this.question)
        this.submit(params);
      },
      clickDelQuestionPic: function () {
        this.question.questionPic = "";
      },
      uploadQuestionPic: function (res, file) {
        if (res.code == 200) {
          this.question.questionPic = res.data;
        } else {
          this.$message({
            message: '上传失败',
            type: 'warning'
          });
        }
      },
      selAnswerPicMax: function () {
        this.$message({
          message: '最多只能选择5张图片'
        });
      },
      uploadAnswerPic: function (res, file) {
        this.question.analyses.push({
          img: res.data,
          text: ""
        })
      },
      removeAnswerPic: function (file, fileList) {
        for (var index in this.question.analyses) {
          if (file.url.indexOf(this.question.analyses[index].img) >= 0) {
            this.question.analyses.splice(index, 1);
          }
        }
      },
      load: function (params) {
        this.$Api.getQuestion(this, params).then((res) => {
          if (res.code == 200) {
            this.question = res.data;
            for (var index in res.data.analyses) {
              if (res.data.analyses[index].img) {
                this.uploadedAnswerPics.push({
                  url: res.data.analyses[index].img
                })
              }
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      submit: function (params) {
        this.$Api.teaUpdateQuestion(this, params).then((res) => {
          if (res.code == 200) {
            this.$router.back(-1)
            this.$message({
              message: res.msg,
            });
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    computed: {
      getFileUploadPath() {
        return this.$Api.FILE_UPLOAD;
      },
      questionAnswerImgDescript: {
        get: function () {
          if (this.question.analyses) {
            for (var index in this.question.analyses) {
              if (!this.question.analyses[index].img) {
                return this.question.analyses[index].text;
              }
            }
          } else return "";
        },
        set: function (value) {
          var temp = false;
          for (var index in this.question.analyses) {
            if (!this.question.analyses[index].img) {
              this.question.analyses[index].text = value;
              temp = true;
              break;
            }
          }
          if (!temp) this.question.analyses.push({text: value});
        }
      },
    },
    watch: {
      question: {
        handler: function (val, oldval) {

        },
        deep: true,
      },
      'question.type': function (newValue, oldValue) {
        if (newValue == 2 || newValue == 3) {
          var selectIndexs = ["A", "B", "C", "D"];
          for (var index in selectIndexs) {
            var select = this.question.selects[index];
            if (!select) {
              select = {
                selectIndex: selectIndexs[index],
                options: ""
              };
              this.question.selects[index] = select;
            }
          }
        }
      }
    },
    mounted() {
      var query = this.$route.query;
      if (query.id) {
        var params = {
          id: query.id,
          level: query.level,
          type: query.type
        };
        this.load(params)
      }
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

  .page .card:last-child {
    margin-bottom: 100px;
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
    padding-bottom: 30px;
  }

  .page .main .item {
    margin-top: 15px;
  }

  .page .main .item:first-child {
    margin-top: 0;
  }

  .page .main .item > span {
    color: #666666;
    font-size: 16px;
    padding: 0 10px 0 0;
  }

  .page .main .item:first-child > span:first-child {
    color: #666666;
    font-size: 16px;
    padding-top: 5px;
  }

  .page .main .item .input-question {
    width: 600px;
  }

  .page .main .item:nth-child(2) {
    margin-top: 20px;
  }

  .page .main .item:nth-child(2) > span:first-child {
    padding-top: 10px;
  }

  .page .main .item .avatar-uploader {
    background: white;
    border-radius: 6px;
  }

  .page .main .item .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .page .main .item .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .page .main .item .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .page .main .item .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .page .main .item:nth-child(3) > span:first-child {
    padding-top: 10px;
  }

  .page .main .item:nth-child(3) > div > div {
    margin-right: 10px;
  }

  .page .main .item:nth-child(4) > div > div {
    margin-top: 10px;
    width: 650px;
  }

  >>> .el-input-group__prepend {
    font-size: 14px;
  }

  .page .answer {
    margin-top: 15px;
    padding-left: 50px;
    padding-bottom: 30px;
  }

  .page .answer > span {
    border-left: 5px solid #36b4ff;
    padding: 0 0 0 15px;
    color: #444444;
  }

  .page .answer .item > span {
    color: #666666;
    font-size: 16px;
    padding: 0 10px 0 0;
  }

  .page .answer .item:nth-child(2) {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .page .answer .item:nth-child(2) > span:first-child {
    padding-top: 2.5px;
    margin-right: 20px;
  }

  .page .answer .item .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 72px;
    height: 72px;
    line-height: 72px;
    text-align: center;
  }

  .page .answer .answer-texts > div {
    margin-top: 10px;
  }

  .page .answer .item:nth-last-child(2) {
    margin-top: 10px;
  }

  .page .answer .item:nth-last-child(2) span {
    margin-top: 5px;
    width: 180px;
  }

  .page .answer .item:last-child {
    margin-top: 20px;
  }
</style>
