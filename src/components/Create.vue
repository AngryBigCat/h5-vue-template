<template>
  <div class="Create">
    <div class="top">
      <div class="title">
        <input type="text" placeholder="请输入说明页主标题（20字以内）" maxlength="20" v-model="wiki.title">
      </div>
      <div class="desc">
        <textarea placeholder="请输入说明页简介（140字以内）" maxlength="140" v-model="wiki.intro"></textarea>
      </div>
      <div class="img">
        <div class="item" v-for="v,k in wiki.banners" :key="k">
          <div class="imgb">
            <img :src="v.src" :alt="v.desc">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入图片描述" maxlength="20" v-model="v.desc" />
          </div>
          <div class="icon">
            <i class="icon-img"></i>
            <i class="icon-x" @click="onDelBannerItem(k)"></i>
          </div>
        </div>
        <div class="item-add" v-if="wiki.banners.length < 3">
          <i class="icon-plus"></i>
          <div>
            <label for="upload">添加图片</label>
            <input type="file" id="upload" ref="upload" accept="image/*" @change="onChangeUploadFile">
          </div>
        </div>
      </div>
      <div class="switch">
        <span>是否公开到广场</span>
        <mt-switch :value="isPublish(wiki.isPublish)" @change="onChangePublish"></mt-switch>
      </div>
      <div class="switch">
        <span>使用背景音乐</span>
        <mt-switch :value="isPublish(wiki.isMusic)" @change="onChangeUseBgMusic"></mt-switch>
      </div>
      <div class="selected-music" v-if="isPublish(wiki.isMusic) && wiki.music">
        <div>已选择：{{ wiki.music.name }}</div>
        <div>
          <i class="fa fa-play-circle" v-if="wiki.music.isPlay" @click="onPlaySingleMusic"></i>
          <i class="fa fa-pause-circle" v-else @click="onPauseMusicByName"></i>
        </div>
        <div>
          <i class="fa fa-times-circle" @click="onDelSelectedMusic"></i>
        </div>
      </div>
      <div class="music" v-if="isPublish(wiki.isMusic) && !wiki.music">
        <table cellspacing="0" >
          <thead>
            <tr>
              <th>曲名</th>
              <th>曲风</th>
              <th>试听</th>
              <!--<th>购买</th>-->
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v, k in musics" :key="k">
              <td>{{ v.name }}</td>
              <td>{{ v.att | sliceString }}</td>
              <td>
                <i class="fa fa-play-circle" v-if="v.isPlay" @click="onPlayMusicByName(v.site, k)"></i>
                <i class="fa fa-pause-circle" v-else @click="onPauseMusicByName()"></i>
              </td>
              <!--<td>￥{{ v.price }}</td>-->
              <td><button @click="onSelectBgMusic(k)">选择</button></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                <div class="page-select">
                  <div>上一页</div>
                  <div @click="onNextMusicPage">下一页</div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="bottom">
      <div class="title">词条部分</div>
      <div class="container">
        <ul>
          <li v-for="v,k in wiki.words" :key="k">
            <div class="header">
              <div class="word-title">{{ v.title }}</div>
              <div class="operate">
                <div><i class="icon-edit" @click="onWordShow(k)"></i></div>
                <div><i class="icon-up" @click="onWordSwapUp(k)"></i></div>
                <div><i class="icon-down" @click="onWordSwapDown(k)"></i></div>
                <div><i class="icon-copy" @click="onCopyWordItem(k)"></i></div>
                <div><i class="icon-del" @click="onDelWordItem(k)"></i></div>
              </div>
            </div>
            <div class="input" v-if="v.isShow">
              <div class="input-title">
                <input type="text" placeholder="请输入标题" v-model="v.title">
              </div>
              <div class="desc">
                <textarea placeholder="请输入释义" v-model="v.desc"></textarea>
              </div>
              <div class="imgs">
                <div class="img-item" v-for="vv,kk in v.imgs" :key="kk">
                  <div class="img">
                    <img :src="vv.src" :alt="vv.desc" v-if="vv.src">
                    <div class="mask" v-else>
                      <label for="upload-word">
                        <img src="/static/img/img-upload.png" alt="upload">
                      </label>
                      <input type="file" ref="uploadWord" id="upload-word" @change="onChangeUploadFileWord(k, kk, $event)">
                    </div>
                  </div>
                  <div class="img-desc">
                    <input type="text" placeholder="请填写图片描述" v-model="vv.desc">
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="add" @click="onAddWordItem" v-if="wiki.words.length < 99"><i class="icon-plus"></i> 新增词条</li>
        </ul>
      </div>
      <div class="save">
        <button @click="onSubmit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { Indicator, Toast } from 'mint-ui';
