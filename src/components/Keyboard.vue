<template>
    <div class="keyboardWrap" :style="{background: keyInfo.bgcolor}">
        <ul class="numberList flex flex_fww" >
            <li @click="inpText('1')" class="flex flex_jc flex_aic">1</li>
            <li @click="inpText('2')" class="flex flex_jc flex_aic">2</li>
            <li @click="inpText('3')" class="flex flex_jc flex_aic">3</li>
            <li @click="inpText('4')" class="flex flex_jc flex_aic">4</li>
            <li @click="inpText('5')" class="flex flex_jc flex_aic">5</li>
            <li @click="inpText('6')" class="flex flex_jc flex_aic">6</li>
            <li @click="inpText('7')" class="flex flex_jc flex_aic">7</li>
            <li @click="inpText('8')" class="flex flex_jc flex_aic">8</li>
            <li @click="inpText('9')" class="flex flex_jc flex_aic">9</li>
            <li @click="inpText('.')" class="flex flex_jc flex_aic dian">.</li>
            <li @click="inpText('0')" class="flex flex_jc flex_aic">0</li>
            <li @click="inpText('remove')" class="flex flex_jc flex_aic"><img class="remove" src="@/assets/img/common/remove_icon.png" alt=""></li>
        </ul>
        <div>
            <slot></slot>
        </div>
        <img v-if="keyInfo.downFlag" @click="keyDown" class="keyDown" src="@/assets/img/common/keyboard_up.png" alt="">
    </div>
</template>

<script>
export default {
    name: "Keyboard",
    data(){
        return {
            
        }
    },
    props: {
        keyInfo: {
            type: Object,
            default: function () {
                return {
                    downFlag: true,
                    bgcolor: 'rgba(31,38,56,1)'
                }
            }
        }
    },
    methods: {
        inpText(data){
            this.$emit("getNumber",data)
        },
        keyDown(){
            this.$emit("keyDown")
        }
    }
}
</script>

<style lang="less" scoped>
    .keyboardWrap{
        // position: absolute;
        position: fixed;
        bottom: 0px;
        left: 0;
        z-index: 2222;
        padding-bottom: 16px;
        background: rgba(31,38,56,1);
        .numberList{
            width: 100%;
            li{
                width: 125px;
                height: 64px;
                font-size: 24px;
                font-family:Helvetica;
                .remove{
                    width: 24px;
                    height: 24px;
                }
            }
            .dian{
                margin-top: -6px;
            }
        }
        .keyDown{
            position: absolute;
            right: 0;
            top: -22px;
            width: 52px;
            height: 22px;
        }
    }
    
</style>