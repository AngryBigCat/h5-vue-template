<template>
  <div id="app">
    <Preload/>
    <Audio/>
    <router-view/>
  </div>
</template>

<script>
import Preload from './components/Preload';
import Audio from './components/Audio';
export default {
  name: 'App',
  methods: {

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
   background: red;
 }
</style>
