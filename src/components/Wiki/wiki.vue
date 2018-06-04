<template>
  <div class="Wiki">
    <div class="container">
      <mt-header :title="words.title"></mt-header>
      <div class="banner">
        <mt-swipe>
          <mt-swipe-item v-for="v, k in words.banners" :key="k">
            <img :src="v.src" :alt="v.desc">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content">
        <div class="intro">{{ words.intro }}</div>
        <div class="words">
          <div class="item" v-for="v,k in words.wordItems" :key="k">
            <div class="header" @click="onShowWord(k)">
              <span>{{ v.title }}</span>
              <div class="reduce" :class="{ increase: v.isShow }"></div>
            </div>
            <div class="main" v-if="v.isShow">
              <div class="desc">{{ v.desc }}</div>
              <ul class="imgs">
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
export default {
  name: "Wiki",
  data() {
    return {
      words: {
        title: '这里是自定义标题',
        intro: '这里是一段简介 这里是一段简介',
        banners: [
          {
            src: '/static/img/noWord.png',
            desc: '这里是banner图片介绍'
          },
          {
            src: '/static/img/noWord.png',
            desc: '这里是banner图片介绍'
          }
        ],
        wordItems: [
          {
            title: '这里是子词条标题',
            desc: '这里是子词条描述 这里是子词条描述 这里是子词条描述',
            isShow: false,
            imgs: [
              {
                src: '/static/img/noWord.png',
                desc: '这里是自词条描述驱蚊器翁请问请问王企鹅去问问'
              },
              {
                src: '/static/img/noWord.png',
                desc: '这里是自词条描述'
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    showShareTipMask() {
      this.$refs.shareContainer.style.display = 'block';
      this.$refs.shareContainer.style.top = window.scrollY + 'px';
    },
    onCloseShareContainer() {
      this.$refs.shareContainer.style.display = 'none';
    },
    onShowWord(k) {
      this.words.wordItems[k].isShow = !this.words.wordItems[k].isShow;
    },
    onRedirectToCreate() {
      this.$router.push('/create');
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
    background: rgba(0,0,0, .5);
    display: none;
    text-align: center;
    box-sizing: border-box;
    padding-top: 30px;
    img {
      width: 80%;
      padding-left: 30px;
    }
  }
  .container {
    height: 100px;
    .banner {
      height: 56.25vw;
      background: yellow;
    }
    .content {
      padding: 20px 10px;
      .intro {
        min-height: 150px;
        background: url("/static/img/bg-intro.png") no-repeat center / 100% 100%;
        box-sizing: border-box;
        padding: 10px 15px;
        margin-bottom: 10px;
        text-align: justify;
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
            padding: 10px;
            box-sizing: border-box;
            width: 96%;
            margin: 0 auto;
            .desc {
              margin-bottom: 10px;
              text-align: justify;
            }
            .imgs {
              display: flex;
              list-style-type: none;
              margin: 0;
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
                    height: 100%;
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
