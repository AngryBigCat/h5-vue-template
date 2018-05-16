<template>
    <div class="preload" v-show="preloadShow">
      <div class="progress">加载中...<span>{{ progress }}</span>%</div>
    </div>
</template>

<script>
export default {
  name: "Preload",
  data () {
    return {
      progress: 1,
      preloadShow: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.preloadShow = false;
    }, 3000)
  }
}
</script>

<style scoped lang="scss">
  .preload {
    position: absolute;
    width: 100%;
    height: 100%;
    background: green;
    display: flex;
    justify-content: center;
    align-items: center;
    .progress {
      color: white;
    }
  }
</style>