import axios from 'axios';
import 'font-awesome/scss/font-awesome.scss';

export default {
  name: "Create",
  data() {
    return {
      token: '',
      wiki: {
        title: '',
        intro: '',
        isPublish: true,
        isMusic: true,
        music: null,
        banners: [],
        words: []
      },
      musics: [],
      bgMusic: null
    }
  },
  created() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/home');
      this.$emit('onUserNotLogin');
    }
    this.token = token;
  },
  mounted() {
    this.onInitMusicList();
    if (this.$route.query.editid) {
      Indicator.open();
      this.axios.get('user/'+ this.userinfo.user_id +'/wiki/' + this.$route.query.editid).then((res) => {
        if (res.data.code == 0) {
          this.wiki = JSON.parse(res.data.wiki.wiki);
        }
        Indicator.close();
      });
    }
  },
  destroyed() {
    if (this.bgMusic) {
      this.bgMusic.pause();
    }
  },
  methods: {
    onChangeUseBgMusic() {
      this.wiki.isMusic = !this.wiki.isMusic;
    },
    onChangePublish() {
      this.wiki.isPublish = !this.wiki.isPublish;
    },
    onNextMusicPage() {
      this.onInitMusicList();
    },
    onInitMusicList() {
      Indicator.open();
      axios.get('http://youbanquan.com/xtmusic?limit=5').then((res) => {
        let musics = res.data.musics;
        musics.forEach((v) => {
          v.isPlay = true;
        });
        this.musics = musics;
        Indicator.close();
      });
    },
    onPlayMusicByName(name, k) {
      if (this.bgMusic) {
        this.musics.forEach((v) => {
          v.isPlay = true;
        });
        this.bgMusic.pause();
        let prevMusic = this.bgMusic.src.split('/');
        if (prevMusic[prevMusic.length - 1] == name) {
          if (this.bgMusic.paused) {
            this.bgMusic.play();
            this.musics[k].isPlay = false;
          } else {
            this.bgMusic.pause();
            this.musics[k].isPlay = true;
          }
          return false;
        }
      }
      this.musics[k].isPlay = false;
      this.createPlayMusic(name);
    },

    createPlayMusic(name) {
      const prefix = 'http://youbanquan.com/music/';
      this.bgMusic = new Audio();
      this.bgMusic.src = prefix + name;
      this.bgMusic.play();
      this.bgMusic.addEventListener('ended', () => {
        this.musics.forEach((v) => {
          v.isPlay = true;
        })
      }, false);
    },

    onPlaySingleMusic() {
      this.wiki.music.isPlay = false;
      this.createPlayMusic(this.wiki.music.site);
    },

    onDelSelectedMusic() {
      this.bgMusic.pause();
      this.musics.forEach((v) => {
        v.isPlay = true;
      });
      this.wiki.music = null;
    },

    onPauseMusicByName() {
      this.bgMusic.pause();
      if (this.wiki.music) {
        this.wiki.music.isPlay =  true;
      }
      this.musics.forEach((v) => {
        v.isPlay = true;
      })
    },
    onSelectBgMusic(k) {
      this.wiki.music = this.musics[k];
    },
    onChangeUploadFile() {
      let formData = new FormData();
      formData.append('file', this.$refs.upload.files[0]);
      let i = this.wiki.banners.push({
        src: '/static/img/noWord.png',
        desc: ''
      });
      this.axios.post('upload', formData).then((res) => {
        this.wiki.banners[i - 1].src = res.data;
      })
    },
    onChangeUploadFileWord(k, kk, e) {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);
      this.axios.post('upload', formData).then((res) => {
        this.wiki.words[k].imgs[kk].src = res.data
      });
    },
    onDelBannerItem(k) {
      this.wiki.banners.splice(k, 1);
    },
    onDelWordItem(k) {
      this.wiki.words.splice(k, 1);
    },
    onAddWordItem() {
      this.wiki.words.push({
        title: '',
        desc: '',
        isShow: false,
        imgs: [
          {
            src: '',
            desc: ''
          },
          {
            src: '',
            desc: ''
          },
        ]
      })
    },
    onWordSwapUp(k) {
      let words = this.wiki.words;
      if (k <= 0) return false;
      this.wiki.words.splice(k, 1, ...this.wiki.words.splice(k - 1, 1, words[k]));
    },
    onWordSwapDown(k) {
      let words = this.wiki.words;
      if (k >= words.length - 1) return false;
      this.wiki.words.splice(k, 1, ...this.wiki.words.splice(k + 1, 1, words[k]));
    },
    onWordShow(k) {
      this.wiki.words[k].isShow = !this.wiki.words[k].isShow;
    },
    onCopyWordItem(k) {
      this.wiki.words.splice(k, 0, this.wiki.words[k]);
    },
    onSubmit() {
      if (!this.wiki.title) {
        Toast('需要填写标题');
        return false;
      }
      if (!this.wiki.intro) {
        Toast('需要需要填写说明简介');
        return false;
      }
      if (!this.wiki.banners[0]) {
        Toast('需要添加一张图片');
        return false;
      }


      Indicator.open();
      let wiki_id = this.$route.query.editid;

      if (this.wiki.music) {
        this.wiki.music.isPlay = true;
      }
      if (!this.$route.query.editid) {
        this.axios({
          method: 'post',
          url: 'user/'+ this.userinfo.user_id +'/wiki',
          data: this.wiki,
          headers: {
            'Authorization': this.token
          }
        }).then((res) => {
          Indicator.close();
          Toast(res.data.msg);
          this.$router.push('/center/word');
        });
      } else {
        this.axios({
          method: 'post',
          url: 'user/'+ this.userinfo.user_id +'/wiki/' + wiki_id,
          data: qs.stringify({
            _method: 'put',
            wiki: JSON.stringify(this.wiki)
          })
        })
          .then((res) => {
            Indicator.close();
            Toast(res.data.msg);
            this.$router.push('/center/word');
          });
      }
    },
    isPublish(str) {
      if (str === 'true' || str === true) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    userinfo() {
      let token = localStorage.getItem('token');
      if (!token) return false;
      return JSON.parse(atob(token.split('.')[1]))
    }
  },
  filters: {
    sliceString(str) {
      return str.substr(0, 2);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/common.scss";

.icon-plus {
  width: 10px;
  height: 10px;
  display: inline-block;
  background: url("/static/img/plus.png") no-repeat center / 100% 100%;
}
.icon-edit {
  width: 18px;
  height:  18px;
  display: block;
  background: url("/static/img/icon-edit.png") no-repeat center / contain;
}
.icon-up {
  width: 18px;
  height:  18px;
  display: block;
  background: url("/static/img/icon-up.png") no-repeat center / contain;
}
.icon-down {
  width: 18px;
  height:  18px;
  display: block;
  background: url("/static/img/icon-down.png") no-repeat center / contain;
}
.icon-copy {
  width: 18px;
  height:  18px;
  display: block;
  background: url("/static/img/icon-copy.png") no-repeat center / contain;
}
.icon-del {
  width: 18px;
  height:  18px;
  display: block;
  background: url("/static/img/icon-del.png") no-repeat center / contain;
}
.Create {
  background: #eee;
  .top {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    .title {
      margin-bottom: 10px;
      input {
        border: 1px solid $primary-color;
        border-radius: 4px;
        width: 100%;
        outline: none;
        height: 40px;
        line-height: 40px;
        padding: 5px;
        box-sizing: border-box;
        font-size: 1rem;
      }
    }
    .desc {
      margin-bottom: 10px;
      textarea {
        border: 1px solid $primary-color;
        border-radius: 4px;
        width: 100%;
        resize: none;
        outline: none;
        height: 120px;
        padding: 5px;
        box-sizing: border-box;
        font-size: 1rem;
      }
    }
    .img {
      border-bottom: 1px solid $primary-color;
      font-size: 1rem;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        border-bottom: 1px solid $primary-color;
        padding-bottom: 5px;
        .imgb {
          padding-right: 10px;
          width: 20%;
          height: 50px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .input {
          width: 60%;
          padding-right: 10px;
          input {
            width: 100%;
            height: 30px;
            line-height: 30px;
            outline: none;
            border: none;
            font-size: 1rem;
          }
        }
        .icon {
          display: flex;
          .icon-img {
            height: 20px;
            width: 20px;
            background: url("/static/img/icon-img.png") no-repeat center / 100% 100%;
          }
          .icon-x {
            height: 20px;
            width: 20px;
            background: url("/static/img/icon-x.png") no-repeat center / 100% 100%;
            margin-left: 10px;
          }
        }
      }
      .item-add {
        height: 30px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #333;
        input {
          font-size: 1rem;
        }
        > * {
          margin-right: 5px;
          font-size: 1rem;
        }
        #upload {
          visibility: hidden;
        }
      }
    }
    .switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      color: #333;
      border-bottom: 1px solid $primary-color;
      box-sizing: border-box;
    }
    .selected-music {
      padding-top: 10px;
      display: flex;
      align-items: center;
      color: #666;
      > div {
        margin-right: 20px;
      }
    }
    .music {
      padding-top: 10px;
      table {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 12px;
        td {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        tr {
          height: 30px;
        }
        thead {
          background: #ddd;
        }
        tbody {
          tr {
            &:nth-of-type(odd) {
              background: #eee;
            }
            &:nth-of-type(even) {
              background: #fff;
            }
            td:first-of-type {
              padding-left: 10px;
            }
            td:nth-of-type(3), td:nth-of-type(2) {
              text-align: center;
            }
            td:last-of-type {
              text-align: center;
              button {
                padding: 3px;
                background: #ccc;
                border: none;
                border-radius: 4px;
                outline: none;
              }
            }
          }
        }
        tfoot {
          background: #ddd;
          td {
            .page-select {
              display: flex;
              justify-content: space-around;
            }
          }
        }
      }
    }
  }
  .bottom {
    color: #333;
    background: white;
    padding: 0 10px 30px;
    .title {
      border-bottom: 1px solid $primary-color;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
    }
    .container {
      padding-top: 10px;
      margin-bottom: 20px;
      ul {
        list-style-type: none;
        li {
          margin-bottom: 10px;
          .header {
            display: flex;
            justify-content: space-between;
            height: 30px;
            border: 1px solid $primary-color;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 5px 10px;
            .word-title {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .operate {
              display: flex;
              div {
                margin-left: 20px;
              }
            }
          }
          .input {
            border: 1px solid $primary-color;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top: none;
            width: 96%;
            margin: 0 auto;
            padding: 10px;
            box-sizing: border-box;
            .input-title {
              border-bottom: 1px solid $primary-color;
              margin-bottom: 10px;
              input {
                outline: none;
                height: 30px;
                line-height: 30px;
                width: 100%;
                border: none;
              }
            }
            .desc {
              border-bottom: 1px solid $primary-color;
              margin-bottom: 10px;
              textarea {
                outline: none;
                height: 80px;
                width: 100%;
                border: none;
                resize: none;
              }
            }
            .imgs {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              .img-item {
                width: 50%;
                box-sizing: border-box;
                padding: 10px;
                .img {
                  height: 100px;
                  margin-bottom: 5px;
                  .mask {
                    height: 100%;
                    label {
                      display: flex;
                      height: 100%;
                      width: 100%;
                      background: #eee;
                      justify-content: center;
                      align-items: center;
                      img {
                        height: 20px;
                        width: 25px;
                      }
                    }
                    #upload-word {
                      visibility: hidden;
                    }
                  }
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .img-desc {
                  input {
                    width: 100%;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid $primary-color;
                    height: 20px;
                    line-height: 20px;
                  }
                }
              }
            }
          }
        }
        .add {
          border: 1px solid $primary-color;
          border-radius: 4px;
          box-sizing: border-box;
          padding: 5px 10px;
        }
      }
    }
    .save {
      text-align: center;
      button {
        box-sizing: border-box;
        background: $primary-color;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 0;
        outline: none;
        width: 100%;
        font-size: 1rem;
      }
    }
  }
}
</style>
