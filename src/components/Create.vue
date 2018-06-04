<template>
  <div class="Create">
    <div class="top">
      <div class="title">
        <input type="text" placeholder="请输入说明页主标题（10字以内）">
      </div>
      <div class="desc">
        <textarea placeholder="请输入说明页简介（140字以内）"></textarea>
      </div>
      <div class="img">
        <div class="item">
          <i class="icon-plus"></i>
          <span>添加图片</span>
        </div>
      </div>
      <div class="switch">
        <span>是否公开到广场</span>
        <mt-switch></mt-switch>
      </div>
      <div class="switch">
        <span>使用背景音乐</span>
        <mt-switch></mt-switch>
      </div>
    </div>
    <div class="bottom">
      <div class="title">词条部分</div>
      <div class="container">
        <ul>
          <li v-for="v,k in 3" :key="k">
            <div class="header">
              <div class="word-title">词条标题{{ v }}</div>
              <div class="operate">
                <div><i class="icon-edit"></i></div>
                <div><i class="icon-up"></i></div>
                <div><i class="icon-down"></i></div>
                <div><i class="icon-copy"></i></div>
                <div><i class="icon-del"></i></div>
              </div>
            </div>
            <div class="input" v-if="true">
              <div class="input-title">
                <input type="text" placeholder="请输入标题">
              </div>
              <div class="desc">
                <textarea placeholder="请输入释义"></textarea>
              </div>
              <div class="img">
                <div class="left">
                  <div class="pic"><img src="" alt=""></div>
                  <div><input type="text" placeholder="请输入图片说明"></div>
                </div>
                <div class="right">
                  <div class="pic"><img src="" alt=""></div>
                  <div><input type="text" placeholder="请输入图片说明"></div>
                </div>
              </div>
            </div>
          </li>
          <li class="add"><i class="icon-plus"></i> 新增词条</li>
        </ul>
      </div>
      <div class="save">
        <button>保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
}
</script>

<style lang="scss" scoped>
.icon-plus {
  width: 10px;
  height: 10px;
  display: inline-block;
  background: red;
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
        border: 2px solid #ccc;
        border-radius: 4px;
        width: 100%;
        outline: none;
        height: 40px;
        line-height: 40px;
        padding: 5px;
        box-sizing: border-box;
      }
    }
    .desc {
      textarea {
        border: 2px solid #ccc;
        border-radius: 4px;
        width: 100%;
        resize: none;
        outline: none;
        height: 120px;
        padding: 5px;
        box-sizing: border-box;
      }
    }
    .img {
      border-bottom: 2px solid #ccc;
      font-size: 12px;
      .item {
        height: 50px;
        line-height: 50px;
      }
    }
    .switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      color: #333;
      border-bottom: 2px solid #ccc;
      box-sizing: border-box;
    }
  }
  .bottom {
    color: #333;
    background: white;
    padding: 0 10px 30px;
    .title {
      border-bottom: 2px solid #ccc;
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
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 5px 10px;
            .title {
            }
            .operate {
              display: flex;
              div {
                margin-left: 20px;
              }
            }
          }
          .input {
            border: 1px solid #ccc;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            border-top: none;
            width: 96%;
            margin: 0 auto;
            padding: 10px;
            box-sizing: border-box;
            .input-title {
              border-bottom: 1px solid #ccc;
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
              border-bottom: 1px solid #ccc;
              margin-bottom: 10px;
              textarea {
                outline: none;
                height: 80px;
                width: 100%;
                border: none;
                resize: none;
              }
            }
            .img {
              display: flex;
              justify-content: space-around;
              .pic {
                height: 80px;
                background: red;
                margin-bottom: 5px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              input {
                outline: none;
                border: none;
                border-bottom: 1px solid #ccc;
                height: 20px;
                line-height: 20px;
              }
            }
          }
        }
        .add {
          border: 1px solid #ccc;
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
        background: #ccc;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 3px 15px;
        outline: none;
      }
    }
  }
}
</style>
