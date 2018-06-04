<template>
  <div class="Home">
    <mt-header fixed title="美论广场"><!--
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>-->
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

    <div class="search">
      <mt-search v-model="msg" cancel-text="取消" placeholder="搜索"></mt-search>
    </div>

    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item id="1">最新发布</mt-tab-item>
      <mt-tab-item id="2">最多浏览</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="list-latest">
        <ul>
          <li v-for="(v, k) in 10" :key="k">
            <div class="left">
              <div class="img"></div>
            </div>
            <div class="right">
              <div class="title">这里是一个标题</div>
              <div class="desc">这里是一处文字简介解决这里是一处文字简介解决这里是一处文字简介解决</div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="list-most">
        <ul>
          <li v-for="(v, k) in 10" :key="k">
            <div class="left">
              <div class="img"></div>
            </div>
            <div class="right">
              <div class="title">这里是一个标题</div>
              <div class="desc">这里是一处文字简介解决这里是一处文字简介解决这里是驱蚊其味无穷二请问王企鹅请问去其味无穷请问请问恶趣味请问恶趣味请问请问器翁请问请问请问一处文字简介解决</div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '',
      selected: "1"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.Home {
  padding-top: 40px;
  background: #efefef;
  .search {
    height: 52px;
    overflow: hidden;
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
          .img {
            width: 150px;
            background: red;
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
          .title {
            font-weight: bold;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .desc {
            text-align: justify;
            font-size: 13px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
