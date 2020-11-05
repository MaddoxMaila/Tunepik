<template>

	<div class="wrapper">
		
		<template v-for="item in limit">
			
			<SinglePostSkeleton></SinglePostSkeleton>

		</template>

	</div>
	
</template>

<script>

		import globs from '../../../tunepik/attack.js'
		import SinglePostSkeleton from './SinglePostSkeleton'

		export default {

			name 			: "PostSkeleton",
			components : {

				SinglePostSkeleton

			},
			data 			 : function(){
				return {
					limit : globs.limit,
				};
			}

		};
	
</script>

<style scoped>

</style>