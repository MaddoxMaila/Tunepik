<template>

	<div class="wrappper">
		
		<div :class="[text.getActivity().me ? right : left]">
										
			<div class="media">
				
				<div class="media-left self-align-end">
					
					<span class="app-grey-text-sm ml-1" v-if="text.getActivity().me">
						{{ text.getMessage().time }} {{ text.getMessage().date }}
					</span>
					<image-loader 
							:src="text.getImgs().profile" 
							:placeholder="text.getImgs().profile"
							width="15px"
						  height="15px" 
						  class="rounded-circle" 
						  v-else />

				</div>

				<div class="media-body ml-2">
					
					<MediaBodySwitch :post="text" v-if="text.getMessage().type != 'text' || text.getMessage().type == ''"></MediaBodySwitch>

					<div class="space-small"></div>

					<div class="app-message-bubble pl-1">
						
						<span class="app-post-text">
							{{ text.getMessage().message }}
						</span>

					</div>

				</div>

				<div class="media-right align-self-end">
					
					<image-loader 
							:src="text.getImgs().profile"
							:placeholder="text.getImgs().profile"
							width="30px" 
							height="30px" 
							class="rounded-circle" 
							v-if="text.getActivity().me" />

					<span class="app-grey-text-sm ml-1" v-else>
						{{ text.getMessage().time }} {{ text.getMessage().date }}
					</span>

				</div>

			</div>

		</div>

	</div>
	
</template>

<script type="text/javascript">

	import MediaBodySwitch from '../postBuilders/MediaBodySwitch'
	
	export default {

		name 		: "TextBubble",
		data 		: function(){
			return {
				left    : 'app-left-message app-message',
				right   : 'app-right-message app-message',
			}
		},
		props 	: ['text'],
		components : {

			MediaBodySwitch

		}

	};
	
</script>

<style type="text/css" scoped>
	
</style>