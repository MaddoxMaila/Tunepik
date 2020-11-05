<template>

	<!-- Root Level Wrapper -->
	<div class="list-group-item">
		
		<div class="media">
			
			<!-- User Image! -->

			<img class="rounded-circle" width="35" height="35" :src="'' + user.getImgs().profile" />

			<div class="media-body ml-3">
				
				<span class="name-wrapper">
					
					<router-link :to="{ name : 'profile', params : { username : user.getBasic().handle } }">
						
						<span class="app-bolder-text">
							{{ user.getBasic().name }}
						</span>

					</router-link>

				</span>
				<div class="text-breaker"></div>
				<span class="app-grey-text" v-if="user.getInfo().bio == null">
					<i class="app-fa fas fa-calendar-alt mr-1"></i>
					Joined On {{ user.getBasic().date }}
				</span>
				<span class="app-post-text" v-else>

					{{ user.getInfo().bio }}

				</span>

			</div>

			<!-- User Follow Btn Wrapper -->
			<div class="user-follow-btn">

				<BlockButton :user="user" :classes="'btn-sm btn-block'" v-if="user.getActivity().youBlock"></BlockButton>
				<FollowButton :user="user" :classes="'btn-sm btn-block'" v-else></FollowButton>

			</div>

		</div> <!-- End Of Header Media -->

	</div> <!-- End Of Root Level Wrapper -->

       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  import FollowButton from './FollowButton'
  import BlockButton from './BlockButton'

    export default {

        name    : "UserRowBuilder",
        components :{

        	FollowButton,
        	BlockButton

        },
        data    : () => {

          return {

            screen : globs.app.isMobile

          }

        },
        props : ['user']

    };
</script>

<style scoped>

  .list-group-item{
  	/*padding-left: 15px;
  	padding-right: 15px;
  	padding-bottom: 5px;
  	padding-top: 5px;*/
  	border : 0;
  	border-bottom : .04em solid rgba(211, 211, 211, .4);
  }
  .text-breaker{

  	height: 0;

  }

  .app-fa{
  	color : rgba(211, 211, 211, 1);
  }

</style>
