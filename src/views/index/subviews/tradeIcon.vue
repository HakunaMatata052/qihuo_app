<template>
    <div class="container" id="video">
      <navBar :search="true" />
      <div class="main">
        <video
                  class="video_box"
                  width="100%"
                  height="100%"
                  webkit-playsinline="true"
                  x5-playsinline
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen
                  playsinline
                  preload="auto"
                  x-webkit-airplay="allow"
                  x5-video-orientation="portrait"
                  autoplay
                  loop="loop"
                >
                  <source src="http://video.jishiyoo.com/c082827a58584a2c864fa403f1aafabf/d5333562c5c74bcdb5bd3fe92073cd9c-6375039a2dd07d44dfaf66c1a32287ff-ld.mp4" type="video/mp4" />
                </video>
      </div>
    </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "tradeIcon",
  components: {
    navBar,
  },
  data() {
    return {
    };
  },
  created(){
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>

