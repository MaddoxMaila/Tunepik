<template>
	
	<div class="wrapper">

		<div class="list-group" v-for="(item, i) in list">
			
			<div class="list-group-item">
				
				<div class="media">
					
					<div class="media-left skeleton-shimmer skeleton-image"></div>
						
					<div class="media-body ml-1">
						
						<div class="skeleton-shimmer skeleton-name"></div>
						<div class="skeleton-shimmer block-shde"></div>

						<div class="skeleton-shimmer date-shade mt-2"></div>

					</div>
					<div class="media-right align-self-end">
						
						<div class="options-shade skeleton-shimmer"></div>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script type="text/javascript">

  import globs from '../../../tunepik/attack.js'
	
	export default {

			name 			: "CommentSkeleton",
			data 			: function(){

				return {

					list 	: globs.limit,

				}

			},

	};

</script>

<style type="text/css" scoped>
	
	.date-shade{

  	width: 100px;
  	height: 15px;
  	border-radius: 6px;

  }

  .options-shade{

  	width: 20px;
  	height: 20px;
  	border-radius: 15px;

  }

	.block-shade{

		width: 100%;
		height: 100px;

	}

	.list-group-item{

		border : 0;
		border-bottom: .04em solid rgba(211, 211, 211, .4);

	}

</style>