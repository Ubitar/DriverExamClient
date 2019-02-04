<template>
  <transition name="fade">
    <div-flex-column class="page">
      <div-flex-column>
        <div-flex-row class="card head">
          <span>共 {{studentCount}} 名学员</span>
        </div-flex-row>
      </div-flex-column>
      <div-flex-column class="card main">
        <div-flex-row>
          <span>搜索：</span>
          <el-input placeholder="根据用户名模糊搜索" v-model="searchUserName" size="small" class="input-search"/>
          <radio-button-group v-model="searchExamLevel">
            <radio-button label="-1" size="mini">未通过</radio-button>
            <radio-button label="1" size="mini">科目一</radio-button>
            <radio-button label="3" size="mini">科目一过，科目四未过</radio-button>
            <radio-button label="4" size="mini">科目四</radio-button>
          </radio-button-group>
        </div-flex-row>
        <div-flex-row>
          选择驾考类型：
          <el-select v-model="searchType" placeholder="所有" size="small">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="clickSearch">搜 索</el-button>
          <el-button size="small" @click="clickClearInput">清 除</el-button>
        </div-flex-row>
        <el-table
          ref="multipleTable"
          :data="students"
          tooltip-effect="dark"
          border
          style="width: 100%">
          <el-table-column
            label="id"
            width="70"
            prop="id">
          </el-table-column>
          <el-table-column
            label="姓名"
            width="120"
            prop="name"
            show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.name?scope.row.name:'未填写'}}</template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
            width="150">
            <template slot-scope="scope">{{ scope.row.mobile?scope.row.mobile:'未填写'}}</template>
          </el-table-column>
          <el-table-column
            label="性别"
            width="80">
            <template slot-scope="scope">{{ scope.row.gender=='0'?'未填写':scope.row.gender=='1'?'男':'女' }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="clickToEdit( scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="showFreezeDialog(scope.row)">{{scope.row.freeze==1?'已冻结':'冻结'}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="15"
          :page-size="10"
          :current-page="curPage"
          @current-change="clickPage"
          :total="studentCount">
        </el-pagination>
      </div-flex-column>
      <el-dialog
        :visible.sync="showFreeze"
        :append-to-body="true"
        width="30%">
        <span v-if="this.freezeDialogData==null||this.freezeDialogData.freeze==1">是否解除冻结</span>
        <span v-else>是否冻结该账号</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeFreezeDialog">取 消</el-button>
         <el-button type="danger" @click="onFreezeAccount">{{this.freezeDialogData==null||this.freezeDialogData.freeze==1?'解 除':'冻 结'}}</el-button>
       </span>
      </el-dialog>
    </div-flex-column>
  </transition>
</template>

<script>
  import StringUtils from '@/utils/StringUtils'

  export default {
    data() {
      return {
        curPage: 0,
        studentCount: 0,
        pageCount: 0,
        types: [{
          label: "所有",
          value: null
        }, {
          label: "A1、A3、B1 类",
          value: "A1_A3_B1"
        }, {
          label: "B2、A2 类",
          value: "B2_A2"
        }, {
          label: "C1、C2、C3 类",
          value: "C1_C2_C3"
        }, {
          label: "E、F、D 类",
          value: "E_F_D"
        }],
        searchUserName: null,
        searchExamLevel: null,
        searchType: null,
        students: [],
        showFreeze: false,
        freezeDialogData: null
      }
    },
    methods: {
      clickToEdit: function (data) {
        this.$router.push("/manager/index/student?id=" + data.id);
      },
      clickClearInput: function () {
        this.searchUserName = null;
        this.searchExamLevel = null;
        this.searchType = null;
      },
      showFreezeDialog: function (data) {
        this.showFreeze = true;
        this.freezeDialogData = data;
      },
      closeFreezeDialog: function () {
        this.showFreeze = false;
        this.freezeDialogData = null;
      },
      onFreezeAccount: function () {
        var params = {};
        params.id = this.freezeDialogData.id;
        params.freeze = this.freezeDialogData.freeze == 1 ? 0 : 1;
        this.$Api.teaFreeze(this, params).then((res) => {
          if (res.code == 200) {
            this.showFreeze = false;
            this.clickSearch();
          } else {
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      clickSearch: function () {
        var params = {};
        if (!StringUtils.isBlank(this.searchUserName)) params.name = this.searchUserName;
        if (this.searchExamLevel) params.level = this.searchExamLevel;
        if (this.searchType) params.type = this.searchType;
        params.page = 0;
        this.search(params);
      },
      clickPage: function (page) {
        var params = {};
        if (!StringUtils.isBlank(this.searchUserName)) params.name = this.searchUserName;
        if (this.searchExamLevel) params.level = this.searchExamLevel;
        if (this.searchType) params.type = this.searchType;
        params.page = page - 1;
        this.search(params);
      },
      search: function (params) {
        this.$Api.teaGetStuManager(this, params).then((res) => {
          if (res.code == 200) {
            var data = res.data;
            this.studentCount = data.count;
            this.students = data.students;
            this.pageCount = data.pageCount;
            if (params.page) this.curPage = params.page;
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
      this.search({});
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

  .page .head span {
    margin-left: 30px;
  }

  .page .head span:first-child {
    margin-left: 0;
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

  .page .main > div:first-child > *:last-child > div {
    margin-left: 20px;
  }

  .page .main > div:nth-child(2) > button:last-child {
    margin-left: 20px;
    width: 80px;
  }

  .page .main > div:nth-child(2) > button:nth-last-child(2) {
    margin-left: 20px;
    width: 80px;
  }

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
