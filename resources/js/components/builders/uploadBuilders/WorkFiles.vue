<template>

		<div class="wrapper">

			<Navigation v-if="!checks.done">
				
				<div class="media-body align-self-center">
						<span class="app-max-text">
							Edit
						</span>
				</div>
				<div class="media-right align-self-center">
					
					<a class="rotate" @click="rotate()">
						<span class="app-post-text">rotate</span>
					</a>

				</div>

			</Navigation>
			

			<div class="image-worker">

				<div class="work-image" v-if="!checks.done">

					<div class="visible-xs space-large"></div>
					<div class="visible-xs space-large"></div>
					<div class="visible-xs space-large"></div>
					
					<clipper-fixed 
								class="basic clipper-fixed"
								preview="fixed-preview" 
								:round="round" 
								:src="image.src" 
								ref="clipper"
								:rotate="image.rotation"
								:area="98"></clipper-fixed>

					<!-- <center>
						
						<div class="space-medium">
							
							<clipper-range v-model="image.rotation" style="max-width:300px" :min="0" :max="360"></clipper-range>

						</div>

					</center> -->

				</div>
				<div class="visible-xs space-large"></div>
				<div class="visible-xs space-large"></div>
				<div class="visible-xs space-large"></div>
				<div class="show-image" v-if="checks.done && image.file != null">
					
						<div class="app-image-body">
							
							<img :src="image.url" class="img-fluid" />

						</div>

						<div class="media mb-2">
					  	<div class="media-body"></div>
					  	<div class="media-right pr-3">
					  		
					  		<a @click="cancel" class="remove">
					  				
					  				<i class="fa fa-times app-fa"></i>

					  		</a>

					  	</div>
					  </div>

				</div>

			</div>

			<div class="navbar fixed-bottom bg-white container" v-if="!checks.done">
				
				<button class="btn btn-sm btn-info mobile-share-control-btn send-post-xs yes" @click="crop()">Done</button>
				<button class="btn btn-sm btn-danger mobile-share-control-btn cancel-post-xs no" @click="cancel()">Cancel</button>

			</div>

		</div>
	
</template>

<script type="text/javascript">

	import { mapGetters, mapActions, mapMutations } from 'vuex'
	import { clipperFixed } from 'vuejs-clipper'
	import Navigation from '../../mobile/root/Navigation'
	
	export default {

		name 		: 'WorkFiles',
		components : {

			Navigation

		},
		props   : ['round'],
		methods : {

			...mapActions("files", ['crop', 'cancel']),
			...mapMutations("files", ['clipper', 'isSet']),
			rotate : function(){

				if(this.image.rotation >= 360) this.image.rotation = 0;
				else {
					
					this.image.rotation += 90

				}

			},

		},
		computed : {

			...mapGetters("files", ['image', 'checks', 'file']),
			cropper : function(){

				return this.$refs.clipper;

			},

		},

		mounted : function(){

			this.$nextTick(function(){

				console.log(this.$refs);

				if(this.image.src != ""){

					console.log(this.cropper);

					this.clipper(this.cropper);

				}

			});

		},

		watch : {

			'checks.done' : function(val){

				 if(val == false){

				 	this.clipper(this.cropper);

				 }

			}

		}

	};
	
</script>

<style type="text/css" scoped>
	
	.app-image-body,
	.work-image{

		border : .05em solid rgba(211, 211, 211, .4);

	}

	@media only screen and (max-width: 700px){

		.show-image{

		}

	}

</style>