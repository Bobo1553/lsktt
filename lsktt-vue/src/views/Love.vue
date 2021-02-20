<template>
    <el-row class="mtime" type="flex" justify="center" align="middle" :style="node">
        <div>
            {{nowDay}}天{{nowHour}}小时{{nowMinute}}分{{nowSecond}}秒
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "Love",
        data() {
            return {
                start_day: new Date('2020-11-15 00:00:00'),
                nowDay: "",    // 当前日期
                nowHour: "",    // 当前时间
                nowMinute: "",     // 当前星期
                nowSecond: "",
                node: {
                    backgroundImage: "url(" + require("../assets/background.gif") + ")",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }
            }
        },
        methods: {
            dealWithTime(data) { // 获取当前时间
                let stayTimeGap = data.getTime() - this.start_day.getTime();
                this.nowDay = Math.floor(stayTimeGap / (3600 * 1000 * 24));
                this.nowHour = Math.floor(stayTimeGap % (3600 * 1000 * 24) / (3600 * 1000));
                this.nowMinute = Math.floor(stayTimeGap % (3600 * 1000) / (60 * 1000));
                this.nowSecond = Math.floor(stayTimeGap % (60 * 1000) / 1000);
            },
        },
        mounted() {
            // 页面加载完后显示当前时间
            this.dealWithTime(new Date());
            // 定时刷新时间
            this.timer = setInterval(() => {
                this.dealWithTime(new Date()) // 修改数据date
            }, 500)
        },
        destroyed() {
            if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
                clearInterval(this.timer);
            }
        }
    }
</script>

<style scoped type="text/css">
    .mtime {
        height: 100%;
        font-size: 200%;
    }
</style>