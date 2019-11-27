<template>
    <div class="cursorWrap flex flex1 flex_fdr">
        <div class="inputFC_number flex flex1 flex_fdr">
            <div :class="left ? 'inpval flex flex_aic flex1 flex_fdr' : 'inpval flex flex_aic flex_jcfe flex1 flex_fdr'" @click="cursorPlay">
                <span v-if="inputNumber.length == 0" class="tipsText left" :style="{fontSize:size}">{{ placeholder }}</span>
                <span v-for="(item, index) in inputNumber" :key="index" :style="{fontSize:size}">{{ item }}</span>
                <span ref="cursor" class="cursor"></span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'CursorWrap',
    props: [
        'size',
        'placeholder', 
        'inputNumber',
        'left'
    ],
    data() {
        return {
            // 光标计时器
            cursorTimer: null,
            // 光标DOM元素
            cursorDom: null,  
        }
    },
    mounted(){
        this.cursorDom = this.$refs.cursor;
    },
    methods: {
        cursorPlay(){
            clearInterval(this.cursorTimer)
            let num = 0;
            this.cursorTimer = setInterval(()=>{
                if(num % 2 == 0){
                    this.cursorDom.style.borderColor = "#0078ff"
                }else{
                    this.cursorDom.style.borderColor = "transparent"
                }
                num++;
            },700)
        },
        clearTimer(){
            this.cursorDom.style.borderColor = "transparent"
            clearInterval(this.cursorTimer)
        }
    }
}
</script>

<style lang="less" scoped>
    .inputFC_number{
        font-family: 'PingFangSC-Regular', 'PingFang SC',  'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
        .inpval{
            padding-right: 5px;
            position: relative;
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            height: 100%;
            font-weight: 400;
            font-size: 16px;
            color:#000;
            .cursor{
                margin: 2px 0 0 4px;
                height: 18px;
                border-right: 2px solid transparent;
            }
            .tipsText{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1;
                color: rgba(41, 50, 60, 0.4);
                font-size: 16px;
            }
        }
    }
    .textLeft{
        .tipsText{
            left: 8px !important;
        }
    }
</style>