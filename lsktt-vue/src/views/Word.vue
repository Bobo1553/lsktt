<template>
    <div class="letter-style">
        <div class="letter-receiver">To 小可爱：</div>
        <el-col class="el-col" type="flex">{{ obj.output }}</el-col>
        <div class="letter-sender">From 大猪蹄</div>
    </div>
</template>

<script>
    import EasyTyper from 'easy-typer-js'

    export default {
        name: "Word",
        data() {
            return {
                obj: {
                    output: '',
                    isEnd: false,
                    speed: 80,
                    singleBack: false,
                    sleep: 0,
                    type: 'custom',
                    backSpeed: 40,
                    sentencePause: false
                }
            }
        }, mounted() {
            let content = '';
            new EasyTyper(this.obj, content);
        }
    }
</script>

<style scoped>
    .letter-style {
        height: 100%;
    }

    .letter-receiver {
        font-size: 230%;
    }

    .el-col {
        max-width: 900px;
        position: fixed;
        left: 5%;
        top: 23%;
        font-size: x-large;
    }

    .letter-sender {
        font-size: 230%;
        position: fixed;
        right: 30%;
        bottom: 5%;
    }
</style>