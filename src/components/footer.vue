<template>
    <div class="footer">
        <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2023004991号-1</a>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
    .footer{
        width:100%;
        height:50px;
        text-align:center;
        display:flex;
        justify-content:center;
        align-items:center;
        border-top: 1px solid #EBEDF0;
        border-bottom: 1px solid #EBEDF0;
        box-shadow: 0 0 2px #EBEDF0;
        background-color:#ffffff;
        >a{
            display:block;
            text-decoration: none;
            color:#222832;
        }

    }
    @media screen and (max-width:768px) {
        .footer{
            font-size:14px;
        }
    }
</style>