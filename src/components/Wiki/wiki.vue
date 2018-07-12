<template>
  <div class="Wiki" ref="root">
    <div class="container">
      <div class="music-icon music-icon-x" ref="musicIcon" v-if="wiki.music" @click="onToggleMusic"></div>
      <mt-header :title="wiki.title"></mt-header>
      <div class="banner">
        <mt-swipe>
          <mt-swipe-item v-for="v, k in wiki.banners" :key="k">
            <img :src="v.src" width="100%" height="100%" :alt="v.desc">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content">
        <div class="intro">
          <div class="header"></div>
          <div class="main">{{ wiki.intro }}</div>
          <div class="footer"></div>
        </div>
        <div class="words">
          <div class="item" v-for="v, k in wiki.words" :key="k">
            <div class="header" @click="onShowWord(k)">
              <span>{{ v.title }}</span>
              <div class="reduce" :class="{ increase: v.isShow }"></div>
            </div>
            <div class="main" v-if="v.isShow">
              <div class="desc">{{ v.desc }}</div>
              <ul class="imgs" v-if="v.imgs[0].src != ''">
                <li v-for="vv,kk in v.imgs" :key="kk">
                  <div class="img">
                    <img :src="vv.src" :alt="vv.desc">
                    <span class="img-desc">{{ vv.desc }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="qr">
          <img class="qr-img" src="/static/img/qr-index.png" alt="qr-index">
          <img class="qr-btn" @click="showShareTipMask" src="/static/img/btn-share.png" alt="btn-share">
        </div>
        <div class="create">
          <img src="/static/img/btn-create.png" @click="onRedirectToCreate" alt="btn-create">
        </div>
      </div>
    </div>
    <div class="share-container" ref="shareContainer" @click="onCloseShareContainer">
      <img src="/static/img/share.png" alt="share">
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs';
import { Indicator } from 'mint-ui';

export default {
  name: "Wiki",
  data() {
    return {
      wiki: {
        title: '',
        intro: '',
        banners: [],
        words: [],
        music: null
      },
      bgMusic: null
    }
  },
  mounted() {
    Indicator.open();
    const id = this.$route.params.id;
    this.axios.get('wiki/' + id)
      .then((res) => {
        this.wiki = JSON.parse(res.data.wiki.wiki);
        if (this.wiki.isMusic && this.wiki.music) {
          this.bgMusic = new Audio();
          this.bgMusic.preload = true;
          this.bgMusic.src = 'http://youbanquan.com/music/' + this.wiki.music.site;
          this.autoPlayMusic();
        }
        Indicator.close();
      });
  },
  destroyed() {
    if (this.bgMusic) {
      this.bgMusic.pause();
    }
  },
  methods: {
    onToggleMusic() {
      if (this.bgMusic.paused) {
        this.bgMusic.play();
        this.$refs.musicIcon.classList.remove('music-icon-x');
      } else {
        this.bgMusic.pause();
        this.$refs.musicIcon.classList.add('music-icon-x');
      }
    },
    autoPlayMusic() {
      let flag = true;
      this.$refs.root.addEventListener('touchstart', () => {
        if (flag) {
          this.bgMusic.play();
          this.$refs.musicIcon.classList.remove('music-icon-x');
          flag = false;
        }
      }, false)
    },
    showShareTipMask() {
      this.$refs.shareContainer.style.display = 'block';
      this.$refs.shareContainer.style.top = window.scrollY + 'px';
      this.$refs.root.addEventListener('touchmove', this.preventDefault, false);
    },
    onCloseShareContainer() {
      this.$refs.shareContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
      this.$refs.root.removeEventListener('touchmove', this.preventDefault, false)
    },
    onShowWord(k) {
      this.wiki.words[k].isShow = !this.wiki.words[k].isShow;
    },
    onRedirectToCreate() {
      this.$router.push('/create');
    },
    preventDefault(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss" scoped>
.Wiki {
  position: relative;
  .share-container {
    position: absolute;
    z-index: 2;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: rgba(0,0,0, .8);
    display: none;
    text-align: center;
    box-sizing: border-box;
    padding-top: 30px;
    img {
      width: 80%;
      padding-left: 30px;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .container {
    height: 100px;
    .music-icon {
      position: fixed;
      right: 15px;
      top: 15px;
      height: 30px;
      width: 30px;
      background: url("/static/img/music1.png") no-repeat center / 100% 100%;
      animation: rotate 10s linear infinite;
      z-index: 12;
    }
    .music-icon-x {
      background: url("/static/img/music2.png") no-repeat center / 100% 100%;
      animation: none;
    }
    .banner {
      height: 56.25vw;
      background: #eee;
    }
    .content {
      padding: 20px 10px;
      .intro {
        margin-bottom: 10px;
        .header {
          height: 22px;
          background: url("/static/img/wiki/intro-header.png") no-repeat center / 100% 100%;
        }
        .main {
          text-align: justify;
          word-break: break-all;
          padding: 0 15px;
          box-sizing: border-box;
          border-left: 1px solid #aaa;
          border-right: 1px solid #aaa;
        }
        .footer {
          height: 22px;
          background: url("/static/img/wiki/intro-footer.png") no-repeat center / 100% 100%;
        }
      }
      .words {
        margin-bottom: 30px;
        .item {
          margin-bottom: 10px;
          &:last-of-type {
            margin-bottom: 0;
          }
          .header {
            position: relative;
            z-index: 1;
            border: 1px solid #ccc;
            border-radius: 4px;
            text-align: center;
            position: relative;
            background: white;
            padding: 5px 0;
            box-shadow: 0 1px 3px #ccc;
            overflow: hidden;
            span {
              display: block;
              width: 150px;
              margin: 0 auto;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .reduce {
              position: absolute;
              top: 0;
              right: 10px;
              height: 100%;
              width: 15px;
              background: url("/static/img/increase.png") no-repeat center / contain;
            }
            .increase {
              background: url("/static/img/reduce.png") no-repeat center / contain;
            }
          }
          .main {
            position: relative;
            top: -1px;
            background: white;
            border: 1px solid #ccc;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            box-shadow: 0 1px 3px #ccc;
            padding: 20px 10px;
            box-sizing: border-box;
            width: 96%;
            margin: 0 auto;
            .desc {
              text-align: justify;
              word-break: break-all;
            }
            .imgs {
              display: flex;
              list-style-type: none;
              margin: 10px 0 0;
              padding: 0;
              li {
                width: 50%;
                box-sizing: border-box;
                &:nth-of-type(odd) {
                  padding-right: 5px;
                }
                &:nth-of-type(even) {
                  padding-left: 5px;
                }
                .img {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  img {
                    width: 100%;
                    height: 100px;
                    margin-bottom: 5px;
                    border-radius: 4px;
                  }
                  img[src=""] {
                    opacity: 0;
                  }
                  .img-desc {
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                    text-align: center;
                  }
                }
              }
            }
          }
        }
      }
      .qr {
        margin-bottom: 30px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .qr-img {
          width: 100%;
          max-width: 500px;
          margin-bottom: 10px;
        }
        .qr-btn {
          width: 100px;
        }
      }
      .create {
        text-align: center;
        img {
          width: 200px;
        }
      }
    }
  }
}
</style>
