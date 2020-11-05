<template>

	<div class="wrapper">
	   
	   <masonry :cols="3" :gutter="0">
	   		
	   		<div class="skeleton-shimmer block-shade" v-for="(item, i) in list"></div>

	   </masonry>

	</div>
	
</template>

<script>

  import globs from '../../../tunepik/attack.js'

  export default {

  	name 		 : "GridSkeleton",
  	data 		 : function(){

  		return {

  			list  : globs.limit

  		}

  	}


  };
	
</script>

<style scoped>

		@media screen only and (min-width: 700px){

			.block-shade{

				width: 33.9%;
				height: 250px;
				margin: 1.5px;

			}

		}

		@media screen only and (max-width: 700px){

			.block-shade{

				width: 140px;
				height: 140px;
				margin: 1.5px;

			}

		}
	
</style>