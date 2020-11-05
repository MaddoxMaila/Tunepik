<template>

  <div class="app-image-body main-wrapper">
    
    <a class="media-anchor">
      
      <img class="img-fluid" :src="'' + post.getPost().url" />
      <!-- <image-loader 
        class="img-fluid app-image-body image"
        :src="'' + post.getPost().url"
      /> -->

    </a>

  </div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'

    export default {

        name    : "ImageBodyBuilder",
        data    : () => {

          return {

            screen : globs.app.isMobile

          }

        }, 
        props : ['post'],
        computed : {

          width : function(){

            return this.screen > 700 ? '600px' : `${document.screen.width}px`

          }

        }

    };
</script>

<style scoped>

  .image{

    width: 100%;
    height: auto;

  }

</style>
