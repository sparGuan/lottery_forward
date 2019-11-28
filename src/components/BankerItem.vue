<template>
    <div class="marketItem flex flex_aic flex_jcbt" v-if="info">
        <div class="flex flex_aic flex1">
            <div class="FootListLeft">
                <span class="color_ff fs_16 fb text_center">庄</span>
            </div>
            <div class="FootListMiddle">
                <div class="FootListMiddleTop flex flex_aic">
                    <p class="fs_16 color_ff">{{ info.created_by }}</p>
                    <span class="fs_11 color_ff text_center" v-if="info.isActive == 0">自己</span>
                </div>
                <p class="persen fs_12 mt_2">赔率：主@{{ info.master_consult }}，平@{{ info.flat_consult }}，客@{{ info.slave_consult }}</p>
            </div>
        </div>
        <div class="FootListRight fs_16" @click="approach">进场</div>
    </div>
</template>

<script>
export default {
    name: 'BankerItem',
    data(){
        return {

        }
    },
    props: ['info'],
    methods: {
        approach(){
            this.$router.push({
                name: 'bankerRoom',
                query: {
                    games_point_id: this.info.games_point_id,
                    games_room_id: this.info.id,
                    isActive: this.info.isActive,
                }
            })
        }
    }    
}
</script>

<style lang="less" scoped>
    .marketItem{
        width: 375px;
        height: 60px;
        padding: 0 16px;
        background: linear-gradient(90deg, rgba(41, 50, 60, 1) 0%,rgba(72, 85, 99, 1) 100%);
        margin-bottom: 8px;
    }
    .FootListLeft {
        margin-right: 12px;
        span {
            display: block;
            width: 30px;
            height: 30px;
            background: rgba(239, 172, 24, 1);
            line-height: 30px;
            border-radius: 50%;
        }
    }
    .FootListMiddle {
        margin-right: 15px;
        .FootListMiddleTop {
            span {
                width: 40px;
                height: 18px;
                background: linear-gradient(153deg, rgba(35, 215, 235, 1) 0%,rgba(6, 174, 208, 1) 100%);
                border-radius: 9px;
                line-height: 18px;
                margin-left: 8px;
            }
        }
        .persen{
            color: rgba(255, 255, 255, 0.7);
        }
    }
    .FootListRight {
        color: rgba(5, 182, 207, 1);
    }
</style>