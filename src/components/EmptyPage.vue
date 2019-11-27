<template>
    <div class="defaultPage">
        <img src="@/assets/img/common/empty.png" alt="">
        <p>暂无数据</p>
    </div>
</template>

<script>
export default {
    name: 'EmptyPage'    
}
</script>

<style lang="less" scoped>
    .defaultPage{
        width: 100%;
        padding: 30px 0 8px;
    }
    .paddingT{
        padding-top: 100px;
    }
    .defaultPage img{
        margin: 0 auto 8px;
        display: block;
        width: 80px;
        height: 80px;
    }
    .defaultPage p{
        font-size: 14px;
        font-weight: 400;
        color:rgba(255,255,255,0.6);
        text-align: center;
    }
</style>