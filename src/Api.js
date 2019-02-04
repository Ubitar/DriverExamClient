import axios from 'axios'

const PATH_HEAD = "http://localhost:9095/driverexam";

var warnStr = "无法连接至服务器";

function get(that, url, params, head) {
  var headers = {
    token: localStorage.getItem("token")
  };
  headers = deepCopy(headers);
  Object.assign(headers, head)
  return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: url,
        params: params,
        headers: headers,
      }).then(response => {
        console.log(response);
        if (response.data.code == 1) {
          that.$message({
            message: response.data.msg,
            type: 'warning'
          });
          localStorage.setItem("token", null);
          localStorage.setItem("userInfo", null);
          that.$router.replace("/index");
        } else {
          resolve(response.data)
        }
      }).catch(err => {
        alert(warnStr)
        reject(err)
      })
    }
  )
}

function post(that, url, datas, head) {
  var headers = {
    token: localStorage.getItem("token")
  };
  headers = deepCopy(headers);
  Object.assign(headers, head);
  var params = new FormData();
  for (var key in datas)
    params.append(key, datas[key]);
  return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: url,
        data: params,
        headers: headers,
      }).then(response => {
        console.log(response);
        if (response.data.code == 1) {
          that.$message({
            message: response.data.msg,
            type: 'warning'
          });
          localStorage.setItem("token", null);
          localStorage.setItem("userInfo", null);
          that.$router.replace("/index");
        } else {
          resolve(response.data)
        }
      }).catch(err => {
        alert(warnStr);
        reject(err)
      })
    }
  )
}

function deepCopy(obj) {
  if (typeof obj != 'object') {
    return obj;
  }
  var newobj = {};
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}

export default {
  FILE_UPLOAD: PATH_HEAD + "/file/upload",
  stuLogin: (that, params) => {
    return post(that, PATH_HEAD + '/student/login', params)
  },
  stuRegister: (that, params) => {
    return post(that, PATH_HEAD + '/student/register', params)
  },
  stuLogout: (that, params) => {
    return post(that, PATH_HEAD + '/student/logout', params)
  },
  stuChangePwd: (that, params) => {
    return post(that, PATH_HEAD + '/student/person/change_pwd', params)
  },
  getExamMsg: (that, params) => {
    return get(that, PATH_HEAD + '/student/person/get_exam', params)
  },
  getSimulateExam: (that, params) => {
    return get(that, PATH_HEAD + '/student/person/get_simulate_exam', params)
  },
  updatePersonMsg: (that, params) => {
    return post(that, PATH_HEAD + '/student/person/input', params)
  },
  stuGetErrorBook: (that, params) => {
    return get(that, PATH_HEAD + '/student/book/get', params)
  },
  stuDelErrorBook: (that, params) => {
    return post(that, PATH_HEAD + '/student/book/del', params)
  },
  stuUpdateErrorBook: (that, params) => {
    return post(that, PATH_HEAD + '/student/book/update', params)
  },
  stuGetOrderExerciseCurIndex: (that, params) => {
    return get(that, PATH_HEAD + '/student/order_exercise/cur', params)
  },
  stuFinishOrderExercise: (that, params) => {
    return post(that, PATH_HEAD + '/student/order_exercise/finish', params)
  },
  stuFinishSimulateExam: (that, params) => {
    return post(that, PATH_HEAD + '/student/simulate_exam/finish', params)
  },
  stuFinishExam: (that, params) => {
    return post(that, PATH_HEAD + '/student/exam/finish', params)
  },


  teaLogin: (that, params) => {
    return post(that, PATH_HEAD + '/teacher/login', params)
  },
  teaLogout: (that, params) => {
    return post(that, PATH_HEAD + '/teacher/logout', params)
  },
  teaGetStuManager: (that, params) => {
    return get(that, PATH_HEAD + '/teacher/studentmg/get', params)
  },
  teaFreeze: (that, params) => {
    return post(that, PATH_HEAD + '/teacher/studentmg/freeze', params)
  },
  teaGetStudentMsg: (that, params) => {
    return get(that, PATH_HEAD + '/teacher/studentmg/get_stu_msg', params)
  },
  teaDelQuestion: (that, params) => {
    return post(that, PATH_HEAD + '/teacher/question/del', params)
  },
  teaUpdateQuestion: (that, params) => {
    return post(that, PATH_HEAD + '/teacher/question/update', params)
  },


  getQuestionIds: (that, params) => {
    return get(that, PATH_HEAD + '/question/get_ids', params)
  },
  getQuestions: (that, params) => {
    return get(that, PATH_HEAD + '/question/get_questions', params)
  },
  getQuestion: (that, params) => {
    return get(that, PATH_HEAD + '/question/get', params)
  },
}
