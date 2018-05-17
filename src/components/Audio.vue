<template>
  <div class="audio rotate" @click="onToggleMusic">
    <audio src="/static/media/bgm.mp3" ref="audio" autoplay loop></audio>
  </div>
</template>

<script>
export default {
  name: 'Aduio',
  methods: {
    onToggleMusic(e) {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        e.target.classList.add('rotate');
      } else {
        this.$refs.audio.pause();
        e.target.classList.remove('rotate');
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
