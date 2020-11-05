<template>

  <div class="app-react-body container-fluid">


    <div class="animate-hearts-body" v-show="animateBody">
      
      <center>
        <span class="app-post-text">
          <Icon :icon="'heart'" :height="38" :width="38" :color="'red'"></Icon>
          &nbsp;&nbsp;+{{ post.getStats().likeCount == 0 ? 1 : post.getStats().likeCount + 1  }}
        </span>
      </center>

    </div>

    <div class="media">
      
      <!-- Wrapper For React Icons -->
      <div class="react-round">
        
        <!-- For Liking -->
        <a @click="like()" class="p-1">
          
          <span class="like-icon-wrapper">
              
              <!-- <svg-vue icon="heartEmpty" class="app-icon react-icon"></svg-vue> -->
              <Icon :icon="'heart'" :height="20" :width="20" :color="'red'" v-if="post.getStats().isLiked"></Icon>

              <Icon :icon="'heartEmpty'" :height="20" :width="20" v-else></Icon>

          </span>
          
          <!-- <span class="app-bold-text pt-1" v-if="post.getStats().likeCount > 0">{{ post.getStats().likeCount }}</span> -->

        </a>

        <!-- For Commenting -->
        <router-link :to="{ name : 'comment', params : { username : post.getBasic().handle,  type : post.getPost().type, id : post.getPost().id } }" >
          
          <span class="comment-icon-wrapper p-1">
            
            <!-- <svg-vue icon="comment" class="app-icon react-icon"></svg-vue> -->
            <Icon :icon="'comment'" :height="20" :width="20"></Icon>

          </span>

        </router-link>

        <!-- For Sharing -->
        <a v-on:click="toggleConfirm()" class="p-1">
          
          <span class="share-icon-wrapper">
            
             <!-- <svg-vue icon="share" class="app-icon react-icon"></svg-vue> -->
             <Icon :icon="'share'" :height="20" :width="20"></Icon>

          </span>

        </a>

      </div>

      <!-- Wrapper Prolly For Date, If Not Empty -->
      <div class="media-body">

      </div>

      <!-- Wrapper For External Sharing -->
      <div class="align-self-center">
        
        <a v-on:click="screen ? togglePopUp : toggleConfirm()" class="pl-1">
          
          <span class="x-share-icon-wrapper">
            
            <!-- <svg-vue icon="xshare" class="app-icon" style="height:16px;width:16px;"></svg-vue> -->
            <Icon :icon="'xshare'" :height="16" :width="16"></Icon>

          </span>

        </a>

      </div>

    </div>

    <div class="counter-wrapper">

      <div class="media mt-1" v-if="post.getStats().likeCount > 0">
        
        <div class="media-left align-self-center" v-if="post.getStats().likedBy != ''">

          <img :src="post.getStats().likedBy.user.getImgs().profile" class="rounded-circle" width="20" height="20" />
          
        </div>
        <div class="media-body align-self-center ml-1">


          <span v-if="post.getStats().likedBy != '' && post.getStats().likeCount == 1">
            
            <span class="app-grey-text-lg">
              Liked by
            </span>
            <span class="app-bold-text">
              {{ post.getStats().likedBy.user.getBasic().handle }} 
            </span>

          </span>
          <span v-else-if="post.getStats().likedBy != '' && post.getStats().likeCount >= 2">
            
            <span class="app-grey-text-lg">
              Liked by
            </span>
            <span class="app-bold-text">
              {{ post.getStats().likedBy.user.getBasic().handle }} 
            </span>
            <span class="app-grey-text-lg">
              and
            </span>
            <span class="app-bold-text">
              {{ post.getStats().likeCount - 1 }}
              <span v-if="post.getStats().likeCount == 2">
                other
              </span>
              <span v-else>
                others
              </span>
            </span>


          </span>
          <span v-else>
            
            <span class="app-bolder-text">{{ post.getStats().likeCount }}</span>
            <span class="app-grey-text-lg" v-if="post.getStats().likeCount > 1"> likes</span>

          </span>

        </div>

      </div>

        <span v-if="post.getStats.comCount > 0">

            <span class="app-bolder-text ml-2">{{ post.getStats().comCount }}</span>
            <span class="app-grey-text-lg" v-if="post.getStats.comCount > 1"> comments</span>
            <span class="app-grey-text-lg" v-else-if="post.getStats.comCount == 1"> commented</span>

        </span>

     </div>


     <!-- SHARE POST EXTERNALLY POP UP -->
     <PostPopUp :show="overlay.popup.isOpen" v-if="screen">

       <ShareXPop :post="post"></ShareXPop>

     </PostPopUp>
     <PopUpWindow :headerText="shareXHeader" :show="overlay.confirm.isOpen" v-else>

      <ShareXPop :post="post"></ShareXPop>

     </PopUpWindow>


     <!-- SHARE POST INTERNALLY POP UP -->
     <PopUpWindow :headerText="sharePHeader" :show="overlay.confirm.isOpen">
       
       <SharePostPop :post="post"></SharePostPop>

     </PopUpWindow>



  </div>
       
</template>

<script>
  
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import globs from '../../../tunepik/attack.js'
  import PopUpWindow from '../popupBuilders/PopUpWindow'
  import ShareXPop from '../popupBuilders/ShareXPop'
  import SharePostPop from '../popupBuilders/SharePostPop'
  import PostPopUp from '../popupBuilders/PostPopUp'
  import axios from 'axios'

    export default {

        name        : "ReactionBodyBuilder",
        components  : {

            PopUpWindow,
            ShareXPop,
            SharePostPop,
            PostPopUp

        },
        data        :function() {

          return {

            screen      : globs.app.isMobile,
            shareXHeader : 'Share Post',
            animateBody : false,
          }

        }, 
        props       : ['post'],
        methods     : {

          ...mapActions('tunepik', ['toggleConfirm', 'togglePopUp']),
          ...mapMutations('tunepik', ['SNACK_BAR']),

          like        : async function(){

            if(this.post.getStats().isLiked){

              this.post.getStats().likeCount -= 1

              this.post.getStats().isLiked = !this.post.getStats().isLiked

            }else {

              this.post.getStats().likeCount += 1

              this.post.getStats().isLiked = !this.post.getStats().isLiked

              this.post.getStats().likedBy.user = this.post.getStats().likedBy.user == undefined ? this.model : this.post.getStats().likedBy.user

              this.animateBody = !this.animateBody
              
              setTimeout(() => {

                this.animateBody = !this.animateBody

              }, 500)

            }

            const { data } = await axios.get(`/api/react/like/${this.post.getPost().id}?type=post`);

            if(data.error){

              this.SNACK_BAR({ isOpen : true, message : data.message, theme : 'danger' })

            }else{

              this.post.getStats().isLiked = data.liked

              this.post.getStats().likeCount = data.count

              /*this.animateBody = data.liked

              if(data.liked) setTimeout(() => {

                this.animateBody = false

              }, 500)*/

            }

          }

        },
        computed    : {

          ...mapGetters('tunepik', ['overlay']),
          ...mapGetters('auth', ['model']),
          sharePHeader : function(){

            return `Share @${this.post.getBasic().handle} Post`;

          }

        },
        mounted : function(){

        }

    };
</script>

<style scoped>

  .react-round{

    border-radius: 20px;
    padding: 5px;
    -webkit-box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
    box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);

  }

  .react-count-wrapper{

    border: .05em solid rgba(211, 211, 211, .175)

  }

  .app-react-body{

  }

  .react-icon{

    width : 20px;
    height : 20px;

  }


</style>
