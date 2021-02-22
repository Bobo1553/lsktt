<template>
    <div class="el-row">
        <el-row class="el-row" type="flex" justify="center" align="middle">
            <el-col :span="6" class="title-style">
                <span>我们要在一起很久很久！</span>
            </el-col>
            <el-col :span="8">
                <el-link v-if="menuIndex === 1" style="color: aqua" type="primary">主页</el-link>
                <el-link v-if="menuIndex !== 1" style="color: white" type="primary" @click="routerPage(1, '/')">主页
                </el-link>
                <el-divider direction="vertical"/>
                <el-link v-show="menuIndex === 2" style="color: aqua" type="primary">想对你说的话</el-link>
                <el-link v-if="menuIndex !== 2" style="color: white" type="primary" @click="routerPage(2, '/word')">
                    想对你说的话
                </el-link>
                <el-divider direction="vertical"/>
                <el-link v-if="menuIndex === 3" style="color: aqua" type="primary">小记录</el-link>
                <el-link v-if="menuIndex !== 3" style="color: white" type="primary" @click="routerPage(3, '/record')">
                    小记录
                </el-link>
                <el-divider direction="vertical"/>
<!--                <el-link type="primary" style="color: white" href="/test">敬请期待</el-link>-->
                <el-link type="primary" style="color: white" @click="waitForDevelopment">敬请期待</el-link>
            </el-col>
            <el-col :span="4"/>
            <el-col :span="1" justify="center">
                <div>
                    <el-avatar :src="boxerManAvatar"/>
                </div>
                <div>大猪蹄</div>
            </el-col>
            <el-col :span="1" class="el-col">
                <el-image :src="loveIcon"/>
            </el-col>
            <el-col :span="1">
                <div>
                    <el-avatar :src="lskttAvatar"/>
                </div>
                <div>小可爱</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "header",
        data() {
            return {
                lskttAvatar: require("../assets/lskttAvatar.jpg"),
                boxerManAvatar: require("../assets/boxerManAvatar.jpg"),
                loveIcon: require("../assets/loveIcon.png"), activeIndex: '1',
                menuIndex: 1
            };
        },
        methods: {
            routerPage: function (selectIndex, routerLink) {
                this.menuIndex = selectIndex;
                this.$router.push(routerLink);
            },
            waitForDevelopment() {
                this.$alert('我在很努力地开发啦！【委屈屈】', '敬请期待！', {
                    confirmButtonText: '确定',
                });
            }
        },
    }
</script>

<style scoped>
    .el-row {
        height: 100%;
        color: white;
    }

    .title-style {
        font-size: 200%;
    }

    .el-col {
        /*margin: 0 auto;*/
        text-align: center;
        /*background-color: aquamarine;*/
    }
</style>