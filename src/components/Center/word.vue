<template>
  <div class="Word">
    <mt-header title="我的作品"></mt-header>
    <div class="container" v-if="wordItems.length > 0">
      <ul>
        <li v-for="v,k in wordItems" :key="k">
          <div class="header">
            <div class="left">
              <span>对外显示</span>
              <mt-switch v-model="v.publish"></mt-switch>
            </div>
            <div class="right">
              <div class="oprate">
                <div><i class="icon-edit"></i></div>
                <div><i class="icon-up"></i></div>
                <div><i class="icon-down"></i></div>
                <div><i class="icon-copy"></i></div>
                <div><i class="icon-del" @click="onDelToWordItem(k)"></i></div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="left">
              <div class="img">
                <img src="" alt="">
              </div>
            </div>
            <div class="right">
              <div class="title">{{ v.title }}</div>
              <div class="desc">{{ v.desc }}</div>
            </div>
          </div>
          <div class="footer">
            <div class="left">
              <span>访问量：</span>
              <span>{{ v.visit }}</span>
            </div>
            <div class="right">
              <span>创建日期：</span>
              <span>{{ v.created_at }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-container" v-else>
      <div class="img">
        <img src="/static/img/noWord.png" alt="noWord">
      </div>
      <div class="tip">
        <div class="text">你还未留下作品哦</div>
      </div>
      <div class="btn">
        <router-link class="button" to="/create">立即创建</router-link>
        <router-link class="button" to="/home">查看更多</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs';
import { MessageBox } from 'mint-ui'

export default {
  name: "Word",
  data() {
    return {
      wordItems: []
    }
  },
  mounted() {
    this.wordItems = Mock.mock({
      'list|1-5': [
        {
          'id|+1': 1,
          'publish': true,
          'title': '@cparagraph()',
          'desc': '@cparagraph()',
          'visit': 123,
          'created_at': '@date(yyyy-MM-dd)',
          'img_url': ''
        }
      ]
    }).list;
  },
  methods: {
    onDelToWordItem(k) {
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      }).then(res => {
        if (res === 'confirm') {
          this.wordItems.splice(k, 1);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-edit {
  width: 15px;
  height:  15px;
  display: block;
  background: url("/static/img/icon-edit.png") no-repeat center / contain;
}
.icon-up {
  width: 15px;
  height:  15px;
  display: block;
  background: url("/static/img/icon-up.png") no-repeat center / contain;
}
.icon-down {
  width: 15px;
  height:  15px;
  display: block;
  background: url("/static/img/icon-down.png") no-repeat center / contain;
}
.icon-copy {
  width: 15px;
  height:  15px;
  display: block;
  background: url("/static/img/icon-copy.png") no-repeat center / contain;
}
.icon-del {
  width: 15px;
  height:  15px;
  display: block;
  background: url("/static/img/icon-del.png") no-repeat center / contain;
}
.Word {
  background: #efefef;
  .no-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    color: #333;
    padding: 30px 0;
    & > div {
      margin-bottom: 20px;
    }
    .img {
      img {
        width: 120px;
      }
    }
    .tip {
      height: 26px;
      width: 200px;
      border-bottom: 2px solid #B9955A;
      .text {
        text-align: center;
        color: #666;
      }
    }
    .btn {
      display: flex;
      .button {
        background: #B9955A;
        border: none;
        border-radius: 50px;
        padding: 2px 10px;
        outline: none;
        color: #fff;
        text-decoration: none;
        font-size: 13px;
        &:first-of-type {
          margin-right: 30px;
        }
      }
    }
  }
  .container {
    padding: 20px 10px;
    ul {
      li {
        color: #333;
        margin-bottom: 20px;
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 1px 5px #ccc;
          box-sizing: border-box;
          padding: 10px;
          background: white;
          z-index: 1;
          position: relative;
          .left {
            display: flex;
            span {
              margin-right: 10px;
            }
          }
          .right {
            .oprate {
              display: flex;
              div {
                margin-left: 20px;
              }
            }
          }
        }
        .section {
          display: flex;
          padding: 10px;
          border: 1px solid #ccc;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top: none;
          box-shadow: 0 1px 5px #ccc;
          position: relative;
          top: -2px;
          background: white;
          .left {
            margin-right: 10px;
            .img {
              width: 160px;
              height: 90px;
              background: red;
            }
          }
          .right {
            overflow: hidden;
            .title {
              font-weight: bold;
              height: 20px;
              margin-bottom: 4px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .desc {
              height: 66px;
              line-height: 16.5px;
              text-overflow: ellipsis;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              overflow: hidden;
              font-size: 12px;
              text-align: justify;
            }
          }
        }
        .footer {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 0 5px;
        }
      }
    }
  }
}
</style>
