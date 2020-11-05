<template>

		<div class="wrapper">

			<PopUpWindow :heade="header" :show="SHOW" v-if="user.getActivity().youBlock">
				
				<div class="list-group">
					
					<div class="list-item-group">
						
						<center>
							<span class="app-small-text">
								Are You Sure Want To Unblock This Account
							</span>
						</center>

					</div>
					<div class="list-item-group">
						
					<button class="btn btn-sm btn-info mobile-share-control-btn send-post-xs yes" @click="block()">Unblock</button>
				   <button class="btn btn-sm btn-danger mobile-share-control-btn cancel-post-xs no" @click="toggle()">Cancel</button>

					</div>

				</div>

			</PopUpWindow>
			
			<button :class="[classes, user.getActivity().youBlock ? danger : success]" class="btn" @click="user.getActivity().youBlock ? toggle() : block()">
				<div class="spinner-grow text-success spinner-grow-sm" role="status" aria-hidden="true" v-if="block.loading"></div>
				<span v-else>
					{{ user.getActivity().youBlock ? 'Unblock' : 'Block' }}
				</span>

			</button>


		</div>
	
</template>

<script type="text/javascript">

		import axios from 'axios'
		import PopUpWindow from '../popupBuilders/PopUpWindow'

		export default {

			name  			: "BlockButton",
			components  : {

				PopUpWindow

			},
			data 				: function(){

				return {

				  success : 'btn-success',
				  danger  : 'btn-danger',
				  show    : false,
					block : {

							loading : false,
							message : '',
							error   : false,

					}

				}

			},
			props    : ['User', 'class'],
			methods  : {

				toggle : function(){

					this.SHOW = !this.SHOW;

				},
				block  : async function(){

						this.block.loading = true

						const { data } = await axios.post(`/api/react/block/${this.user.getBasic().id}`);

						this.block.error = data.error;
						this.block.message = data.message;

						this.user.getActivity().youBlock = data.blocked;

						this.block.loading = false;

				}

			},
			computed : {

				user  : {

					get(){

						return this.User;

					},
					set(user){

						this.User = user;

					}

				},

				SHOW  : {

					get(){ return this.show; },
					set(val){ this.show = val; }

				},
				header : function(){

					return `Unblock @${this.user.getBasic().handle}`;

				}


			}

		};
	
</script>

<style type="text/css" scoped>

  .list-group-item{

  	border: 0;

  }
	
</style>