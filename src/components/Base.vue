<template>
  <div class="Base">
    <router-view @onUserNotLogin="onUserNotLogin"></router-view>
    <div class="tabbar">
      <div @click="onNavToPage(v.path)" v-for="v,k in navs">
        <div class="img">
          <img :src="conditionIsActive(v.path) ? v.icona : v.icon">
        </div>
        <div class="text" :class="{ active: conditionIsActive(v.path) }">{{ v.text }}</div>
      </div>
    </div>
    <Login @onUserIsLogin="onUserIsLogin" v-if="loginShow"></Login>
  </div>
</template>

<script>
import Login from './Login';
export default {
  name: "Base",
  data() {
    return {
      loginShow: false,
      navs: [
        {
          path: '/create',
          icon: '/static/img/icon1.png',
          icona: '/static/img/icon1a.png',
          text: '立即创作'
        },
        {
          path: '/home',
          icon: '/static/img/icon2.png',
          icona: '/static/img/icon2a.png',
          text: '美论广场'
        },
        {
          path: '/center',
          icon: '/static/img/icon3.png',
          icona: '/static/img/icon3a.png',
          text: '我的中心'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    onNavToPage(path) {
      if (path == '/create') {
        if (!localStorage.getItem('token')) {
          this.onUserNotLogin();
          return false;
        }
        this.$router.push('/create');
      } else {
        this.$router.push(path);
      }
    },
    onUserIsLogin() {
      this.loginShow = false;
    },
    onUserNotLogin() {
      this.loginShow = true;
    },
    conditionIsActive(path) {
      return this.$route.path.indexOf(path) > -1;
    }
  },
  components: {
    Login
  },
  watch: {
    '$route' (to) {
      if (/create/.test(to.path)) {
        return 'create';
      } else if (/home/.test(to.path)) {

      } else if (/center/.test(to.path)) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/common";
.Base {
  padding-bottom: 55px;
  .tabbar {
    display: flex;
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    background: #eee;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 0 6px;
    align-items: center;
    z-index: 10;
    > div {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      .img {
        height: 20px;
        width: 20px;
        margin-bottom: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        font-size: 12px;
        color: #333;
        &.active {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
