<template>
  
  <div class="root-element">

  	<template v-if="screen">
  		
	  	<nav class="navbar fixed-top home-nav">
	  		
	  		<div class="media" style="width : 100%">

	  			<!-- <div class="home-options-wrapper align-self-center mr-2">
	  		  
		  		  <span class="options-icon-wrapper">
		  		     
		  		     <svg-vue icon="menu" class="app-icon top-nav-icon"></svg-vue>

		  		  </span>

	  		  </div> -->
	  			
	  			<div class="media-body align-self-center">
	  			
	  				<span class="app-max-text">
	  					Tunepik
	  				</span>
	  				
	  			</div>

	  			<div class="align-self-center">
	  				<center>
	  					<span class="mr-2" style="display:inline-block;position:relative;top:-4.5px;">
		  					<router-link :to="{ name : 'search' }">
			  					<!-- <svg-vue icon="search" class="app-icon" style="height:33px;width:33px;"></svg-vue> -->
			  					<Icon :icon="'search'" :width="28" :height="28"></Icon>
			  				</router-link>
		  				</span>
	  					<span  style="display:inline-block;position:relative;bottom:-1px;">
	  						<clipper-upload :accept="imgs" v-model="image.src">
	  							<i class="fa fa-camera app-fa"></i>
	  						</clipper-upload>
		  				</span>
		  				
	  				</center>
	  			</div>

	  		</div>

	  	</nav>

  	</template>

  	<div class="space-large" ></div>
  	<div class="space-medium visible-xs"></div>
  	<div class="space-large visible-lg"></div>

  	<!-- <div class="space-large d-sm-none d-lg-block"></div> -->

  	<div class="main-show row">
  		
  		<div class="col-lg-7">

  			<div class="space-medium visible-lg"></div>
  			
  			<FeedPosts ></FeedPosts>

  		</div>

  		<!-- Show Only In Desktops -->
  		<template v-if="!screen">
  			
  			<div class="col-lg-5">
  				
  				<div class="space-medium"></div>

  				<!-- Show The Right Side Views -->
  				<RightSideBuilder ></RightSideBuilder>
  			
  		  </div>

  		</template>

  	</div>

  </div>

</template>

<script>

 import globs from '../tunepik/attack.js'
 import RightSideBuilder from '../components/desktop/homeComp/RightSideBuilder'
 import { mapGetters, mapActions, mapMutations } from 'vuex'

 export default {
	name 				: 'Home',
	scrollToTop : false,
	components 	: {

		RightSideBuilder

	},
	data 				: function () {
			
			return {

				screen : globs.app.isMobile,
				imgs   : '*.png, *.jpeg, *.jpg '

			}

	},
	methods  : {

		...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),

	},
	computed : {

		...mapGetters("files", ['image'])

	},
	watch  : {

		'image.src' : function(val){

			this.isFile(val != "");
		 	this.done(val == "")
			this.isSet(val != "");
			this.chosen(val != "");

			this.$router.push({ name : 'createPost' });

		}

	},
  middleware: 'auth',
  metaInfo () {
    return { title: this.$t('home') }
  }
};
</script>

<style scoped>

  .topnav-icon-round{

    border-radius: 20px;
    /*-webkit-box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);
    box-shadow: 0 .5px 1px rgba(0, 0, 0, .175);*/

  }

  .app-fa{

  	width 	: 24px;
		height 	: 24px;

  }
	.top-nav-icon{
		width 	: 30px;
		height 	: 30px;
	}
	.navbar{
		box-shadow : 0 .5px 1px 0 rgba(211, 211, 211, .4);

	}
	.home-nav{
		height : 45px;

	}

</style>
