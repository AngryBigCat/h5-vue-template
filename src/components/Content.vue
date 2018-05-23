<template>
  <div class="content">
    <div class="return" @click="onRedirectHome"></div>
    <div class="container">
      <div class="lcloud"></div>
      <div class="rcloud"></div>
      <div class="circle">
        <img :src="titleImgUrl" alt="title">
      </div>
      <div class="article" ref="article">
        <div class="art" v-html="category.content"></div>
        <div class="art-list" v-show="artListShow">
          <div class="art-item" v-for="v, k in category.articles" :key="k" @click="onReadArticle(v.id)">
            <div class="left">
              <img :src="v.cover_url" alt="cover">
            </div>
            <div class="right">
              <div class="title">{{ v.title }}</div>
              <div class="desc">{{ v.content }}</div>
              <div class="detail">
                <span>了解详情 &gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-if="artListShow && bottomShow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      progress: 1,
      artListShow: false,
      bottomShow: true,
      category: {
        category_name: '',
        content: '',
        articles: []
      },
      isArticle: false
    }
  },
  mounted() {
    this.$refs.article.addEventListener('scroll', (e) => {
      if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight) {
        this.bottomShow = false;
      } else {
        this.bottomShow = true;
      }
    });
    this.onInit();
  },
  methods: {
    async onInit() {
      const name = this.$route.params.name;
      await this.$axios.get('ceremony/' + name).then((res) => {
        this.artListShow = true;
        this.category = res.data;
      });
      if (this.$refs.article.scrollHeight === this.$refs.article.offsetHeight) {
        this.bottomShow = false;
      }
    },
    onRedirectHome() {
      const scrollTop = this.$route.query.scrollTop
      if (this.$route.query.scrollTop >= 0) {
        this.$router.push({path: "/", query: { scrollTop }});
      } else {
        this.$router.push('/');
      }
    },
    onReadArticle(id) {
      const name = this.$route.params.name;
      this.$router.push('/content/' + name + '/' + id);
    }
  },
  computed: {
    titleImgUrl() {
      return '/static/img/title/'+ this.$route.params.name +'.png';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/common";
.content {
  @include img('/static/img/bg.png');
  .return {
    @include img("/static/img/return.png", 18.67%, 3.66%, 5%, 2%, center, contain);
  }
  .container {
    @include img("/static/img/container.png", 89.7%, 89.45%, center, 8%);
    .lcloud {
      @include img("/static/img/lcloud.png", 23.39%, 5.24%, 8%, 5%, center, contain);
      animation: float 4s linear infinite alternate;
    }
    .rcloud {
      @include img("/static/img/rcloud.png", 12.61%, 3.86%, 78%, 12%, center, contain);
      animation: float 3s linear 1s infinite alternate;
    }
    .circle {
      @include img("/static/img/circle.png", 55.88%, 13.24%, center, 5%, center, contain);
      img {
        position: absolute;
        bottom: 20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 60%;
      }
    }
    .article {
      position: absolute;
      top: 20%;
      left: 0;right: 0;
      height: 75%;
      width: 90%;
      margin: 0 auto;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .art-list {
        padding-top: 20px;
        .art-item {
          background: white  url("/static/img/dec.png") no-repeat center / 96% 90%;
          height: 130px;
          border-radius: 4px;
          box-shadow: 1px 1px 10px #aaa;
          margin-bottom: 20px;
          display: flex;
          padding: 6% 8%;
          box-sizing: border-box;
          .left {
            width: 40%;
            img {
              border-radius: 4px;
              width: 100%;
              height: 100%;
            }
          }
          .right {
            width: 60%;
            font-size: 12px;
            padding-left: 10px;
            box-sizing: border-box;
            .title {
              color: #333;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .desc {
              color: #666;
              height: 45px;
              line-height: 15px;
              overflow: hidden;
              text-align: justify;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              margin-bottom: 5px;
            }
            .detail {
              color: #753733;
              text-align: right;
            }
          }
        }
      }
    }
    .bottom {
      @include img('/static/img/bottom.png', 4%, 2%, center, 96%, center, contain);
      animation: down-flash 1s linear infinite;
    }
  }
}
</style>
