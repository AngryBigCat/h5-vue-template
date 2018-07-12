<template>
  <div class="Home">
    <mt-header fixed title="美论广场">
      <!--
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      -->
      <!--
        <mt-button icon="more" slot="right"></mt-button>
      -->
    </mt-header>

    <div class="search">
      <div class="input">
        <div class="ipt">
          <input type="search" v-model="search">
        </div>
        <div class="btn">
          <button @click="onSearch"><i class="fa fa-search"></i></button>
        </div>
      </div>
    </div>

    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item id="1">最新发布</mt-tab-item>
      <mt-tab-item id="2">最多浏览</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="list-latest">
        <ul>
          <li v-for="(v, k) in wikis[0]" :key="k" @click="onRedirectToWiki(v.id)">
            <div class="left">
              <div class="img">
                <img :src="v.img_url" :alt="v.title">
              </div>
            </div>
            <div class="right">
              <div class="title">{{ v.title }}</div>
              <div class="desc" v-line-clamp="4">{{ v.intro }}</div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="list-most">
        <ul>
          <li v-for="(v, k) in wikis[1]" :key="k" @click="onRedirectToWiki(v.id)">
            <div class="left">
              <div class="img">
                <img :src="v.img_url" :alt="v.title">
              </div>
            </div>
            <div class="right">
              <div class="title">{{ v.title }}</div>
              <div class="desc" v-line-clamp="4">{{ v.intro }}</div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
import { Indicator } from 'mint-ui'

export default {
  name: 'Home',
  data () {
    return {
      search: '',
      msg: '',
      selected: "1",
      wikis: []
    }
  },
  mounted() {
    Indicator.open();
    this.axios.get('wiki')
      .then((res) => {
        this.wikis = res.data.wikis;
        Indicator.close();
      });
  },
  methods: {
    onRedirectToWiki(id) {
      this.$router.push('/wiki/' + id)
    },
    onSearch() {
      Indicator.open();
      this.axios.get('search?v=' + this.search)
        .then((res) => {
          this.wikis = res.data.wikis;
          Indicator.close();
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common";
.Home {
  padding-top: 40px;
  background: #efefef;
  .search {
    overflow: hidden;
    padding: 10px;
    .input {
      display: flex;
      height: 30px;
      .ipt {
        width: 80%;
        height: 100%;
        input {
          width: 100%;
          height: 100%;
          outline: none;
          box-sizing: border-box;
          padding: 0 10px;
          border: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          font-size: 14px;
          color: #666;
        }
      }
      .btn {
        width: 20%;
        button {
          background: $primary-color;
          width: 100%;
          height: 100%;
          border: none;
          color: white;
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
          outline: none;
          font-size: 14px;
        }
      }
    }
  }
  .list-latest, .list-most {
    padding-top: 10px;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0 10px;
      li {
        display: flex;
        margin-bottom: 10px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 1px 1px 5px #ccc;
        padding: 10px;
        .left {
          margin-right: 10px;
          width: 150px;
          .img {
            width: 150px;
            height: 100px;
            border-radius: 4px;
            img {
              height: 100%;
              width: 100%;
              border-radius: 4px;
            }
          }
        }
        .right {
          overflow: hidden;
          .title {
            font-weight: bold;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            /*width: 180px;*/
          }
          .desc {
            text-align: justify;
            font-size: 14px;
            overflow : hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            line-height: 1.38em;
            height: 5.5em;
          }
        }
      }
    }
  }
}
</style>
