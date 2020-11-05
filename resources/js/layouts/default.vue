<template>
  <div class="main-layout" :class="theme.type">
    
    <template v-if="screen">

      <div class="root-m-element">

        <Navigation>
          
          <div class="media-body align-self-center">
            
            <!-- <center>
              <div class="skeleton-shimmer skeleton-name"></div>
            </center> -->

          </div>

        </Navigation>
        
        <div class="">
          <MobileNavBar />
        </div>

        <div class="contain wrapper">

          <MobileBaseView />

        </div>

      </div>

    </template>

    <template v-else>

      <div class="root-d-element">

        <DesktopNavBar />

        <div class="container mt-1">
            
            <DesktopBaseView />
        
        </div>

      </div >

    </template>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Navbar from '~/components/Navbar'
import globs from '../tunepik/attack.js'
import Navigation from '../components/mobile/root/Navigation'

export default {
  name: 'MainLayout',
  data : () => {

    return {

      screen : globs.app.isMobile

    }

  },
  components: {
    Navbar,
    Navigation
  },
  methods  : {

    ...mapActions("tunepik", ['backgroundColor']),

  },
  computed : {

    ...mapGetters("tunepik", ['theme'])

  },
  beforeMount : function() {
    
    this.$nextTick(function(){

      this.backgroundColor();

    });

  }

};

</script>

<style scoped>

  .main-layout{
    overflow-x:hidden;
    height: 100%;
    width: 100%;
  }

  .root-m-layout{
    position: fixed;
    top : 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1 !important;
  }

</style>
