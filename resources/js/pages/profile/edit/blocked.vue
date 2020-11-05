<template>

	<div class="wrapper">
		
			<Navigation v-if="screen">
				
				<div class="media-body">
					
					<center>
						<span class="app-max-text">
							Blocked Accounts
						</span>
					</center>

				</div>
				<div class="media-right p-3"></div>

			</Navigation>
			<div class="mb-2" v-else>
				
				<span class="app-max-text pl-2 block-text">
					Blocked Accounts
				</span>
				<span class="app-grey-text-lg">
					Unblock User Accounts You Have Blocked
				</span>

			</div>
			<div class="visible-xs space-large"></div>
			<div class="visible-xs space-large"></div>
			<template v-if="blocked.loading">
				
				<UserListSkeleton></UserListSkeleton>

			</template>
			<template v-else>
				
				<div class="app-deleted-post grey-matter" v-if="blocked.error">
					
					<center>
						<span class="app-small-text">
							{{ blocked.message }}
						</span>
					</center>

				</div>
				<div class="list-group" v-else>
					
					<div class="list-group-item" v-for="(user, index) in blocked.users">
					
						<UserRowBuilder :user="user"></UserRowBuilder>

					</div>

				</div>

			</template>


	</div>
	
</template>

<script type="text/javascript">

	import axios from 'axios'
	import globs from '../../../tunepik/attack.js'
	import UserListSkeleton from '../../../components/builders/skeletonBuilders/UserListSkeleton'
	import Navigation from '../../../components/mobile/root/Navigation'
	import UserRowBuilder from '../../../components/builders/userBuilders/UserRowBuilder'

	export default {

		name  : "Blocked",
		scrollToTop : false,
		data  : function(){

			return {

				blocked : {

					loading  : false,
					list     : false,
					error 	 : false,
					message  : '',
					users    : []

				},
				screen : globs.app.isMobile,

			}

		},
		components : {

			UserListSkeleton,
			Navigation,
			UserRowBuilder

		},
		methods : {

			getBlocked : async function(){

				 this.blocked.loading = true;

				 const { data } = await axios.get('/api/user/blocked');

				 this.blocked.error = data.error;
				 this.blocked.message = data.message;

				 this.blocked.loading = false;

				 if(!data.list) return;

				 data.users.forEach((user, index) => {

				 		this.blocked.users.push(new globs.model.user(user.user_info));

				 });


			}


		},
		computed : {


		},
		mounted : function(){

			this.$nextTick(function(){

				this.getBlocked();

			});

		}

	};
	
</script>

<style type="text/css" scoped>

	@media only screen and (max-width: 700px){

		.wrapper{
			z-index: 9999 !important;
			position: fixed;
			top : 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			overflow-y: auto;
			background-color: #fff;

		}

	}

	
</style>