<template>
       
      <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white">
        
        <div class="container-fluid">
        <div class="row" style="width:100%;position:relative;top:10px;">
          <div class="col-lg-4 app-icon container-fluid visible-lg">
             
            <table class="app-table" style="background-color: transparent;position: relative;left:40px;">
                <tr>
                  <td class="app-bar-tab" style="padding-left: 10%;width: 15%;">
                      <div class="space-medium"></div>
                      <a class="app-menu-btn">
                          
                      </a>
                  </td>
                  <td class="app-icon-tab" style="padding-left: 5%;">

                      <router-link :to="{ name: user ? 'home' : 'welcome' }">
                        <span class="navbar-brand">
                          {{ appName }}
                        </span>
                      </router-link>
                    
                  </td>
                </tr>
            </table>
              
          </div>
          <div class="col-lg-4 ">
               <center>
                 <div class="search-bar-lg">
                  <table class="app-search-table" style="">
                    <tr>
                      <td class="app-search-tab app-search-icon-tab" style="padding-top: 1%;">
                          <center>
                              <span class="app-search-lg">
                                <svg-vue icon="search" class="app-icon" ></svg-vue>
                              </span>
                          </center>
                      </td>
                      <td class="app-search-tab-input" >
                          <input type="search" class="app-input-field app-search-input" name="search" placeholder="Search TunePik" v-on:keyup="query = $event.target.value" />
                      </td>
                    </tr>
                  </table>
                </div>
              </center>
              <div class="app-dropdown-menu" style="z-index:9999 !important;" v-if="query != ''">
                            
                <SearchView :q="query"></SearchView>

              </div>
            </div>
          <div class="col-lg-4 darkmode-wrapper" style="">
            <div class="loading-wrapper skeleton-shimmer" v-if="true"></div>
            <div class="" v-else>
            <div class="user-wrapper" v-if="check">

              <div class="media">
                
                <div class="media-left">
                  <img :src="''+ user.model.getImgs().profile" class="rounded-circle" height="40" width="40" />
                </div>
                <div class="media-body ml-3">
                  <router-link :to="{ name : 'profile', params : { username : user.model.getBasic().handle } }">
                    <span class="app-max-text block-text">
                      {{ user.model.getBasic().name }}
                    </span>
                    <span class="app-grey-text">
                      @{{ user.model.getBasic().handle }}
                    </span>
                  </router-link>
                </div>
                <div class="media-left"></div>

              </div>
              
            </div>
            <div class="login-wrapper" v-else>
              LogIn
            </div>
          </div>
            
          </div>
        </div>
      </div>
  </nav>

</template>

<script>
import { mapGetters } from 'vuex'
import SearchView from '../builders/SearchView'

export default {
  name : "DesktopNavBar",
  scrollToTop : false,
  components : {

    SearchView

  },
  data: () => ({
    appName : window.config.appName,
    query   : ''
  }),

  computed: {

    ...mapGetters("auth", ['user', 'check', 'loading']),

  },
  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style scoped>

  .loading-wrapper{

    width: 100px;
    height: 40px;

  }

  .app-dropdown-menu{

    z-index: 9999 !important;
    position: fixed;
    top : 50px;
    border : .04em solid rgba(211, 211, 211, .3);
    width: 350px;
    max-height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px
  }

  .row,
  .container-fluid{
    overflow: hidden;
    height: 50px;
  }

</style>