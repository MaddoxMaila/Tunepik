<template>
       
  <div class="card app-suggestions">
    
    <div class="card-header">
      
      <span class="app-max-text">
        Suggestions
      </span>

    </div>


    <div class="card-body">

      <div class="" v-if="loading">
        
         <SlideSkeleton></SlideSkeleton>

      </div>
      <div class="" v-else>
          
          <template v-if="error">
            
            <div class="app-deleted-post grey-matter">
              
              <center>
                <span>
                  {{ message }}
                </span>
              </center>

            </div>

          </template>
          <template v-else>

            <CardSlideBundler :users="Users" ></CardSlideBundler>

          </template>

      </div>
    
    </div>

  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  // import SlideSkeleton from '../../builders/skeletonBuilders/SlideSkeleton'

    export default {

        name        : "Suggestions",
        component   : {

          // SlideSkeleton

        } ,
        methods     : {

          ...mapActions("follow", ['getSuggestions'])

        },
        computed    : {

          ...mapGetters("follow", ['loading', 'error', 'Users', 'list', 'message']),

        },
        created     : function () {

          this.$nextTick(function(){

            if(!this.list){

              this.getSuggestions();

            }

          });

        }
        
    };
</script>

<style scoped>

  @media only screen and (max-width: 700px){

    .card{

      border : 0;

    }

    .card-body{

      padding: 0;

    }

  }

  @media only screen and (min-width: 700px){

    .card{

      border : 0;

    }

    .card-body{

      padding: 0;

    }

  }

</style>