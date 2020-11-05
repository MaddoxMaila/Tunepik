<template>
    <div class="container-fluid app-post-text-wrapper main-wrapper" v-if="post.getPost().text != ''">
      <span class="app-post-text">{{ post.getPost().text }}</span>
    </div>
</template>

<script>

  import globs from '../../../tunepik/attack.js'

    export default {

        name    : "TextBodyBuilder",
        data    : () => {

          return {

            screen : globs.app.isMobile

          }

        }, 
        props : ['post']

    };
</script>

<style scoped>

  .app-post-text{
    line-height: normal;
  }

</style>
