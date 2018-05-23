<template>
  <div class="audio rotate" ref="audioIcon" @click="onToggleMusic" v-show="musicShow">
    <audio src="/static/media/bgm.mp3" ref="audio" autoplay loop></audio>
  </div>
</template>

<script>
export default {
  name: 'Aduio',
  props: {
    play: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      musicShow: true
    }
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('WeixinJSBridgeReady', () => {
        this.$refs.audio.play();
      });
    });
  },
  methods: {
    onToggleMusic(e) {
      if (this.$refs.audio.paused) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    },
    pauseMusic() {
        this.$refs.audio.pause();
        this.$refs.audioIcon.classList.remove('rotate');
    },
    playMusic() {
        this.$refs.audio.play();
        this.$refs.audioIcon.classList.add('rotate');
    }
  },
  watch: {
    play(v) {
      this.musicShow = v;
      if (v) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    }
  }
}
</script>

<style scoped lang="scss">
 @import "../assets/scss/animate";
 .audio {
   height: 30px;
   width: 30px;
   background: red;
   position: absolute;
   right: 15px;
   top: 15px;
   z-index: 9999;
   background: url("/static/img/music.png") no-repeat center / 100% 100%;
 }
</style>
