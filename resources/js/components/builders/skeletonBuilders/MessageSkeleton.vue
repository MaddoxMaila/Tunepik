<template>

	<div class="wrapper">
		
		<div class="list-group">
			
			<div class="list-group-item" v-for="(item, key) in limit" :key="key">
				
				<div :class="[item%2 == 0 ? right : left]">
					
					<div class="media">
							
							<div class="skeleton-shimmer skeleton-image" v-if="item%2 != 0"></div>

						<div class="media-body">
							
							<div class="bubble-text-shade skeleton-shimmer"></div>

						</div>

							<div class="skeleton-shimmer skeleton-image" v-if="item%2 == 0"></div>

					</div>

				</div>

			</div>

		</div>

	</div>
	
</template>

<script type="text/javascript">
		
		import globs from '../../../tunepik/attack.js'

	export default {

		name 		: "MessageSkeleton",
		data 		: function(){

			return {
				limit 	: globs.limit,
				left    : 'app-left-message app-message',
				right   : 'app-right-message app-message',
			};

		}

	};
	
</script>

<style type="text/css" scoped>

		.bubble-text-shade{

			height: 30px;
			width: 50%;
			border-radius: 10px;

		}

		.list-group-item{
			border : 0;
		}
	
</style>