<template>
    <div id="app" style="height: 100%">
        <el-container style="height: 100%;" direction="ver">
            <el-header class="el-header" style="height: 10%">
                <Header/>
            </el-header>
            <el-main class="el-main" :style="node">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Header from "./components/Header";

    export default {
        name: "App",
        components: {Header},
        data() {
            return {
                node: {
                    backgroundImage: "url(" + require("./assets/background.gif") + ")",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                },
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }

    .el-header {
        background-color: #000000;
    }

    .el-main {
        background-color: #E1E3C5;
        padding: 0;
        margin: 0;
    }
</style>