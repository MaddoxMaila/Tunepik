<template>
       
  <div class="navbar app-nav navbar-expand-sm fixed-bottom">
    <table class="app-nav-table darkmode-wrapper pb-2">
      <tr>
        <td class="app-nav-tab home app-tab">
          <center>
            <router-link :to="{ name : 'home' }" >
              <span class="app-home-icon">

                <!-- <svg-vue icon="home" class="app-icon" ></svg-vue> -->
                <a @click="makeColor('home')">
                  <Icon :icon="'home'" :width="24" :height="24" :color="colors.home" ></Icon>
                </a>
              </span>
              <div class="space-small" ></div>
              <!-- <span class="app-grey-text-sm visible-lg visible-xs icon-text">Home</span> -->

            </router-link>
          </center>
        </td>
        <td class="app-nav-tab search app-tab visible-xs">
            <center>
                <router-link :to="{ name : 'chats' }" class="app-search-btn" >
                  <div class="space-small" ></div>
                    <span class="app-search-xs">
                     
                     <!-- <svg-vue icon="messages" class="app-icon" ></svg-vue> -->
                     <a @click="makeColor('messages')">
                      <Icon :icon="'messages'" :width="24" :height="24" :color="colors.messages"></Icon>
                     </a>
                    </span>
                    <span class="app-badge msg-badge icon-text icon-badge"></span>
                    <div class="space-small" ></div>
                    <!-- <span class="app-grey-text-sm visible-lg visible-xs icon-text">Search</span> -->
                </router-link>
            </center>
        </td>
        <td class="app-nav-tab messages app-tab">
          <center>
            <router-link :to="{ name : 'createPost' }" class="app-messages-btn" >
              <span class="app-message-icon">

                <!-- <svg-vue icon="more" class="app-icon" style="height:36;width:36;" ></svg-vue> -->
                <a @click="makeColor('add')">
                  <Icon :icon="'add'" :width="36" :height="36" :color="colors.add"></Icon>
                </a>                  
                </span>         
            </router-link>
          </center>
        </td>
        <td class="app-nav-tab notifications app-tab">
          <center>
            <router-link :to="{ name : 'notifications' }" class="app-notification-btn">
              <span class="app-notification-icon"></span>

                <!-- <svg-vue icon="notifications" class="app-icon" ></svg-vue> -->
                <a @click="makeColor('notifications')" >
                  <Icon :icon="'notifications'" :width="24" :height="24" :color="colors.notifications" ></Icon>
                </a>
                <span class="app-badge notif-badge icon-text icon-badge"></span>
                <div class="space-small" ></div>
                <!-- <span class="app-grey-text-sm visible-lg visible-xs icon-text">Notifs
                </span> -->

            </router-link>
          </center>
        </td>
        <td class="app-nav-tab profile-tab app-tab visible-xs">
          <center>
            <div class="space-small"></div>
            <div class="img-loading skeleton-shimmer" v-if="loading"></div>
            <div class="" v-else>
              
              <div class="" v-if="check">
                
                  <router-link :to="{ name : 'profile', params : { username : model.getBasic().handle } }" class="nav-user-link">

                    <img class="img-circle rounded-circle nav-user-img" :src="'' + model.getImgs().profile" width="30" height="30" />
                    <span class="app-grey-text-sm visible-lg visible-xs nav-user-handle"></span>
                    
                  </router-link>
              </div>

            </div>
          </center>
        </td>
        
      </tr>
    </table>
        
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name : "MobileNavBar",
  data: () => ({

    appName: window.config.appName,
    colors : {
      home  : '',
      message : '',
      notifications : '',
      add : '',
      profile : ''
    },
    pathname : window.location.pathname,

  }),

  computed: {

    ...mapGetters("auth", ['user', 'check', 'loading', 'model']),
    ...mapGetters("tunepik", ['theme']),
    path : function(){return this.pathname},

  },

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    },
    makeColor : function(icon){

      let keys = ['home', 'messages', 'add', 'notifications', 'user']

      for(let i = 0; i < 4; i++){

        if(keys[i] === icon) this.colors[keys[i]] = '#5bc0de'
          else {
            
            this.colors[keys[i]] = this.theme.type === 'theme-dark' ? this.theme.colors.lightgrey : this.theme.colors.dark

          }

      }

    }
  },
  watch : {

    '$route.path' : function(newval, oldval){

      if(newval === oldval) return

      switch (newval) {

        case '/home':

            this.makeColor('home')

          break;

        case '/messages':

            this.makeColor('messages')

          break;

        case '/notifications':

            this.makeColor('notifications')

          break;

        case '/create/post':

            this.makeColor('add')

          break;

        case `/${this.model.getBasic().handle}` :

            this.makeColor('user')

        default:
          
          this.makeColor('none')

          break;
      }

    }

  },
  mounted : function(){

    this.makeColor('home')

  }
};
</script>

<style scoped>

  .app-icon{
    height : 28px;
    width : 28px;
  }

  .app-nav-table{

    position: relative;
    top: -5px;

  }

  .img-loading{

    width: 30px;
    height: 25px;
    border-radius: 5px;

  }

</style>