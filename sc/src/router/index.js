import Vue from 'vue'
import Router from 'vue-router'
import student from '@/pages/student/index'
import studentInfo from '@/pages/student/info'
import studentTest from '@/pages/student/test'

import Clazz from '@/pages/clazz/index'
import ClazzInfo from '@/pages/clazz/info'
import ClazzTest from '@/pages/clazz/test'

import Course from '@/pages/course/index'
import CourseInfo from '@/pages/course/info'
import CourseTest from '@/pages/course/test'

import SC from '@/pages/sc/index'
import SCInfo from '@/pages/sc/info'
import SCTest from '@/pages/sc/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/student',
      component: student,
      children:[{
      	path:'info',
      	component:studentInfo
      },{
      	path:'test',
      	component:studentTest
      }]
    },{
      path: '/clazz',
      component: Clazz,
      children:[{
        path:'info',
        component:ClazzInfo
      },{
        path:'test',
        component:ClazzTest
      }]
    },{
      path: '/course',
      component: Course,
      children:[{
        path:'info',
        component:CourseInfo
      },{
        path:'test',
        component:CourseTest
      }]
    },
    {
      path: '/sc',
      component: SC,
      children:[{
        path:'info',
        component:SCInfo
      },{
        path:'test',
        component:SCTest
      }]
    }
  ]
})
