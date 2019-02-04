<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column class="container">
        <div-flex-row class="header card">
          <div-flex-row class="tip">错题本</div-flex-row>
        </div-flex-row>
        <div-flex-column class="main card">
          <!--<div-flex-row>-->
          <!--<span>搜索：</span>-->
          <!--<el-input placeholder="模糊搜索问题" v-model="searchQuestion" size="small" class="input-search"/>-->
          <!--&lt;!&ndash;<check-box-group v-model="searchExamStatus">&ndash;&gt;-->
          <!--&lt;!&ndash;<check-box label="1" size="mini">科目一</check-box>&ndash;&gt;-->
          <!--&lt;!&ndash;<check-box label="2" size="mini">科目四</check-box>&ndash;&gt;-->
          <!--&lt;!&ndash;</check-box-group>&ndash;&gt;-->
          <!--<el-button type="primary" size="small">搜 索</el-button>-->
          <!--<el-button size="small" @click="clickClearInput">清 除</el-button>-->
          <!--</div-flex-row>-->
          <el-table
            ref="multipleTable"
            :data="books"
            tooltip-effect="dark"
            row-key="id"
            :expand-row-keys="expands"
            @row-click="clickRow"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div-flex-column class="question-detail">
                  <div class="question">{{props.row.question}}</div>
                  <div class="question-type">题型：{{props.row.type==1?'判断题':props.row.type==2?'单选题':'多选题'}}</div>
                  <div-flex-row class="center">
                    <div-flex-column class="selects" v-if="props.row.type!=1">
                      <div-flex-row v-for="(item,index) in props.row.selects">{{item.selectIndex}}、{{item.options}}
                      </div-flex-row>
                    </div-flex-column>
                    <div class="title-img">
                      <img v-if="props.row.questionPic" :src="props.row.questionPic" :preview="props.row.id"
                           preview-text="文字文字"/>
                    </div>
                  </div-flex-row>
                  <div-flex-column class="answer">
                    <template v-for="(item,index) in props.row.analyses">
                      <div-flex-row class="pic-texts" v-if="item.img">
                        <div class="pic-text">
                          <div>
                            <img :src="item.img" :preview="item.img"/>
                          </div>
                          <div>{{item.text}}</div>
                        </div>
                      </div-flex-row>
                    </template>
                    <template v-for="(item,index) in props.row.analyses">
                      <div class="text-explain" v-if="!item.img">{{item.text}}</div>
                    </template>
                  </div-flex-column>
                </div-flex-column>
              </template>
            </el-table-column>
            <el-table-column
              label="id"
              width="70"
              prop="id">
            </el-table-column>
            <el-table-column
              prop="question"
              label="问题"
              width="460"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="科目类型"
              width="100"
              prop="type">
              <template slot-scope="scope">
                <span v-if="scope.row.level==1">科目一</span>
                <span v-else>科目四</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="clickToDel(scope.row)">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :pager-count="15"
            :current-page="curPage"
            @current-change="clickPage"
            :page-count="pageCount">
          </el-pagination>
        </div-flex-column>
      </div-flex-column>
      <el-dialog
        :visible.sync="showDelDialog"
        :append-to-body="true"
        width="30%">
        <span >是否删除</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeDelDialog">取 消</el-button>
         <el-button type="danger" @click="onDel">删 除</el-button>
       </span>
      </el-dialog>
    </div-flex-column>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        curPage: 0,
        pageCount: 0,
        // searchQuestion:"",
        // searchExamLevel:[],
        userInfo: {},
        books: [],
        expands: [],
        delDialogData: {},
        showDelDialog:false
      }
    },
    methods: {
      clickRow: function (row, event, column) {
        var index = this.expands.indexOf(row.id);
        if (index >= 0) this.expands.splice(index, 1);
        else this.expands = [row.id];
      },
      clickToDel: function (row) {
        this.delDialogData = row;
        this.showDelDialog=true;
      },
      closeDelDialog: function () {
        this.delDialogData = null;
        this.showDelDialog=false;
      },
      clickClearInput: function () {
        this.searchExamStatus = 0;
        this.searchQuestion = "";
      },
      clickPage: function (page) {
        var params = {
          page: page - 1,
        };
        this.search(params);
      },
      onDel:function(){
        this.$Api.stuDelErrorBook(this, {
          id:this.delDialogData.bookId
        }).then((res) => {
          if (res.code == 200) {
            this.closeDelDialog();
            this.$message({
              message: res.msg,
            });
            this.load({
              page: this.curPage - 1,
            });
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      load: function (params) {
        this.$Api.stuGetErrorBook(this, params).then((res) => {
          if (res.code == 200) {
            this.books = res.data.books;
            this.pageCount = res.data.pageCount;
            if (params.page) this.curPage = params.page + 1;
            else this.curPage = 1;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      }
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.load({
        page: this.curPage
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
  }

  .page .header {
    margin: 0;
    height: 50px;
  }

  .page .header .tip {
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #3ac0ff;
    cursor: pointer;
  }

  .page .main > div {
    margin-top: 15px;
  }

  /*.page .main > div:first-child {*/
  /*align-items: center;*/
  /*font-size: 15px;*/
  /*color: #444444;*/
  /*margin: 10px 0 0 20px;*/
  /*}*/

  /*.page .main > div:first-child > *:nth-child(2) {*/
  /*margin-left: 0;*/
  /*}*/

  /*.page .main > div:first-child > *:nth-child(3) > div {*/
  /*margin-left: 20px;*/
  /*}*/

  /*.page .main > div:first-child > *:last-child {*/
  /*padding-left: 25px;*/
  /*padding-right: 25px;*/
  /*margin-left: 20px;*/
  /*}*/

  /*.page .main > div:first-child > *:nth-last-child(2) {*/
  /*padding-left: 25px;*/
  /*padding-right: 25px;*/
  /*margin-left: 20px;*/
  /*}*/

  .page .main .input-search {
    width: 200px;
  }

  .page .main >>> .el-table, .el-table__expanded-cell {
    background: transparent;
    border-radius: 10px;
  }

  .page .main >>> .el-table th {
    background: rgba(255, 255, 255, 0.78);
  }

  .page .main >>> tr {
    background: rgba(255, 255, 255, 0.64);
    color: #666666;
    font-size: 14px;
    -webkit-user-select: text;
    -ms-user-select: text;
    -khtml-user-select: text;
    user-select: text;
  }

  .page .main .question-detail .question {
    font-size: 16px;
    font-weight: bold;
    color: #666666;
  }

  .page .main .question-detail .question-type {
    margin-top: 5px;
    color: #666666;
  }

  .page .main .question-detail .center {
    justify-content: space-between;
  }

  .page .main .question-detail .center .selects {
    font-size: 15px;
    margin: 20px 50px 0 0;
    color: #555555;
  }

  .page .main .question-detail .center .selects > div {
    margin-bottom: 7px;
  }

  .page .main .question-detail .center .title-img {
    width: 180px;
    height: 180px;
    min-width: 180px;
    min-height: 180px;
    margin: 20px 0 0 0;
    text-align: center;
    cursor: pointer;
  }

  .page .main .question-detail .center .title-img img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }

  .page .main .question-detail .answer {
    margin: 30px 0 0 0;
  }

  .page .main .question-detail .answer .pic-texts {
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
  }

  .page .main .question-detail .answer .pic-texts .pic-text > div:first-child {
    width: 100px;
    height: 100px;
  }

  .page .main .question-detail .answer .pic-texts .pic-text img {
    width: 100px;
    height: 100px;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
    border-radius: 5px;
  }

  .page .main .question-detail .answer .pic-texts .pic-text > div:last-child {
    color: #555555;
    margin: 5px 0 0 0;
    text-align: center;
  }

  .page .main .question-detail .answer .text-explain {
    color: #666666;
    font-size: 17px;
  }
</style>
