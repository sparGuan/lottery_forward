<template>
    <div class="components-header" ref="headerH" :class="{hastop: hasTop}">
        <div class="c-h-bg" :class="{hastop: hasTop}" :style="{height: StatusBarHeight+'px'}"></div>        
        <div style="background: #1F2638" :class="{hastop: hasTop, 'left-cancel': showLeftCancel, 'white-bgc': whiteBgc,'box_bottom':!box_bottom}">
            <div class="c-h-blank" :style="{height: topHeight+'px', background: bgcolor}"></div>
            <div class="c-h-content" ref="topHeight" :style="{background:bgcolor}">
                <div class="c-hc-left">
                    <div v-if="showBack" class="c-hb-img" @click="back">
                        <img src="../../assets/img/common/back_left_white.png" alt="">
                        <!-- 新增返回首页按钮 -->
                        <div class="left_index flex flex_aic" v-if="indexback">
                            <img src="../../assets/img/common/index.png" alt="">
                        </div>
                        <slot name="closeBack"></slot>
                    </div>
                    <div v-if="showLeftCancel" class="c-hb-text" @click="leftcancel">
                        <span class="b6-13">取消</span>
                    </div>
                </div>
                <h1 class="h3-15 fs_18 color_ff f-h-c">
                    {{title}}
                    <slot name="top_select"></slot> 
                </h1>
                <div class="m3-12 c-hc-right">
                    <div class="c-hcr-click" @click="rBtn" v-if="showRight">
                        <img v-if="showImg" class="img_24" src="../../assets/img/common/payRecord2.png" alt="">
                        <!-- <span class="fs_18" v-if="!showImg" :style="{color: operateColor || '#333'}">{{operate}}</span> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="abusole_black"></div> -->
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: 'Gheader',
    props: [
        'title',
        'operate',
        'whiteBgc',
        'operateColor',
        'box_bottom',
        'bgcolor',
        'indexback',
        'closeback',
        'showRight'
    ],
    data() {
        return {
            topHeight:'20',
            StatusBarHeight:'64',
            hasTop: false 
        }
    },
    created(){
    }, 
    mounted() {
        if(window.android){//移动端
            this.topHeight = Number(window.android.getStatusBarHeight()/window.devicePixelRatio);
            this.StatusBarHeight = Number(window.android.getStatusBarHeight()/window.devicePixelRatio) + this.$refs.topHeight.offsetHeight;
        }else{//pc
            this.StatusBarHeight = Number(this.topHeight)+this.$refs.topHeight.offsetHeight;
        }
        this.$store.commit("getHeaderHeight", this.StatusBarHeight); 
    },  
    computed: {
        showBack() {
            return this.$options._parentListeners ? 'go-back' in this.$options._parentListeners : false;
        },
        showLeftCancel() {
            return this.$options._parentListeners ? 'left-cancel' in this.$options._parentListeners : false;
        },
        showImg() {
            return this.$options._parentListeners ? 'showImg' in this.$options._parentListeners : false;
        }
    },
    methods: {
        rBtn() {
            if (this.showImg) {
                this.$emit('showImg');
            } else {
                this.$emit('operate');
            }
        },
        back() {
            this.$emit('go-back');
        },
        leftcancel() {
            this.$emit('left-cancel');
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/commomStyle.less');
.pr {
    position: relative;
}
.pa {
    position: absolute;
}
.components-header {
    .abusole_black{
        width: 100%;
        height: 44px;
    }    
    &.hastop {
        // height: 64px;
    }
    .c-h-bg + div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: @color_ff;
        z-index: 50;
        &.left-cancel {
            background-color: #f6f6f6;
        }
        &.white-bgc {
            background-color: #fff;
            z-index: 999;
            opacity: 1;
        }
        &.hastop {
            .c-h-blank {
                height: 20px;
            }
        }
    }
    .c-h-content {
        height: 44px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;        
        h1 {
            // flex: 1;
            // text-align: center;
            // font-size: 15px;
        }
        .c-hc-left {
            flex: 1;
            .c-hb-img {
                padding-left: 16px;
                // width: 29px;
                // height: 20px;
                display: flex;
                // justify-content: center;
                align-items: center;
                img {
                    width: 20px;
                    // height: 20px;
                }
                span {
                    margin-left: 10px;
                }
                .left_index{
                    margin-left: 24px;
                    position: relative;
                    &::after{
                        content: "";
                        position: absolute;
                        top: 1px;
                        left: -12px;
                        width:1px;
                        height:18px;
                        border-left: 1px solid rgba(39,49,71,1);

                    }
                    img{
                        // margin-top: 10px;
                        width: 22px;
                        // height: 20px;
                    }
                }
            }
            .c-hb-text {
                width: 100%;
                height: 20px;
                padding-left: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
        .c-hc-right {
            flex: 1;
            .f-h-c();
            justify-content: flex-end;
            font-size: 13px;
            .c-hcr-click {
                // margin-right: 10px;
                img {
                    margin: 0 10px;
                    // width: 15px;
                    // height: 15px;
                }
                .img_24{
                    width: 16px;
                    height: 20px;
                    margin-right: 16px;
                }
                span {
                    margin: 0 10px;
                }
            }
        }
        &>div {
            width: 60px;
        }
    }
    .c-h-bg {
        height: 44px;
        &.hastop {
            // height: 64px;
        }
    }
}
</style>