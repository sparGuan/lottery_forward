import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/page/Home.vue')
const BankerList = () => import('@/page/BankerList.vue')
const MakeRecord = () => import('@/page/MakeRecord.vue')
const BankerRoom = () => import('@/page/BankerRoom.vue')


Vue.use(Router)

const router = new Router({
    routes: [
        // 首页
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                keepAlive: false,
                isBack: false,
            }
        },
        // 庄家列表
        {
            path: '/bankerList',
            name: 'bankerList',
            component: BankerList,
            meta: {
                keepAlive: false,
                isBack: false,
            }
        },
        // 投注记录
        {
            path: '/makeRecord',
            name: 'makeRecord',
            component: MakeRecord,
            meta: {
                keepAlive: false,
                isBack: false,
            }
        },
        {
            path: '/bankerRoom',
            name: 'bankerRoom',
            component: BankerRoom,
            meta: {
                keepAlive: false,
                isBack: false,
            }
        }
    ]
})

export default router