<template>
  <div class="Center">
    <div class="header">
      <div class="logo"></div>
    </div>
    <div class="options">
      <div class="group">
        <div class="item" @click="onNavToPage('/center/word')">
          <div class="left">
            <i class="icon-word"></i>
            <span>我的作品</span>
          </div>
          <div class="right">
            <i class="icon-right"></i>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="item">
          <div class="left">
            <i class="icon-money"></i>
            <span>赞助打赏</span>
          </div>
          <div class="right">
            <i class="icon-right"></i>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="item">
          <div class="left">
            <i class="icon-music"></i>
            <span>版权音乐</span>
          </div>
          <div class="right">
            <i class="icon-right"></i>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <i class="icon-king"></i>
            <span>高级定制</span>
          </div>
          <div class="right">
            <i class="icon-right"></i>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <i class="icon-help"></i>
            <span>帮助中心</span>
          </div>
          <div class="right">
            <i class="icon-right"></i>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="qrcode">
          <img src="/static/img/qr.png" alt="qr">
          <span>关注美论文化传播</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Center",
  methods: {
    onNavToPage(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-word {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("/static/img/icon-word.png") no-repeat center / 100% 100%;
}
.icon-money {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("/static/img/icon-money.png") no-repeat center / 100% 100%;
}
.icon-king {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("/static/img/icon-king.png") no-repeat center / 100% 100%;
}
.icon-music {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("/static/img/icon-music.png") no-repeat center / 100% 100%;
}
.icon-help {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("/static/img/icon-help.png") no-repeat center / 100% 100%;
}
.icon-right {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url("/static/img/icon-right.png") no-repeat right center / contain;
}
.Center {
  background: #eee;
  .header {
    height: 200px;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 100px;
      height: 100px;
      background: url("/static/img/logo.png") no-repeat center / 100% 100%;
    }
  }
  .options {
    .group {
      margin-bottom: 10px;
      background: white;
      .qrcode {
        padding: 20px 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
        color: #333;
        img {
          max-width: 110px;
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 20px;
        border-bottom: 2px solid #ccc;
        font-size: 14px;
        color: #333;
        &:last-of-type {
          border: none;
        }
        .left {
          display: flex;
          align-items: center;
          i {
            margin-right: 10px;
          }
        }
        .right {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
