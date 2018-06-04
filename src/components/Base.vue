<template>
  <div class="Base">
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="立即创作">
        <img slot="icon" src="/static/img/icon1.png" @click="onNavToPage('/create')">
        立即创作
      </mt-tab-item>
      <mt-tab-item id="美论广场">
        <img slot="icon" src="/static/img/icon2.png" @click="onNavToPage('/home')">
          美论广场
      </mt-tab-item>
      <mt-tab-item id="我的中心">
        <img slot="icon" src="/static/img/icon3.png" @click="onNavToPage('/center')">
        我的中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Base",
  data() {
    return {
      selected: true
    }
  },
  methods: {
    onNavToPage(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.Base {
  padding-bottom: 55px;
}
</style>
