<template>

	<div class="list-group">
		
		<!-- Show Likers -->
		<a class="list-group-item list-group-item-action b-under">

			<router-link :to="{ name : 'list', params : { username : post.getBasic().handle, id : post.getPost().id, type : 'likers' } }">

				<div class="media">
					
					<div class="self-align-center">
					
					<!-- <svg-vue icon="heartEmpty" class="app-icon"></svg-vue> -->
					<Icon :icon="'heartEmpty'" :height="20" :width="20"></Icon>

					</div>
					<div class="media-body ml-2">

						<span class="app-small-text">
							Likes
						</span>

					</div>

				</div>

			</router-link>

		</a>

		<!-- Show Commenters -->
		<a class="list-group-item list-group-item-action b-under">
			
			<router-link :to="{ name : 'list', params : { username : post.getBasic().handle, id : post.getPost().id, type : 'commenters' } }">
				
				<div class="media">
					
					<div class="self-align-center">
					
					<!-- <svg-vue icon="comment" class="app-icon"></svg-vue> -->
					<Icon :icon="'comment'" :height="20" :width="20"></Icon>

					</div>

					<div class="media-body ml-2">
						
						<span class="app-small-text">
							Comments
						</span>

					</div>

				</div>

			</router-link>

		</a>

		<!-- Go To Full Post Page -->
		<a class="list-group-item list-group-item-action b-under">

			<router-link :to="{ name : 'comment', params : {username : post.getBasic().handle, id : post.getPost().id} }" >
				
				<div class="media">
					
					<div class="self-align-center">
					
					 <i class="fa fa-external-link app-fa"></i>

					</div>

					<div class="media-body ml-2">
						
						<span class="app-small-text">
							Go To Post
						</span>

					</div>

				</div>

			</router-link>

	  </a>
		<!-- Show Follow Button And Block Button -->
		<div class="list-group-item b-under">

			<FollowButton :user="post" :classes="'btn-block input-block-level btn-sm'"></FollowButton>
						
		</div>

	</div>
	
</template>

<script>

	import FollowButton from '../userBuilders/FollowButton'

	export default {

		name 			 : "PostOptions",
		components : {
			FollowButton
		},
		data 			 : function(){
			return {};
		},
		props 		 : ['post'],


	};
	
</script>

<style scoped>
	
	.b-under{

		border: 0;
		border-bottom: .05em solid rgba(211, 211, 211, .4);
		margin-bottom: .5px;

	}

	.no-border{
		border : 0;
	}

	.media{
		width: 100%;
	}

	@media only screen and(max-width: 700px){

		.list-group{

			border-radius: 8px;

		}

	}

</style>