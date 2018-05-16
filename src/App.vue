<template>
  <div id="app">
    <Preload/>
    <router-view/>
  </div>
</template>

<script>
import Preload from './components/Preload';
export default {
  name: 'App',
  methods: {

  },
  components: {
    Preload
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
