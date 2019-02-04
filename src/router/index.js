import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import ClientIndex from '@/pages/client/Index'
import ClientModes from '@/pages/client/Modes'
import ClientPersonMsg from '@/pages/client/PersonMsg'
import ClientInputPersonMsg from '@/pages/client/InputPersonMsg'
import ClientChangePwd from '@/pages/client/ChangePwd'
import ClientSelExerciseLevel from '@/pages/client/SelExerciseLevel'
import ClientOrderExercise from '@/pages/client/OrderExercise'
import ClientRandomExercise from '@/pages/client/RandomExercise'
import ClientExamExercise from '@/pages/client/ExamExercise'
import ClientExam from '@/pages/client/Exam'
import ClientReadyExam from '@/pages/client/ReadyExam'
import ClientExamResult from '@/pages/client/ExamResult'
import ClientErrorBook from '@/pages/client/ErrorBook'
import ManagerIndex from '@/pages/manager/Index'
import ManagerStudents from '@/pages/manager/Students'
import ManagerStudent from '@/pages/manager/Student'
import ManagerA1_A3_B1_Que from '@/pages/manager/A1_A3_B1_Que'
import ManagerB2_A2_Que from '@/pages/manager/B2_A2_Que'
import ManagerC1_C2_C3_Que from '@/pages/manager/C1_C2_C3_Que'
import ManagerE_F_D_Que from '@/pages/manager/E_F_D_Que'
import ManagerEditQue from '@/pages/manager/EditQue'
import Test from '@/pages/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/client/index',
      name: 'Index',
      component: ClientIndex,
      children: [{
        path: 'modes',
        component: ClientModes
      }, {
        path: 'personmsg',
        component: ClientPersonMsg
      }, {
        path: 'inputpersonmsg',
        component: ClientInputPersonMsg
      }, {
        path: 'changepwd',
        component: ClientChangePwd
      }, {
        path: 'selexerciselevel',
        component: ClientSelExerciseLevel
      }, {
        path: 'orderexercise',
        component: ClientOrderExercise
      }, {
        path: 'randomexercise',
        component: ClientRandomExercise
      }, {
        path: 'examexercise',
        component: ClientExamExercise
      }, {
        path: 'exam',
        component: ClientExam
      }, {
        path: 'readyexam',
        component: ClientReadyExam
      }, {
        path: 'examresult',
        component: ClientExamResult
      }, {
        path: 'errorbook',
        component: ClientErrorBook
      }]
    }, {
      path: '/manager/index',
      name: 'Index',
      component: ManagerIndex,
      children: [{
        path: 'students',
        component: ManagerStudents
      }, {
        path: 'student',
        component: ManagerStudent
      }, {
        path: 'a1_a3_b1_que',
        component: ManagerA1_A3_B1_Que
      }, {
        path: 'b2_a2_que',
        component: ManagerB2_A2_Que
      }, {
        path: 'c1_c2_c3_que',
        component: ManagerC1_C2_C3_Que
      }, {
        path: 'e_f_d_que',
        component: ManagerE_F_D_Que
      }, {
        path: 'editque',
        component: ManagerEditQue
      }]
    },
    {
      path: "/test",
      component: Test
    },
    {
      path: '*',
      name: 'Index',
      component: Index
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    //判断如果滚动条的位置存在直接返回到当前位置，否者返回到起点
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
})
