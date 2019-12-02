<template>
    <div>
        <div class="TopWindow">
            <div class="matchTitle flex flex_aic flex_jcbt">
                <div class="title flex flex_aic color_ff">
                    <img :src="record.logo | imgurl" alt="">
                    {{ record.gameName }}
                </div>
                <div class="time color_ff">{{ record.master_start_time }}</div>
            </div>
            <div class="opponent flex flex_aic fs_16 color_ff">
                <div class="team1 flex1 flex flex_fdc flex_jc flex_aic ml_15">
                    <img :src="record.master_img_url | imgurl" alt="">
                    {{ record.master_count }}
                </div>
                <img class="flex_shk mb_10" src="@/assets/img/common/vs2.png" alt="">
                <div class="team2 flex1 flex flex_fdc flex_jc flex_aic mr_15">
                    <img :src="record.slave_img_url | imgurl" alt="">
                    {{ record.slave_count }}
                </div>
            </div>
            <div class="shareBtn fs_14 color_ffs" @click="share">分享比赛</div>
        </div>
        <div class="modelWrapper" v-if="shareFlag" @click.self="closeShare">
            <div class="container">
                <div class="title">分享比赛</div>
                <div class="desc">阿拉特阿美尼亚VS班特列</div>
                <div class="result">欧盘胜平负</div>
                <div class="textArea">{{ shareText }}</div>
                <div class="shareBtnCopy" @click="copy" data-clipboard-action="copy" :data-clipboard-text="shareText">点击复制，分享比赛</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopWindow",
    data(){
        return {
            shareFlag: false,
            shareText: ''
        }
    },
    props: ['record'],
    mounted(){
        this.shareText = `分享比賽#${this.record.gameName}#【${this.record.master_count}】vs【${this.record.slave_count}】比賽哈希：111111111111111111111111111111111@◣復制整段文字口令可在AntPocket-App內自動識別◢`
    },
    methods: {
        share(){
            this.shareFlag = true;
        },
        closeShare(){
            this.shareFlag = false;
        },
        copy(){
            let clipboard = new this.clipboard('.shareBtnCopy');
            let _this = this;
            clipboard.on('success',function(){
                _this.$toast('复制成功');
                _this.closeShare();
            })
            clipboard.on('error',function(){
                _this.$toast('复制失败');
            })
        }
    }    
}
</script>

<style lang="less" scoped>
    .TopWindow{
        position: relative;
        width: 375px;
        height: 166px;
        background: url("../assets/img/common/bg.png");
        background-size: 100%;
        font-family: 'SFProText-Regular','SFProText';
        .matchTitle{
            padding: 14px 32px 0;
            width: 100%;
            height: 54px;
            .title{
                font-size: 16px;
                img{
                    margin-right: 8px;
                    width: 30px;
                    height: 30px;
                }
            }
            .time{
                font-size: 14px;
                
            }
        }
        .opponent{
            width: 100%;
            height: 104px;
            img{
                width: 25px;
                height: 34px;
            }
            .team1,.team2{
                height: 100%;
                img{
                    width: 45px;
                    height: 45px;
                    margin-bottom: 6px;
                }
            }
        }
        .shareBtn{
            position: absolute;
            left: 50%;
            bottom: 2px;
            margin-left: -40px;
            width: 80px;
            height: 30px;
            background: linear-gradient(90deg,rgba(255,191,62,1) 0%,rgba(255,158,31,1) 100%);
            border-radius: 15px;
            text-align: center;
            line-height: 30px;
        }
    }
    .modelWrapper{
        position: fixed; 
        left: 0;
        top: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
        font-family: 'PingFangSC-Semibold', "PingFangSC-Regular", 'PingFang SC';
        .container{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 343px;
            height: 303px;
            margin-left: -171.5px;
            margin-top: -151.5px;
            background: #fff;
            border-radius: 5px;
            .title{
                margin: 24px auto 8px;
                font-size: 18px;
                font-weight: 600;
                color:rgba(0,0,0,1);
                text-align: center;
            }
            .desc{
                font-size: 15px;
                text-align: center;
                font-weight: 400;
                color:rgba(0,0,0,1);
            }
            .result{
                margin: 8px auto 0;
                width: 72px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                font-size: 11px;
                font-family: "PingFangSC-Regular", "PingFang SC";
                font-weight: 400;
                color:rgba(255,255,255,1);
                background: rgba(255, 144, 0, 1);
                border-radius: 11px;
            }
            .textArea{
                box-sizing: border-box;
                padding: 8px;
                margin: 16px auto 16px;
                width: 311px;
                background:rgba(245,245,245,.8);
                color:rgba(41,50,60,1);
                font-size: 12px;
            }
            .shareBtn,.shareBtnCopy{
                margin: 0 auto;
                width: 259px;
                height: 48px;
                text-align: center;
                line-height: 48px;
                background:rgba(5,182,207,1);
                border-radius: 5px;
                font-size: 16px;
                font-family: "PingFangSC-Semibold", "PingFang SC";
                font-weight: 600;
                color:rgba(255,255,255,1);
            }
        }
    }
</style>