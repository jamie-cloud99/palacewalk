import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('@/test/TestView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collections',
      component: () => import('@/views/CollectionList.vue')
    },
    {
      path: '/collections/masterpieces',
      name: 'masterpieces',
      component: () => import('@/views/CollectionMaster.vue')
    },
    {
      path: '/collections/:collectionId',
      name: 'collectionInfo',
      component: () => import('@/views/CollectionInfo.vue')
    },
    {
      path: '/exhibitions',
      name: 'exhibitions',
      component: () => import('@/views/ExhibitionList.vue')
    },
    {
      path: '/exhibitions/:exhibitionId',
      name: 'exhibitionIntro',
      component: () => import('@/views/ExhibitionIntro.vue')
    },
    {
      path: '/exhibitions/:exhibitionId/content',
      component: () => import('@/views/ExhibitionContent.vue'),
      meta: {
        isFullPage: true
      }
    },
    {
      path: '/member',
      name: 'member',
      redirect: { name: 'memberInfo' },
      component: () => import('@/views/MemberView.vue'),
      children: [
        {
          path: 'info',
          name: 'memberInfo',
          component: () => import('@/views/MemberInfo.vue')
        },
        {
          path: 'favorites',
          name: 'memberFavorites',
          component: () => import('@/views/MemberFavorites.vue')
        },
        {
          path: 'messages',
          name: 'memberMessages',
          component: () => import('@/views/MemberMessages.vue')
        }
      ]
    },
    {
      path: '/curating',
      name: 'curating',
      component: () => import('@/views/CuratingView.vue')
    },
    {
      path: '/curating/new',
      name: 'curatingNew',
      component: () => import('@/views/CuratingNew.vue')
    },
    {
      path: '/curating/edit/:previewId/',
      name: 'curatingEdit',
      component: () => import('@/views/CuratingEdit.vue')
    },
    {
      path: '/curating/:memberId/:previewId',
      component: () => import('@/views/CuratingPreview.vue')
    },
    {
      path: '/curating/:exhibitionId/messages',
      name: 'curatingMessages',
      component: () => import('@/views/CuratingMessages.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('@/views/ErrorView.vue')
    }
  ]
})

export default router
