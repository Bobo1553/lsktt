<template>
  <div id="app" style="height: 100%">
    <el-container style="height: 100%;">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="210px">
          left
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "App"
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

</style>