import { createRouter, createWebHashHistory } from 'vue-router'
import { useStatusStore } from '../stores/statusStore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      component: () => import('@/views/SearchView.vue')
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
      meta: {
        isNew: true
      },
      component: () => import('@/views/CuratingEdit.vue')
    },
    {
      path: '/curating/edit/:previewId',
      name: 'curatingEdit',
      meta: {
        isNew: false
      },
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else if(to.hash) {
      return { el: to.hash }
    }
    else {
      return {
        top: 0,
        behavior: 'smooth'
      }
    }
  }
})

// https://pinia.vuejs.org/core-concepts/outside-component-usage.html
router.beforeEach((to, from, next) => {
  const statusStore = useStatusStore()
  statusStore.setLoading()
  next()
})

router.afterEach(() => {
  const statusStore = useStatusStore()
  statusStore.clearLoading()
})

export default router
