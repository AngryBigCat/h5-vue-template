import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/Base'
import Home from '@/components/Home'
import Create from '@/components/Create'
import CenterIndex from '@/components/Center/index'
import Center from '@/components/Center/center'
import Word from '@/components/Center/word'

import Wiki from '@/components/Wiki/wiki'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'create',
          name: 'Create',
          component: Create
        },
        {
          path: 'center',
          name: 'Center',
          component: CenterIndex,
          children: [
            {
              path: '',
              component: Center
            },
            {
              path: 'word',
              name: 'Word',
              component: Word
            }
          ]
        },
      ]
    },
    {
      path: '/wiki/:id',
      name: 'Wiki',
      component: Wiki
    }
  ]
})
