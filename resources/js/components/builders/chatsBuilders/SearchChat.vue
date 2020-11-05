<template>

		<div class="wrapper pb-2" style="border-bottom:.04em solid rgba(211, 211, 211, .4);">
			
			<span class="app-bolder-text mb-2">Start A New Conversation</span>
			<div class="header-wrap grey-matter">
				
				<div class="media fill-width">
					<div class="media-right align-self-center p-1">
						<Icon :icon="'search'" :width="22" :height="22"></Icon>
					</div>
					<div class="media-body fill-width align-self-center">
						<input type="text" placeholder="search" class="fill-width app-search-chat" name="q" v-on:keyup="q = $event.target.value">
					</div>
				</div>

			</div>
			<div class="loader" v-if="search.loading">

				<center>
					<div class="app-loader"></div>
				</center>
				
			</div>

			<div v-else>

				<div v-if="!search.data.users.found">
					
					<center>
						<span class="app-small-post">
							{{ search.data.users.message }}
						</span>
					</center>

				</div>
				<div class="list-group mt-2" v-else>
					
					<div class="list-group-item list-group-item-action p-1 no-border mb-2" v-for="(user, i) in search.data.users.list" :key="i">

						<div class="media">
			
						<!-- User Image! -->

						<img class="rounded-circle" width="35" height="35" :src="'' + user.getImgs().profile" />

						<div class="media-body ml-3">
							
							<span class="name-wrapper">
									
									<span class="app-bolder-text">
										{{ user.getBasic().name }}
									</span>

								</span>
								<div class="text-breaker"></div>
								<span class="app-grey-text" v-if="user.getInfo().bio == null">
									<i class="app-fa fas fa-calendar-alt mr-1"></i>
									Joined On {{ user.getBasic().date }}
								</span>
								<span class="app-post-text" v-else>

									{{ user.getInfo().bio }}

								</span>

							</div>

							<!-- User Follow Btn Wrapper -->
							<div class="user-follow-btn align-self-center">
								
								<router-link :to="{ name : 'messages', params : { username : user.getBasic().handle } }" class="btn btn-info btn-block btn-sm">
									message
								</router-link>

							</div>

						</div> <!-- End Of Header Media -->

					</div>

				</div>


			</div>

		</div>
	
</template>

<script type="text/javascript">

	import { mapGetters, mapActions } from 'vuex'
	
	export default {

		name 		: "SearchChat",
		data 		: function(){
			return {
				q : ''
			}
		},
		methods : {

			...mapActions("find", ['getSearch'])

		},
		computed : {

			...mapGetters("find", ['search'])

		},
		watch : {

				q : function(newValue, oldValue){

					if(newValue == oldValue) return

				  this.getSearch(newValue);

				}

			}


	};
	
</script>

<style type="text/css" scoped>

	.header-wrap{
		border : .04em solid rgba(211, 211, 211, .4);
		border-radius: 20px
	}

	.app-search-chat{
		width: 100%;
    border: none;
    font-size: 12pt;
    float: left;
    color: #63717f;
    padding-left: 4px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 2px;
    outline : 0;
    background-color: transparent;
	}
	
</style>