<template>
    <div class="confirmInformation">
        <div class="information">
            <div class="title fs_16 fb mt_24 mb_8 text_center">{{ confirmData.title }}</div>
            <div class="teamDesc fs_15 text_center mb_8" v-if="confirmData.desc">{{ confirmData.desc }}</div>
            <div class="name flex flex_jc" v-if="confirmData.name"><span>{{ confirmData.name }}</span></div>
            <div class="informationList mt_16">
                <div class="_row" v-for="(item, index) in confirmData.data" :key="index">
                    <div class="_left"><span v-if="item.name" :style="{background: bgcolor[item.bg] }">{{ item.name }}</span>{{ item.key }}</div>
                    <div class="_right">{{ item.value }}</div>
                </div>
            </div>
            <div class="buttonGroup flex mt_14" v-if="confirmData.btnFlag == 0">
                <div class="close" @click="close">取消</div>
                <div class="submit" @click="submit">确认</div>
            </div>
            <div v-else class="know fs_16 fb color_ff text_center" @click="close">我知道了</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmInformation',
    data(){
        return {
            bgcolor: {
                '1': "rgba(255,144,0,1);",
                '2': "rgba(72,85,99,1)"
            }
        }
    },
    props: ['confirmData'],
    mounted(){
        console.log(this.confirmData)
    },
    methods: {
        close(){
            this.$emit("closeConfirmInformation")
        },
        submit(){
            this.$emit("submitConfirmInformation")
        }
    }
}
</script>

<style lang="less" scoped>
    .confirmInformation{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.3);
        color: #000;
        font-family: 'PingFangSC-Semibold','PingFang SC';
        .information{
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            width: 343px;
            background:rgba(255,255,255,1);
            border-radius: 5px;
            .name{
                span{
                    padding: 0 8px;
                    height: 22px;
                    background:rgba(255,144,0,1);
                    text-align: center;
                    line-height: 22px;
                    border-radius: 11px;
                    font-size: 11px;
                    color:rgba(255,255,255,1);
                } 
            }
            .informationList{
                ._row{
                    ._left{
                        color:rgba(41,50,60,.4);
                        span{
                            margin-right: 8px;
                            width: 22px;
                            height: 14px;
                            background:rgba(255,144,0,1);
                            border-radius: 3px;
                            font-size:8px;
                            color:rgba(255,255,255,1);
                            text-align: center;
                            line-height: 14px;
                        }
                    }
                    ._right{
                        color:rgba(41,50,60,.8)
                    }
                }
            }
            .buttonGroup{
                border-top: 1px solid rgba(237,237,237,1); 
                height: 48px;
                border-radius: 0 0 5px 5px;
                overflow: hidden;
                div{
                    color: #fff;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    line-height: 48px;
                    font-size: 16px;
                    font-weight: 600;
                }
                .close{
                    color:rgba(41,50,60,.4);
                }
                .submit{
                    background: rgba(5, 182, 207, 1);
                }
            }
            .know{
                margin: 24px auto;
                width: 191px;
                height: 48px;
                line-height: 48px;
                background:rgba(5,182,207,1);
                border-radius: 24px;
            }
        }
    }
</style>