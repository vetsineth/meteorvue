<template>
  <div class="app-menu">
      <el-container>
          
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">
              <router-link :to="{name :'home'}" exact>Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{name :'product'}">Product</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="{name :'student'}">Student</router-link>
            </el-menu-item>
          </el-menu>
      </el-container>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.app-menu {
  margin: 32px 0;
  text-align: center;
}
.app-menu a {
  display: inline-block;
  padding: 6px;
  margin: 0 6px;
  border-radius: 3px;
  text-decoration: none;
}
.app-menu a.v-link-active {
  background: #40b883;
  color: white;
}
</style>
