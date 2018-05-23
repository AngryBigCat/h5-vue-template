<template>
  <div class="article-r">
    <div class="return" @click="onRedirectToJshrb"></div>
    <div class="container">
      <div class="lcloud"></div>
      <div class="rcloud"></div>
      <div class="circle">
        <img :src="titleImgUrl" alt="title">
      </div>
      <div class="article" ref="article">
        <div class="art" v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      article: {
        content: ''
      }
    }
  },
  mounted() {
    this.onInit();
  },
  methods: {
    onInit() {
      const id = this.$route.params.id;
      this.$axios.get('article/' + id).then((res) => {
        this.article = res.data;
      });
    },
    onRedirectToJshrb() {
      this.$router.go(-1);
    }
  },
  computed: {
    titleImgUrl() {
      return '/static/img/title/' + this.$route.params.name + '.png';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/common";
.article-r {
  @include img('/static/img/bg.png');
  .return {
    @include img("/static/img/return.png", 18.67%, 3.66%, 5%, 2%, center, contain);
  }
  .container {
    @include img("/static/img/container.png", 89.7%, 89.45%, center, 8%);
    .lcloud {
      @include img("/static/img/lcloud.png", 23.39%, 5.24%, 8%, 5%, center, contain);
      animation: float 4s linear infinite alternate;
    }
    .rcloud {
      @include img("/static/img/rcloud.png", 12.61%, 3.86%, 78%, 12%, center, contain);
      animation: float 3s linear 1s infinite alternate;
    }
    .circle {
      @include img("/static/img/circle.png", 55.88%, 13.24%, center, 5%, center, contain);
      img {
        position: absolute;
        bottom: 20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 60%;
      }
    }
    .article {
      position: absolute;
      top: 20%;
      left: 0;right: 0;
      height: 75%;
      width: 90%;
      margin: 0 auto;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
