<template>
  <div class="content">
    <div class="return" @click="onRedirectHome"></div>
    <iframe src="http://hrf.prh5.com" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
    }
  },
  mounted() {
    this.$emit('closeMusic');
  },
  methods: {
    onRedirectHome() {
      const scrollTop = this.$route.query.scrollTop
      if (this.$route.query.scrollTop) {
        this.$router.push({path: "/", query: { scrollTop }});
      } else {
        this.$router.push('/');
      }
      this.$emit('startMusic')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/common";
.content {
  @include img('/static/img/bg.png');
  .return {
    @include img("/static/img/return.png", 18.67%, 3.66%, 5%, 2%, center, contain);
  }
}
</style>
