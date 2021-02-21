<template>
    <div>
        <transition name="fade">
            <el-image v-if="showIndex > 0" class="boxerMan-image" :src="boxerMan" fit="contain"/>
        </transition>
        <transition name="fade">
            <el-image v-if="showIndex > 1" class="lsktt1-image" :src="lsktt1" fit="contain"/>
        </transition>
        <transition name="fade">
            <el-image v-if="showIndex > 2" class="lsktt2-image" :src="lsktt2" fit="contain"/>
        </transition>
        <transition name="fade">
            <el-image v-if="showIndex > 3" class="couple1-image" :src="couple1" fit="contain"/>
        </transition>
        <transition name="fade">
            <el-image v-if="showIndex > 4" class="couple2-image" :src="couple2" fit="contain"/>
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
    </div>
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

                boxerMan: require('../assets/boxerMan.png'),
                lsktt1: require('../assets/lsktt-1.png'),
                lsktt2: require('../assets/lsktt-2.png'),
                couple1: require('../assets/couple-1.png'),
                couple2: require('../assets/couple-2.png'),

                showIndex: 0,
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
            this.showIndex += 1;
            // 定时刷新时间
            this.timer = setInterval(() => {
                this.dealWithTime(new Date()) // 修改数据date
            }, 500);
            this.timer = setInterval(()=> {
                this.showIndex += 1
            }, 2000)
        },
        destroyed() {
            if (this.timer) {  // 注意在vue实例销毁前，清除我们的定时器
                clearInterval(this.timer);
            }
        },
    }
</script>

<style scoped type="text/css">
    .el-row {
        height: 100%;
        position: fixed;
        top: 80%;
        left: 18%;
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

    .boxerMan-image {
        height: 430px;
        width: 430px;
        position: fixed;
        top: 10%;
        left: 1%;
    }

    .lsktt1-image {
        height: 365px;
        width: 365px;
        position: fixed;
        top: 6%;
        left: 23.5%;

    }
    .lsktt2-image {
        height: 430px;
        width: 430px;
        position: fixed;
        left: 13%;
        top: 25%;

    }
    .couple1-image {
        height: 450px;
        width: 450px;
        position: fixed;
        left: 40%;
        top: 13%;

    }
    .couple2-image {
        height: 280px;
        width: 280px;
        position: fixed;
        left: 32%;
        top:38%;

    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>