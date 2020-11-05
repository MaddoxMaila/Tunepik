<template>

		<div class="wrapper card no-border">
			
			<Navigation v-if="screen">
				
				<div class="media-body">
					
					<center>
						<span class="app-max-text">
							Messages
						</span>
					</center>

				</div>
				<div class="media-right align-self-center">
					
					<span class="mr-3" style="">
		  					
		  		</span>

				</div>

			</Navigation>
			<div class="card-header" v-else>
				
				<div class="media-body">
					
					<center>
						<span class="app-max-text">
							Messages
						</span>
					</center>

				</div>
				<div class="media-right"></div>

			</div>
			<div class="card-body" v-if="chat.loading">
				
				<div class="space-large visible-xs"></div>
				<div class="space-medium visible-xs"></div>
				<ChatsSkeleton></ChatsSkeleton>

			</div>
			<div class="card-body" v-else>
				 	
				 	<div class="space-large visible-xs"></div>
				 	<div class="space-small visible-xs"></div>

				 	<div class="space-large visible-xs" v-if="chat.error"></div>
				 	<div class="pr-2 pl-2 app-deleted-post grey-matter" v-if="chat.error">
				 		
				 		<center>
				 			<span class="app-small-text">
				 				{{ chat.message }}
				 			</span>
				 		</center>

				 	</div>
				 	<div class="list-group pt-1">
				 		
				 		<div class="list-group-item p-3">
				 			<SearchChat></SearchChat>
				 		</div>

				 		<div class="list-group-item p-2" v-for="(message, i) in chat.chats" :key="i">
				 				
				 				<router-link :to="{ name : 'messages', params : { username : message.getBasic().handle } }">
				 					
				 					<div class="media">
				 						
				 						<div class="media-left">
				 							
				 							<image-loader 

				 									:src="message.getImgs().profile"
				 									:placeholder="message.getImgs().profile"
				 									width="30px"
				 									height="30px"
				 									class="rounded-circle"
				 							/>

				 						</div>
				 						<div class="media-body pl-2">
				 							
				 							<span class="block-text app-bolder-text">
				 								{{ trim(message.getBasic().name, 20) }}
				 							</span>
				 							<span class="app-post-text" v-if="message.getChat().type == 'text'">
				 								
				 								{{ trim(message.getChat().message, 25) }}

				 							</span>
				 							<span class="app-post-text" v-else>
				 								{{ message.getBasic().name }} sent a {{ message.getChat().type }}
				 							</span>

				 							<span class="block-text app-grey-text-sm">
				 								{{ message.getChat().time }} {{ message.getChat().date }}
				 							</span>

				 						</div>
				 						<div class="media-right align-self-center">
				 							
				 							<div class="app-badge">
				 								{{ message.getChat().count }}
				 							</div>

				 						</div>

				 					</div>

				 				</router-link>

				 		</div>

				 	</div>


			</div>


		</div>
	
</template>

<script type="text/javascript">

		import { mapActions, mapGetters } from 'vuex'
		import globs from '../../../tunepik/attack.js'
		import Navigation from '../../mobile/root/Navigation'
		import SearchChat from './SearchChat'
		import ChatsSkeleton from '../skeletonBuilders/ChatsSkeleton'

		export default {

			 name 			: "ChatsList",
			 scrollToTop : false,
			 data 			: function() {
			 	  return {
			 	  	screen : globs.app.isMobile,
			 	  	trim   : globs.trim,
			 	  }
			 },
			 components : {

			 	 Navigation,
			 	 ChatsSkeleton,
			 	 SearchChat

			 },
			 methods     : {

			 	...mapActions("messages", ['getChats']),

			 },
			 computed    : {

			 	...mapGetters("messages", ['chat'])

			 },

			 mounted      : function(){

			 	 this.$nextTick(function(){

			 	 	this.getChats();

			 	 });

			 }

		};
	
</script>

<style type="text/css" scoped>

	.list-group-item{

		border: 0;
		/*border-bottom: .03em solid rgba(211, 211, 211, .4);*/

	}
	.card-body,
	.card{

		padding: 0;
		box-shadow: 0 0 0 0 transparent;

	}
	
</style>