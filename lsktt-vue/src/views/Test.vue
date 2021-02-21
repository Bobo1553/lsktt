<template>
    <div>
        {{ obj.output }}
        <span class="easy-typed-cursor">|</span>
    </div>
</template>
<script>
    import EasyTyper from 'easy-typer-js'

    export default {
        name: 'home',
        data() {
            return {
                obj: {
                    output: '',
                    isEnd: false,
                    speed: 80,
                    singleBack: false,
                    sleep: 0,
                    type: 'normal',
                    backSpeed: 40,
                    sentencePause: false
                }
            }
        },
        mounted() {
            new EasyTyper(this.obj, "Aaaaaaaaaaaaaaaaaaaaaa")
        }
    }
</script>