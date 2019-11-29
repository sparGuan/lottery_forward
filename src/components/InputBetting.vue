<template>
    <div class="inputBetting">
        <div class="container">
            <img class="dropdown" @click="back" src="@/assets/img/common/dropdown.png" alt="">
            <p class="titleName fb fs_20 flex flex_aic mt_14">{{ typeData[parameter.type].title }}<span>{{ typeData[parameter.type].player }}</span></p>
            <p class="oddrDesc fs_14 mt_10" v-for="(item, index) in typeData[parameter.type].descList" :key="index">{{ item.desc }}</p>
            <ul v-if="parameter.type == 'banker'" class="inputGroup flex flex_jcbt mt_16 mb_16">
                <div class="item flex flex_jcbt flex_aic">
                    <span class="fs_16 ml_8">胜</span>
                    <div class="flex1" @click="closeCursor('win')">
                        <CursorWrap ref="win" placeholder="0" :inputNumber="winValue"  />
                    </div>
                </div>
                 <div class="item flex flex_jcbt flex_aic">
                    <span class="fs_16 ml_8">平</span>
                    <div class="flex1" @click="closeCursor('flat')">
                        <CursorWrap ref="flat" placeholder="0" :inputNumber="flatValue"  />
                    </div>
                </div>
                 <div class="item flex flex_jcbt flex_aic">
                    <span class="fs_16 ml_8">负</span>
                    <div class="flex1" @click="closeCursor('negative')">
                        <CursorWrap ref="negative" placeholder="0" :inputNumber="negativeValue"  />
                    </div>
                </div>
            </ul>
            <p class="oddrDesc fs_14 mt_10" v-if="parameter.type == 'bets'">最大可投注：{{ ANTNumber }}</p>
            <p class="oddrDesc fs_14 mt_24" v-if="parameter.type == 'bets'">预计收入：<span>{{ harvest }} ANT</span></p>
            <ul class="inputGroupNumber flex flex_jcbt mt_10 mb_10">
                <div class="inputNum flex flex_aic" @click="closeCursor('inputNum')">
                    <CursorWrap ref="inputNum" placeholder="请输入备用金" :inputNumber="inputNumValue" class="textLeft" :left="true" />
                    <span class="fs_16">ATN</span>
                </div>
                <div class="submitBtn color_ff fs_16 fb" @click="sureSubmit(parameter.type)">确认</div>
            </ul>
            <p class="tips" v-show="tipsFlag">{{ tipsText }}</p>
            <div class="vanNumberKeyboard">
                <van-number-keyboard
                    :show="show"
                    extra-key="."
                    @input="onInput"
                    @delete="onDelete"
                />
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'InputBetting',
    data(){
        return {
            show: true,
            allNumber: 1000,
            inputType: '',
            winValue: '',
            flatValue: '',
            negativeValue: '',
            inputNumValue: '',
            tipsFlag: false,
            harvest: 0,
            odds: 1,
            tipsText: '您输入的赔率范围应为1~1000',
            typeData: {
                'bets': {
                    title: '你好我好国家队',
                    descList: [
                        { desc: '你好我好VS好好学习' }
                    ]
                },
                'banker': {
                    title: '你好我好VS好好学习',
                    player: '欧盘胜平负',
                    descList: [
                        { desc: '参考赔率：主@1.62，平@1.4，客@1.53' }
                    ]
                }
            }
        }
    },
    mounted(){
        console.log(this.parameter)
        this.initialization();
    },
    props: ['parameter','ANTNumber'],
    methods: {
        back(){
            this.$emit("closeInputBetting");
        },
        initialization(){
            var { master_consult, flat_consult, slave_consult, name } = this.parameter.information.gamesPlay[this.parameter.playerIndex];
            this.typeData[this.parameter.type].player = name;

            if(this.parameter.type == 'banker'){
                this.typeData[this.parameter.type].title = this.parameter.information.master_count + "vs" + this.parameter.information.slave_count;
                this.typeData[this.parameter.type].descList[0].desc = `参考赔率：主@${master_consult}，平@${flat_consult}，客@${slave_consult}`;
            }else if(this.parameter.type == 'bets'){
                var { bet_to } = this.parameter;
                if(bet_to == 0){
                    this.odds = this.parameter.roomInfo.master_consult
                    this.typeData[this.parameter.type].title = this.parameter.information.master_count + "@" + this.odds;
                }else if(bet_to == 1){
                    this.odds = this.parameter.roomInfo.master_consult
                    this.typeData[this.parameter.type].title = "平局@" + this.odds;
                }else if(bet_to == 2){
                    this.odds = this.parameter.roomInfo.slave_consult
                    this.typeData[this.parameter.type].title = this.parameter.information.slave_count + "@" + this.odds;
                }
                this.typeData[this.parameter.type].descList[0].desc = this.parameter.information.master_count + "vs" + this.parameter.information.slave_count;
            }
        },
        closeCursor(type){
            this.inputType = type;
            switch (type) {
                case 'win':
                    this.$refs.flat && this.$refs.flat.clearTimer();
                    this.$refs.negative && this.$refs.negative.clearTimer();
                    this.$refs.inputNum && this.$refs.inputNum.clearTimer();
                    break;
                case 'flat':
                    this.$refs.win && this.$refs.win.clearTimer();
                    this.$refs.negative && this.$refs.negative.clearTimer();
                    this.$refs.inputNum && this.$refs.inputNum.clearTimer();
                    break;
                case 'negative':
                    this.$refs.win && this.$refs.win.clearTimer();
                    this.$refs.flat && this.$refs.flat.clearTimer();
                    this.$refs.inputNum && this.$refs.inputNum.clearTimer();
                    break;
                case 'inputNum':
                    this.$refs.win && this.$refs.win.clearTimer();
                    this.$refs.flat && this.$refs.flat.clearTimer();
                    this.$refs.negative && this.$refs.negative.clearTimer();
                    break;
                default:
                    break;
            }
        },
        onInput(data){
            switch (this.inputType) {
                case 'win':
                    this.winValue = this.winValue + data
                    break;
                case 'flat':
                    this.flatValue = this.flatValue + data
                    break;
                case 'negative':
                    this.negativeValue = this.negativeValue + data
                    break;
                case 'inputNum':
                    this.inputNumValue = this.inputNumValue + data;
                    this.harvest = this.inputNumValue * this.odds;
                    break;
                default:
                    break;
            }
            this.tipsFlag = false;
            this.tipsText = ''
        },
        onDelete(){
            switch (this.inputType) {
                case 'win':
                    this.winValue = this.winValue.substring(0, this.winValue.length - 1);
                    break;
                case 'flat':
                    this.flatValue = this.flatValue.substring(0, this.flatValue.length - 1);
                    break;
                case 'negative':
                    this.negativeValue = this.negativeValue.substring(0, this.negativeValue.length - 1);
                    break;
                case 'inputNum':
                    this.inputNumValue = this.inputNumValue.substring(0, this.inputNumValue.length - 1);
                    break;
                default:
                    break;
            }
        },
        numberTesting(data){
            var reg = /^[0-9]+\.?[0-9]*$/;
            if(reg.test(data)){
                return true
            }else{
                return false
            }
        },
        sureSubmit(flag){
            this.$refs.win && this.$refs.win.clearTimer();
            this.$refs.flat && this.$refs.flat.clearTimer();
            this.$refs.negative && this.$refs.negative.clearTimer();
            this.$refs.inputNum && this.$refs.inputNum.clearTimer();
            if(flag == 'banker'){
                if( (parseFloat(this.winValue) < 1 || parseFloat(this.winValue) > 1000) || this.winValue == ''){  
                    this.tipsFlag = true;
                    this.tipsText = '您输入的赔率范围应为1~1000之间'
                    return false
                }
                if( (parseFloat(this.flatValue) < 1 || parseFloat(this.flatValue) > 1000)  || this.flatValue == ''){
                    this.tipsFlag = true;
                    this.tipsText = '您输入的赔率范围应为1~1000之间'
                    return false
                }
                if( (parseFloat(this.negativeValue) < 1 || parseFloat(this.negativeValue) > 1000)  || this.negativeValue == ''){ 
                    this.tipsFlag = true;
                    this.tipsText = '您输入的赔率范围应为1~1000之间'
                    return false
                }
            }
            if(flag == 'bets'){
                if(parseFloat(this.inputNumValue) >= parseFloat(this.ANTNumber)){
                    this.tipsFlag = true;
                    this.tipsText = '已超出最大的投注类型!'
                    return false
                }
            }
            if(this.inputNumValue[0] == 0 && this.inputNumValue[1] == 0){
                this.tipsFlag = true;
                this.tipsText = '请输入正确的数量值'
                return false;
            }
            if(this.numberTesting(this.inputNumValue)){
                var obj = {}
                if(flag == 'banker'){
                    obj = {
                        win: this.winValue,
                        flat: this.flatValue,
                        negative: this.negativeValue,
                        inputNum: this.inputNumValue
                    } 
                }else if(flag == 'bets'){
                    obj = {
                        inputNum: this.inputNumValue,
                        banker_disc_id: this.parameter.banker_disc_id,
                        bet_to: this.parameter.bet_to
                    }
                }
                this.$emit('confirmation', flag, obj)
            }else{
                this.tipsFlag = true;
                this.tipsText = '请输入正确的数量值'
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .inputBetting{
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        background: #fff;
        color: #000;
        border-radius:10px 10px 0px 0px;
        font-family: 'PingFangSC-Semibold', 'PingFang SC';
        .container{
            padding: 0 16px;
            .dropdown{
                display: block;
                margin: 15px auto 0;
                width: 29px;
                height: 9px;
            }
            .titleName{
                color:rgba(41,50,60,1);
                span{
                    margin-left: 8px;
                    padding: 0 8px;
                    height: 22px;
                    text-align: center;
                    line-height: 22px;
                    background:rgba(255,144,0,1);
                    border-radius: 11px;
                    font-size: 11px;
                    color:rgba(255,255,255,1);
                    font-weight: 400;
                }
            }
            .oddrDesc{
                color:rgba(41,50,60,.39);
                span{
                    color:rgba(41,50,60,1);
                }
            }
            .tips{
                font-size:14px;
                color:rgba(255,64,25,1);
                line-height:20px;
                text-align: center;
            }
            .inputGroup{
                width: 100%;
                span{
                    color:rgba(41,50,60,.4);
                }
                .item{
                    width: 112px;
                    height: 48px;
                    background:rgba(245,245,245,1);
                    border-radius: 5px;
                }
            }
            .inputGroupNumber{
                .inputNum{
                    padding-left: 6px;
                    width: 239px;
                    height: 48px;
                    background:rgba(245,245,245,1);
                    border-radius: 5px;
                    span{
                        color:rgba(41,50,60,.4);
                        padding: 0 12px 0 4px;
                    }
                }
                .submitBtn{
                    width: 100px;
                    height: 48px;
                    background:rgba(5,182,207,1);
                    border-radius: 5px;
                    line-height: 48px;
                    text-align: center;
                }
            }
            .vanNumberKeyboard{
                width: 100%;
                height: 223px;
            }
        }
        
    }
</style>