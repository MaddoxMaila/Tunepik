<template>

		<div class="wrapper list-group-item p-1 mb-1">
			
			<div class="media">
				
				<div class="media-left ml-2">

					<img class="rounded-circle" height="30" width="30" :src="comment.getImgs().profile" />
					
				</div>
				<div class="media-body ml-1">
					
					<router-link v-bind:to="{ name : 'profile', params : { username : comment.getBasic().handle } }">
					
						<span class="app-bold-text block-text pl-2">
							{{ comment.getBasic().name }}
						</span>

					</router-link>

						<template v-if="comment.getPost().type == 'deleted'">
						
							<DeletedBodyBuilder :post="comment"></DeletedBodyBuilder>

						</template>
						<template v-else>
							
							<TextBodyBuilder :post="comment"></TextBodyBuilder>

						</template>

						<MediaBodySwitch :post="comment" v-if="comment.getPost().type != 'deleted' && comment.getPost().type != 'text'"></MediaBodySwitch>

						<span class="app-grey-text-sm mt-1 pl-2" style="display:block">{{ comment.getPost().time }} {{ comment.getPost().date }}</span>

				</div>
				<div class="media-right align-self-end m-1">
					
					<a href="#" class="pr-1">
							
						<span class="comment-like-icon">
							
							<svg-vue icon="heartEmpty" class="app-icon comment-icon"></svg-vue>

						</span>

					</a>

				</div>

			</div>

		</div>
	
</template>

<script>

	import globs from '../../../tunepik/attack.js'
  import DeletedBodyBuilder from '../postBuilders/DeletedBodyBuilder'
  import TextBodyBuilder from '../postBuilders/TextBodyBuilder'
  import MediaBodySwitch from '../postBuilders/MediaBodySwitch'
	
	export default {

		name 				: "CommentBodyBuilderTwo",
		components 	: {

			DeletedBodyBuilder,
			TextBodyBuilder,
			MediaBodySwitch

		},
		props 			: ['comment'],
		data    		: () => {

      return {

        screen : globs.app.isMobile

      }

    }

	};
	
</script>

<style scoped>
	
	.comment-icon{

		width : 15px;
		height : 15px;

	}

	.list-group-item{

		border : 0;
		border-bottom: .04em solid rgba(211, 211, 211, .4);
		padding: 0;

	}

</style>