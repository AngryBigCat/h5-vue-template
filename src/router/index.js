import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Content from '@/components/Content'
import ContentHrf from '@/components/ContentHrf'
import Article from '@/components/Article'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content/hrf',
      name: 'ContentHrf',
      component: ContentHrf,
      children: [
      ]
    },
    {
      path: '/content/:name',
      name: 'Content',
      component: Content,
      children: [
      ]
    },
    {
      path: '/content/:name/:id',
      name: 'Article',
      component: Article,
    }
  ]
})
