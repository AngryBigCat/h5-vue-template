<template>
  <div class="CenterIndex">
    <router-view @onUserNotLogin="onUserNotLogin"></router-view>
  </div>
</template>

<script>
export default {
  name: "CenterIndex",
  methods: {
    onUserNotLogin() {
      this.$emit('onUserNotLogin');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
