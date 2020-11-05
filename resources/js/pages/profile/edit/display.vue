<template>
	
	<div class="wrapper card no-border">
		
		<Navigation v-if="screen">
			
			<div class="media-body">
				
				<center>
					<span class="app-max-text">
						Display
					</span>
				</center>

			</div>
			<div class="media-right pl-2 pr-2">
				
			</div>

		</Navigation>
		<div class="card-header" v-else>
			
			<center>
				<span class="app-max-text">
					Display
				</span>
			</center>

		</div>
		<div class="card-body">

			<div class="space-large visible-xs"></div>
			<div class="space-medium visible-xs"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>
			<div class="space-large"></div>

			<center>
				<div class="row-wrap">
					
					<a class="theme-chooser" @click="toggleTheme('theme-light')">
						<div class="block-inline item-block mr-1 light">
							<span class="app-bolder-text it-text" style="color:#111;">
								
								Default

							</span>
						</div>
					</a>

					<a class="theme-chooser" @click="toggleTheme('theme-dark')">
						<div class="ml-1 block-inline item-block dark">
							<span class="app-bolder-text it-text" style="color:#fff;">
								
								Dark City

							</span>
						</div>
					</a>
					<!-- <div class="block-inline item-block">
						
						<span class="app-bolder-text"></span>

					</div> -->

				</div>
			</center>

		</div>


	</div>

</template>

<script type="text/javascript">
	
	import Navigation from '../../../components/mobile/root/Navigation'
	import globs from '../../../tunepik/attack.js'
	import { mapGetters, mapActions } from 'vuex'

	export default {

		name 		: "Display",
		data 		: () => {

			return {

				screen   : globs.app.isMobile

			};

		},
		components : {

			Navigation

		},
		computed : {

			...mapGetters("tunepik", ['theme']),

		},
		methods  : {

			...mapActions("tunepik", ['toggleTheme'])

		}

	};

</script>

<style type="text/scss" scoped>
	
	@media only screen and (max-width: 700px){

		.item-block{

			width: 40%;
			height: 100px;
			border: .05em solid rgba(211, 211, 211, .4);
			border-radius: 10px;

		}

		.wrapper{
			z-index: 9999 !important;
			position: fixed;
			top : 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			overflow-y: auto;
			background-color: #fff;

		}

	}

	@media only screen and (min-width: 700px){

		.item-block{

			width: 100px;
			height: 100px;

		}
		
	}

	.dark{

		background-color: #111

	}

	.light{

		background-color: #fff;

	}

	.block-inline{
		display: inline-block;
	}

	.dark > .app-bolder-text{

		color: #fff;

	}

	.light > .app-bolder-text{
		color: #111;
	}

	.it-text{
		margin-top: auto;
	}

</style>