<template>
  <div class="home">
    <div class="long-img">
      这是一个长图
      <div>这是触发点1</div>
      <div>这是触发点2</div>
      <div>这是触发点3</div>
      <div>这是触发点4</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      progress: 1
    }
  },
  methods: {
    getIptionde() {

    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  height: 100%;
  overflow: scroll;
  .long-img {
    background: yellow;
    height: 200vh;
  }
}
</style>
