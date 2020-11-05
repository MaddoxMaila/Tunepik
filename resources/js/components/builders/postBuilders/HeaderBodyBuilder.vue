<template>

  <div class="media pl-1 pr-1 mt-2 mb-2">

    <!-- User Image -->
    <image-loader 
        height="35px"
        width="35px"
        class="rounded-circle ml-2 mt-1"
        :placeholder="'' + post.getImgs().profile"
        :src="''+post.getImgs().profile" />
          
   <!--  <img  height="35" width="35" :src="'' + post.getImgs().profile" /> -->

    <div class="media-body ml-3 align-self-center">
      
      <router-link v-bind:to="{ name : 'profile', params :{ username : post.getBasic().handle } }">

         <span class="app-bolder-text">{{ post.getBasic().name }}</span>

      </router-link>

      <span class="app-grey-text-sm" style="line-height: 1;display:block">{{ post.getPost().time }} {{ post.getPost().date }}</span>

    </div>

    <!-- User Options Button -->

    <div class="post-header-icon-wrapper pr-2 align-self-center">
      
      <div class="options-roun">
        
        <a class="post-header-icon" v-on:click="togglePopUp()">
        
          <!-- <svg-vue icon="arrowdown" class="app-icon" style="width:20px;height:20px;" ></svg-vue> -->
          <Icon :icon="'arrowdown'" :height="20" :width="20"></Icon>

        </a>

      </div>

      <!-- Insert PopUp Window -->
      <PostPopUp :show="overlay.popup.isOpen" v-if="screen">
        <PostOptions :post="post"></PostOptions>
      </PostPopUp>
      <PopUpWindow :headerText="headerText" :show="overlay.confirm.isOpen" v-else>
        <PostOptions :post="post"></PostOptions>
      </PopUpWindow>

    </div>

  </div>
       
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import globs from '../../../tunepik/attack.js'
  import PopUpWindow from '../popupBuilders/PopUpWindow'
  import PostPopUp from '../popupBuilders/PostPopUp'
  import PostOptions from '../popupBuilders/PostOptions'

    export default {

        name        : "HeaderBodyBuilder",
        components  : {

          PopUpWindow,
          PostOptions,
          PostPopUp

        },
        data        : () => {

          return {

            screen : globs.app.isMobile,
            header : '',

          }

        }, 
        props   : ['post'],
        methods  : {

          ...mapActions('tunepik', ['togglePopUp']),

        },
        computed : {

          ...mapGetters('tunepik', ['overlay']),
          headerText : function(){

              this.header = `@${this.post.getBasic().handle} Post Options`;
              return this.header;

          },

        }

    };
</script>

<style scoped>

  .options-round{

    border-radius: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 7px;
    padding-right: 7px;
    -webkit-box-shadow: 0 1px 2px rgba(91, 192, 222, .4);
    box-shadow: 0 1px 2px rgba(91, 192, 222, .4);

  }

</style>
