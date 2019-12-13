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
                keepAlive: true,
                isBack: false,
            }
        },
        // 庄家列表
        {
            path: '/bankerList',
            name: 'bankerList',
            component: BankerList,
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        // 投注记录
        {
            path: '/makeRecord',
            name: 'makeRecord',
            component: MakeRecord,
            meta: {
                keepAlive: true,
                isBack: false,
            }
        },
        // 房间
        {
            path: '/bankerRoom',
            name: 'bankerRoom',
            component: BankerRoom,
            meta: {
                keepAlive: true,
                isBack: false,
            }
        }
    ]
})

export default router