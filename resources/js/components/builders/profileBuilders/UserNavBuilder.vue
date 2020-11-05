<template>
  
  <div class="wrapper">

    <div class="app-user-info-nav darkmode-wrapper">

      <table class="app-user-info-nav-table">

        <tr class="app-user-info-nav-tr">

          <td class="app-tab app-user-info-nav-tab back-tab">

            <center>

              <a class="profile-back-btn" v-on:click="back()">

                <!-- <svg-vue icon="back" class="app-icon"></svg-vue> -->
                <Icon :icon="'back'" :width="24" :height="24"></Icon>

              </a>

            </center>

          </td>

          <td class="app-tab app-user-info-nav-tab user-name-tab">

            <router-link :to="{ name : 'profile', params : { username : user.getBasic().handle } }" class="name-link">

              <span class="profile-user-name app-max-text">
                {{ user.getBasic().name }}
              </span>
              <span class="profile-user-handle app-post-text" style="display: block;line-height: 1;">
                @{{ user.getBasic().handle }}
              </span>

            </router-link>

          </td>

          <template v-if="user.getActivity().me">
            
            <td class="app-tab app-user-info-nav-tab first-buttons-tab pl-2">

              <router-link class="btn btn-info" :to="{ name : 'edit.account', params : { username : user.getBasic().handle } }">
                
                  Edit Profile

              </router-link>
              
            </td>
            <td class="app-tab app-user-info-nav-tab second-buttons-tab pr-3">

              <!-- Show Edit Profile Button -->
              <center>
                <router-link :to="{ name : 'edit', params : { username : user.getBasic().handle } }">
                 <i class="fa fa-cogs app-fa"></i>
                </router-link>
              </center>

            </td>

          </template>
          <template v-else>
            
            <td class="first-buttons-tab" style="width: 10%;">

              <!-- Show Message Button -->
              <router-link :to="{ name : 'messages', params : { username : user.getBasic().handle } }" class="btn btn-info">
                DM
              </router-link>

            </td>

            <td class="second-buttons-tab" style="width: 20%;">

              <!-- Show Follow Button -->

              <FollowButton :user="user" :classes="''"></FollowButton>

            </td>

          </template>

        </tr>

      </table>

    </div>


  </div>

</template>

<script type="text/javascript">

 import FollowButton from '../userBuilders/FollowButton'

  export default {

    name : "UserNavBuilder",
    scrollToTop : false,
    components : {

      FollowButton

    },
    props : ['user'],
    methods : {

      back : function(){

        window.history.back();

      }

    }

  };
  

</script>

<style scoped>

  
  @media only screen and (min-width : 700px){

    .card-header{

      padding : 0;
    }

    .app-user-info-nav,
    .app-user-info-nav-table,
    .app-user-info-nav-tab{
      padding : 0;
    }

    .first-buttons-tab,
    .second-buttons-tab{

      width: 20%;

    }

    .user-name-tab{

      width : 50%;

    }

  }

  @media only screen and (max-width: 699px){

    .app-user-info-nav,
    .app-user-info-nav-table,
    .app-user-info-nav-tab{
      padding : 0;
    }


    table,
    .wrapper{
      width: 100%;
    }

    .app-user-info-nav{
      height: 45px;
    }


  }
  
</style>