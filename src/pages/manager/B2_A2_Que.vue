<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column>
        <div-flex-column class="card head">
          <div-flex-row>
            <div>共 {{count}} 条&nbsp;&nbsp;<span class="strong">B2、A2 考试</span>&nbsp;&nbsp;题目</div>
          </div-flex-row>
        </div-flex-column>
      </div-flex-column>
      <div-flex-column class="card main">
        <div-flex-row>
          <span>搜索：</span>
          <el-input placeholder="根据题目标题模糊搜索" v-model="searchQuestion" size="small" class="input-search"/>
          <radio-button-group class="selectors" v-model="searchLevel">
            <radio-button label="1" size="small">科目一</radio-button>
            <radio-button label="4" size="small">科目四</radio-button>
          </radio-button-group>
          <el-button type="primary" size="small" @click="clickSearch">搜 索</el-button>
        </div-flex-row>
        <div-flex-row>
          <el-button type="primary" size="small" @click="clickToAdd">新 增</el-button>
          <el-button type="danger" size="small" @click="clickMutiDel">批量删除</el-button>
        </div-flex-row>
        <el-table
          ref="multipleTable"
          :data="questions"
          tooltip-effect="dark"
          border
          @selection-change="onTabelSelChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            label="id"
            width="60"
            prop="id">
          </el-table-column>
          <el-table-column
            prop="question"
            label="题目"
            width="350"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="系统题库"
            width="90">
            <template slot-scope="scope">{{ scope.row.libType=='0'?'否':'是' }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="clickEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="clickToDel( scope.row)">删除
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
      <el-dialog
        :visible.sync="showDelDialog"
        :append-to-body="true"
        width="30%">
        <span>是否删除问题</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelDialog">取 消</el-button>
         <el-button type="danger" @click="clickDel">删 除</el-button>
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
        count: 0,
        searchQuestion: "",
        searchLevel: 1,
        questions: [],
        multipleSelection: [],
        showDelDialog: false,
        delDialogData: null,
      }
    },
    methods: {
      clickToAdd: function () {
        this.$router.push("/manager/index/editque?type=B2_A2&level="+this.searchLevel);
      },
      clickMutiDel: function () {
        if (this.multipleSelection.length > 0) {
          this.showDelDialog = true;
          this.delDialogData = this.multipleSelection;
        } else {
          this.$message({
            message: '请选择一个或多个题目',
            type: 'warning'
          });
        }
      },
      clickEdit: function (data) {
        this.$router.push("/manager/index/editque?id="+data.id+"&type=B2_A2&level="+this.searchLevel);
      },
      clickToDel: function (data) {
        this.showDelDialog = true;
        this.delDialogData = data;
      },
      clickSearch: function () {
        var params = {
          page:0,
          type:"B2_A2"
        };
        if (this.searchLevel) params.level = this.searchLevel;
        if (this.searchQuestion) params.question = this.searchQuestion;
        this.search(params);
      },
      clickPage: function (page) {
        var params = {
          page:0,
          type:"B2_A2"
        };
        if (this.searchLevel) params.level = this.searchLevel;
        if (this.searchQuestion) params.question = this.searchQuestion;
        params.page = page - 1;
        this.search(params);
      },
      cancelDelDialog: function () {
        this.showDelDialog = false;
        this.delDialogData = null;
      },
      clickDel: function () {
        var params = {
          level:this.searchLevel,
          type:"B2_A2",
          ids: []
        };
        if (Array.isArray(this.delDialogData)) {
          for (var data in this.delDialogData){
            params.ids.push(this.multipleSelection[data].id);
          }
          params.ids=JSON.stringify(params.ids);
          this.deleteQuestions(params);
        } else {
          params.ids.push(this.delDialogData.id)
          params.ids=JSON.stringify(params.ids);
          this.deleteQuestions(params);
        }
      },
      deleteQuestions: function (params) {
        this.$Api.teaDelQuestion(this, params).then((res) => {
          if (res.code == 200) {
            this.$message({
              message: res.msg
            });
            this.clickPage(this.curPage);
            this.showDelDialog=false;
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      onTabelSelChange: function (val) {
        this.multipleSelection = val;
      },
      search: function (params) {
        this.$Api.getQuestions(this, params).then((res) => {
          if (res.code == 200) {
            this.questions = res.data.questions;
            this.count = res.data.count;
            this.pageCount = res.data.pageCount;
            if (params.page) this.curPage = params.page+1;
            else this.curPage=1;
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
      this.search({
        level: this.searchLevel,
        type: "B2_A2",
        page: this.curPage
      });
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
  }

  .page .head > div:first-child > * {
    margin-left: 30px;
  }

  .page .head > div:first-child > *:first-child {
    margin-left: 0;
  }

  .page .head > div:first-child .strong {
    font-size: 16px;
    font-weight: bold;
    color: #444444;
  }

  .page .main {
    margin-top: 15px;
  }

  .page .main > div {
    align-items: center;
    font-size: 15px;
    color: #444444;
    margin-top: 15px;
  }

  .page .main > div:first-child {
    margin-top: 0;
  }

  .page .main > div:first-child > * {
    margin-left: 20px;
  }

  .page .main > div:first-child > *:first-child {
    margin-left: 0;
  }

  .page .main > div:first-child > *:nth-child(2) {
    margin-left: 0;
  }

  .page .main > div:first-child > *:last-child {
    padding-left: 25px;
    padding-right: 25px;
  }

  .page .main .input-search {
    width: 300px;
  }

  .page .main .selectors > div:last-child {
    margin-left: 20px;
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

  .page .main >>> tr .el-tag {
    cursor: pointer;
  }

  .page .main .el-pagination {
    padding: 0;
  }

  .page .main .el-pagination >>> button {
    background: rgba(255, 255, 255, 0.78);
  }

  .page .main .el-pagination >>> li {
    background: rgba(255, 255, 255, 0.78);
    font-size: 13px;
    color: #888888;
  }

  .page .main .el-pagination >>> .btn-prev:first-child {
    margin-left: 0;
  }

</style>
