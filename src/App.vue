<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
};
</script>       

<style lang="less">
    body{
        height: 100%; 
        background-color: #1a242e;
        .van-toast.van-toast--middle{
            z-index: 2000 !important;
        }
    }
    #app{
        width: 100%;
        background-color: #1a242e;
        color: #fff;
        font-family: 'PingFangSC-Regular', 'PingFang SC',  'Microsoft Yahei', '微软雅黑', Arial, sans-serif !important;
        .van-cell{
            background:linear-gradient(90deg,rgba(41,50,60,1) 0%,rgba(72,85,99,1) 100%);
        }
        .van-collapse-item__content{
            padding: 0;
        }
        .van-cell:not(:last-child)::after{
            border: 0;
        }
        [class*=van-hairline]::after{
             border: 0;
        }
        .van-collapse-item__content{
            background: #000;
        }
        .bettingList{
            .van-cell{
                padding: 9px 16px;
            }
            .van-cell__right-icon{
                margin-top: 8px;
                font-size: 20px;
                color: rgba(255,255,255,0.8);
            }
        }
        .matchList{
            .van-cell__right-icon{
                margin-top: 2px;
            }
        }
        
    }
    
</style>
