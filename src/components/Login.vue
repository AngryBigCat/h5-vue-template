<template>
  <div class="Login" ref="root">
    <div class="dialog">
      <span class="close" @click="closeLoginDialog">X</span>
      <div>
        <label>手机号：</label>
        <input type="text" placeholder="请输入手机号" v-model="phone">
      </div>
      <div class="qr">
        <label>验证码：</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button @click="onGetCode" v-if="btnCount === 0">获取验证码</button>
        <button class="count" v-else>{{ btnCount }}</button>
      </div>
      <div>
        <button class="submit" @click="onSubmitLogin">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { Toast } from 'mint-ui';
export default {
  name: "Login",
  data() {
    return {
      phone: '',
      code: '',
      btnCount: 0,
    }
  },
  mounted() {
    this.$refs.root.style.top = window.scrollY+"px";
    this.$refs.root.addEventListener('touchmove', this.preventDefault, false);
  },
  destroyed() {
    // this.$refs.root.removeEventListener('touchmove', this.preventDefault, false);
  },
  methods: {
    onGetCode() {
      if (!/^1[34578]{1}\d{9}$/.test(this.phone)) {
        Toast('请输入正确的手机号');
        return false;
      }
      this.setBtnCount();
      this.axios.post('getCode', qs.stringify({phone: this.phone})).then((res) => {
        Toast(res.data.msg);
      })
    },
    onSubmitLogin() {
      if (!/^1[34578]{1}\d{9}$/.test(this.phone)) {
        Toast('请输入正确的手机号');
        return false;
      }
      if (!/^\d{6}$/.test(this.code)) {
        Toast('请输入正确的验证码');
        return false;
      }
      this.axios.post('login', qs.stringify({
        phone: this.phone,
        code: this.code
      })).then((res) => {
        if (res.data.code == 0) {
          localStorage.setItem('token', res.data.token);
          this.$emit('onUserIsLogin');
          this.$router.push('/center');
          location.reload();
        } else {
          Toast(res.data.msg);
        }
      })
    },
    setBtnCount() {
      this.btnCount = 60;
      let timer = setInterval(() => {
        this.btnCount--;

        if (this.btnCount === 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    closeLoginDialog() {
      this.$emit('onUserIsLogin');
    },
    preventDefault(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/common";
.Login {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 11;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    width: 260px;
    background: white;
    padding: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px;
    color: #333;
    position: relative;
    .close {
      position: absolute;
      top: -30px;
      right: 0px;
      width: 20px;
      height: 20px;
      border: 2px solid #fff;
      border-radius: 50px;
      color: #fff;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0;
      }
      label {
        width: 50px;
        color: #333;
      }
      input {
        outline: none;
        border: 1px solid $primary-color;
        border-radius: 4px;
        padding: 5px;
        width: 170px;
        box-sizing: border-box;
        color: #666;
        font-size: 12px;
      }
      .submit {
        width: 100%;
        border: none;
        border-radius: 4px;
        background: $primary-color;
        padding: 5px 0;
        color: white;
        outline: none;
      }
    }
    .qr {
      input {
        width: 88px;
        margin-right: 10px;
        font-size: 12px;
      }
      button {
        background: $primary-color;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 5px;
        color: white;
        width: 70px;
        font-size: 12px;
        &.count {
          background: #ccc;
        }
      }
    }
  }
}
</style>
