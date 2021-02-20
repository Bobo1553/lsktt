<template>
    <el-container style="height: 100%;">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="15%">
                left
            </el-aside>
            <el-main class="el-main" :style="node">
                <transition name="fade">
                    <el-image v-if="show" class="el-image" :src="src" fit="contain"/>
                </transition>
                <el-row class="el-row" type="flex">
                    <div class="time-style">
                        <span class="time-label"> 第 </span>
                        <span class="time-value">{{ nowDay }}</span>
                        <span class="time-label"> 天 </span>
                        <span class="time-value">{{ nowHour }}</span>
                        <span class="time-label"> 时 </span>
                        <span class="time-value">{{ nowMinute }}</span>
                        <span class="time-label"> 分 </span>
                        <span class="time-value">{{ nowSecond }}</span>
                        <span class="time-label"> 秒 </span>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Love",
        data() {
            return {
                startDay: new Date('2020-11-15 00:00:00'),
                nowDay: "",    // 当前日期
                nowHour: "",    // 当前时间
                nowMinute: "",     // 当前星期
                nowSecond: "",

                node: {
                    backgroundImage: "url(" + require("../assets/background.gif") + ")",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                },

                src: require('../assets/lsktt.png'),

                show: false,
            }
        },
        methods: {
            dealWithTime(data) { // 获取当前时间
                let stayTimeGap = data.getTime() - this.startDay.getTime();
                this.nowDay = Math.floor(stayTimeGap / (3600 * 1000 * 24));
                this.nowHour = Math.floor(stayTimeGap % (3600 * 1000 * 24) / (3600 * 1000));
                this.nowMinute = Math.floor(stayTimeGap % (3600 * 1000) / (60 * 1000));
                this.nowSecond = Math.floor(stayTimeGap % (60 * 1000) / 1000);
            },
        },
        mounted() {
            // 页面加载完后显示当前时间
            this.dealWithTime(new Date());
            this.show = true;
            // 定时刷新时间
            this.timer = setInterval(() => {
                this.dealWithTime(new Date()) // 修改数据date
            }, 500)
        },
        destroyed() {
            if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
                clearInterval(this.timer);
            }
        },
    }
</script>

<style scoped type="text/css">
    .el-main {
        background-color: #E1E3C5;
    }

    .el-row {
        height: 100%;
        position: fixed;
        top: 80%;
        left: 25%;
    }

    .time-style {
        align-items: baseline;
        left: 200px;
    }

    .time-label {
        font-size: 200%;
    }

    .time-value {
        font-size: 500%;
    }

    .el-image {
        height: 500px;
        width: 500px;
        top: -5%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>