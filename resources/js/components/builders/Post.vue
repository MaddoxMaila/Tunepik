<template>

<div class="post-breaker">
  <div class="app-media-body-main mb-4">
    
    <div class="app-media-body">

        <!-- Create Post Header! -->

         <HeaderBodyBuilder :post="post"></HeaderBodyBuilder>

            <!-- Check If Deleted Or Not -->

            <template v-if="post.getPost().type == 'deleted'">
              
              <DeletedBodyBuilder :post="post"></DeletedBodyBuilder>

            </template>
            <template v-else>
              
              <TextBodyBuilder :post="post"></TextBodyBuilder>

            </template>

            <!-- Actual Post -->

            <MediaBodySwitch :post="post"></MediaBodySwitch>

            <template v-if="!post.getStats().isOriginal">

              <div class="space-small"></div>

              <ShareBodyBuilder :post="post.getShare().model"></ShareBodyBuilder>

            </template>

            <!-- Reaction Body Wrapper -->

            <div class="">

              <ReactionBodyBuilder :post="post"></ReactionBodyBuilder>

            </div>

      </div>

      <!-- Show One Comment If Post Has Comment! -->

      <template v-if="post.getComment().has && comments">
        
        <div class="feed-comment-wrapper mt-1">
          
           <CommentBodyBuilderTwo :comment="post.getComment().comment"></CommentBodyBuilderTwo>

        </div>

      </template>

      <div class="space-large visible-lg"></div>
      <div class="space-medium visible-sm"></div>

    </div>

    <div class="space-small" v-if="!screen">
      
    </div>
</div>

</template>

<script>
  import {mapGetters} from 'vuex';
  import globs from '../../tunepik/attack.js'
  import HeaderBodyBuilder from './postBuilders/HeaderBodyBuilder'
  import MediaBodySwitch from './postBuilders/MediaBodySwitch'
  import TextBodyBuilder from './postBuilders/TextBodyBuilder'
  import DeletedBodyBuilder from './postBuilders/DeletedBodyBuilder'
  import ReactionBodyBuilder from './postBuilders/ReactionBodyBuilder'
  import ShareBodyBuilder from './postBuilders/ShareBodyBuilder'
  import CommentBodyBuilderTwo from './commentBuilders/CommentBodyBuilderTwo'


    export default {

        name        : "Post",
        scrollToTop : false,
        data    : () => {

          return {

            screen : globs.app.isMobile

          }

        },
        components  : {

          MediaBodySwitch,
          TextBodyBuilder,
          DeletedBodyBuilder,
          ReactionBodyBuilder,
          HeaderBodyBuilder,
          ShareBodyBuilder,
          CommentBodyBuilderTwo

        },
        props       : ['post', 'comments']

    };

</script>

<style scoped>

  .app-media-body-main{

  }

  @media only screen and (max-width : 700px){

    .app-media-body-main{

      /*border-bottom: .05em solid rgba(211, 211, 211, .175);*/

    }

    .feed-comment-wrapper{

       border-top: .05em solid rgba(211, 211, 211, .4);

    }

    .app-media-body,
    .app-viewport-top{
      width :100%;
      height: 100%;
      object-fit: contain;
      background-color: transparent;
      margin: auto;
    }

  }

  @media only screen and (min-width : 700px){

    .app-media-body-main{
      border: .05em solid lightgrey;
      -webkit-box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
       box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
    }

    .app-media-body{
      width :100%;
      height: auto;
      background-color: transparent;
    }

  }


</style>
