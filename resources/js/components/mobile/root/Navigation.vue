<template>

	<nav class="navbar fixed-top">
		
		<div class="media" style="width : 100%;">
			
			<div class="back-btn-wrapper self-align-center">
				
				<a @click="back()">
					
					<!-- <svg-vue icon="back" class="app-icon"></svg-vue> -->
					<Icon :icon="'back'" :height="24" :width="24"></Icon>

				</a>

			</div>

			<slot />

		</div>

	</nav>
	


</template>

<script>
	
	export default {

		name : "Navigation",
		methods : {

      back : function(){

        window.history.back();

      }

    }

	};

</script>

<style scoped>

  .navbar{

  	height: 45px;
  	box-shadow: 0 .5px .5px rgba(211, 211, 211, .2)

  }
	
</style>