<template>

	<div class="snackbar" v-show="snackbar.isOpen" :class="[snackbar.theme]" >
		
		<div class="media">
			
			<div class="media-body">
				
				<span class="app-post-text">
					{{ snackbar.message }}
				</span>

			</div>
			<div class="media-right align-self-center">
				
				<a class="remove-btn" @click="SNACK_BAR({ isOpen : false })">
					
					<i class="fa fa-time app-fa"></i>

				</a>

			</div>

		</div>

	</div>
	
</template>

<script type="text/javascript">
	
	import { mapGetters, mapMutations } from 'vuex'

	export default {

		name 		: 'Snackbar',
		methods  : {

			...mapMutations('tunepik', ['SNACK_BAR']),

		},
		computed : {

			...mapGetters('tunepik', ['snackbar'])

		}

	};
	
</script>

<style type="text/css" scoped>

	.danger{

		background-color: red;

	}

	.info{

		background-color: #5bc0de;

	}

	.app-fa{
		width : 16px;
		height: 16px;
	}
	
</style>