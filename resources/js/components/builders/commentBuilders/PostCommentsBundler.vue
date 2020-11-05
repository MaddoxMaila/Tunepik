<template>
       
       <div class="Wrapper">
         
         <div class="" v-if="postComments.commentsLoading">
            
            <CommentSkeleton></CommentSkeleton>
           
         </div>
         <div v-else>
           
          <div v-if="postComments.list" class="comments list-group pt-1">

              <template v-for="(CommentModel, index) in postComments.comments">

                <CommentBodyBuilderTwo :comment="CommentModel" ></CommentBodyBuilderTwo>

              </template>

           </div>
           <div v-else>
             
             <div class="app-deleted-post grey-matter p-2">
               
               <center>
                 <span class="app-small-text">
                   {{ postComments.message }}
                 </span>
               </center>

             </div>

           </div>

         </div>

       </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import globs from '../../../tunepik/attack.js'
  import CommentBodyBuilderTwo from './CommentBodyBuilderTwo'
  import CommentSkeleton from '../skeletonBuilders/CommentSkeleton'

    export default {

        name    : "PostCommentsBundler",
        data    : () => {

          return {

            screen      : globs.app.isMobile,
            mainPost    : null,

          }

        },
        components  : {

          CommentBodyBuilderTwo,
          CommentSkeleton

        },
        methods   : {

          ...mapActions("posts", ["getPostComments"]),

        },
        computed    : {

          ...mapGetters("posts", ['postComments']),
          Post : function(){

            this.mainPost = this.post;
            return this.mainPost;

          }

        },
        props : ['post'],
        created(){

          this.getPostComments(this.$props.post.getPost().id)

        }

    };
</script>

<style scoped>

  .list-group{

    border-top: .05em solid rgba(211, 211, 211, .4);


  }

</style>
