<template>
  <div id="app">
    <Preload/>
    <Audio :play="audioPlay"/>
    <router-view @closeMusic="closeMusic" @startMusic="startMusic" />
  </div>
</template>

<script>
import Preload from './components/Preload';
import Audio from './components/Audio';
export default {
  name: 'App',
  data() {
    return {
      audioPlay: true
    }
  },
  methods: {
    closeMusic() {
      this.audioPlay = false;
    },
    startMusic() {
      this.audioPlay = true;
    }
  },
  components: {
    Preload,
    Audio
  }
}
</script>

<style lang="scss">
 #app {
   height: 100%;
   width: 100%;
 }
</style>
