<template>
  <div class="home" ref="home">
    <div class="long-img">
      <img src="/static/img/map.jpg" alt="map">
      <div @click="onRedirectToContent('/content/hrgy')" class="touch t1"/>
      <div @click="onRedirectToContent('/content/jshrb')" class="touch t2"/>
      <div @click="onRedirectToContent('/content/zsp')" class="touch t3"/>
      <div @click="onRedirectToContent('/content/sgjy')" class="touch t4"/>
      <div @click="onRedirectToContent('/content/hrf')" class="touch t5"/>
      <div @click="onRedirectToContent('/content/sth')" class="touch t6"/>
      <div @click="onRedirectToContent('/content/yxst')" class="touch t7"/>
      <div @click="onRedirectToContent('/content/jfjx')" class="touch t8"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      progress: 1
    }
  },
  mounted() {
    var overscroll = function(el) {  
        el.addEventListener('touchstart', function() {  
            var top = el.scrollTop  
            ,totalScroll = el.scrollHeight  
            ,currentScroll = top + el.offsetHeight;  
            if(top === 0) {  
                el.scrollTop = 1;  
            }else if(currentScroll === totalScroll) {  
                el.scrollTop = top - 1;  
            }  
        });  
      
        el.addEventListener('touchmove', function(evt) {  
        if(el.offsetHeight < el.scrollHeight)  
            evt._isScroller = true;  
        });  
    }  

    overscroll(this.$refs.home);  
    document.body.addEventListener('touchmove', function(evt) {
        console.log(evt._isScroller);
        if(!evt._isScroller) {
            evt.preventDefault();  
        }  
    }, {passive: false});


    const scrollTop = this.$route.query.scrollTop;
    if (scrollTop) {
      this.$refs.home.scrollTo(0, scrollTop);
    } else {
      const scrollEnd = this.$refs.home.scrollHeight - this.$refs.home.clientHeight;
      this.$refs.home.scrollTo(0, scrollEnd);
    }
  },
  methods: {
    onRedirectToContent(url) {
      if (url === '/content/hrf') {
        this.$emit('closeMusic');
      }
      const scrollTop = this.$refs.home.scrollTop
      this.$router.push({path: url, query: { scrollTop }});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/common";
.home {
  height: 100%;
  /*overflow: scroll;*/
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  .long-img {
    position: relative;
    height: 2300px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .touch {
      @include img('/static/img/tip.gif', 50px, 50px, 45%);
      &.t1 {
        left: 45%;
        bottom: 35px;
      }
      &.t2 {
        left: 48%;
        bottom: 280px;
      }
      &.t3 {
        left: 44%;
        bottom: 530px;
      }
      &.t4 {
        left: 73%;
        bottom: 670px;
      }
      &.t5 {
        left: 44%;
        bottom: 780px;
      }
      &.t6 {
        left: 73%;
        bottom: 1365px;
      }
      &.t7 {
        left: 45%;
        bottom: 1600px;
      }
      &.t8 {
        left: 60%;
        bottom: 2080px;
      }
    }
  }
}
</style>
