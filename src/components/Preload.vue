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
      preloadShow: true,
      preloadCount: 1,
      preloadRes: [
        "/static/media/bgm.mp3",
        "/static/img/bg.png",
        "/static/img/bottom.png",
        "/static/img/circle.png",
        "/static/img/container.png",
        "/static/img/dec.png",
        "/static/img/lcloud.png",
        "/static/img/map.jpg",
        "/static/img/music.png",
        "/static/img/rcloud.png",
        "/static/img/return.png",
        "/static/img/tip.gif",
        "/static/img/title/hrf.png",
        "/static/img/title/hrgy.png",
        "/static/img/title/jfjx.png",
        "/static/img/title/jshrgy.png",
        "/static/img/title/sgjy.png",
        "/static/img/title/sth.png",
        "/static/img/title/yxst.png",
        "/static/img/title/zsp.png"
      ]
    }
  },
  mounted() {
    this.preloadRes.forEach((v) => {
      let res;

      if (/\.(jpg|jpeg|gif|png)$/.test(v)) {
        // console.log(v)
        res = new Image();
        res.src = v;
        res.addEventListener('load', () => {
          this.preloadProgress();
        });
      } else if (/\.mp3$/.test(v)) {
        res = new Audio();
        res.src = v;
        res.preload = 'auto';
        res.load();
        this.preloadProgress();
      }

    });
  },
  methods: {
    preloadProgress() {
      this.preloadCount++;
      this.progress = parseInt(this.preloadCount / this.preloadRes.length * 100);
      if (this.preloadCount >= this.preloadRes.length) {
        setTimeout(() => {
          this.preloadShow = false;
        }, 1000);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .preload {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    .progress {
      color: white;
    }
  }
</style>
