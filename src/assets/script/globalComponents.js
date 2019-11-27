import Vue from 'vue';

// 头部导航组件 Ghead
import Ghead from '@/components/j-header/index.js'
Vue.use(Ghead)

// 自定义数字键盘组件
import Keyboard from '@/components/Keyboard.vue'
Vue.component(Keyboard.name, Keyboard) 

// 光标闪烁 组件
import Cursor from '@/components/cursor.vue'
Vue.component(Cursor.name, Cursor)

// 赛事信息 组件
import TopWindow from '@/components/TopWindow.vue'
Vue.component(TopWindow.name, TopWindow)

// 庄家元素（房间）
import BankerItem from '@/components/BankerItem.vue'
Vue.component(BankerItem.name, BankerItem)

// 投注输入组件
import InputBetting from '@/components/InputBetting.vue'
Vue.component(InputBetting.name, InputBetting)

//  确认数量组件
import ConfirmInformation from '@/components/ConfirmInformation.vue'
Vue.component(ConfirmInformation.name, ConfirmInformation)

// 赛事面板组件
import EventPanel from '@/components/EventPanel.vue'
Vue.component(EventPanel.name, EventPanel)

// 缺省页组件
import EmptyPage from '@/components/EmptyPage.vue'
Vue.component(EmptyPage.name, EmptyPage)



