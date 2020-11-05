<template>


		<div class="wrapper">
			
			<Navigation v-if="screen && checks.done">
				
				<div class="media-body align-self-center">

						<span class="app-max-text">
							{{ header }}
						</span>

				</div>

			</Navigation>

			<div class="visible-xs space-large"></div>
			<div class="visible-xs space-large"></div>
			<div class="visible-xs space-large"></div>
			<div class="visible-xs space-large"></div>

			<WorkFiles :round="avatar" v-if="file" class="work-file" ref="workfile"></WorkFiles>

			<UploadCover></UploadCover>

			<div class="navbar fixed-bottom bg-white container" v-if="checks.done && file">
			 	
			 	<button class="btn btn-sm btn-info mobile-share-control-btn send-post-xs yes" @click="userUpload(form)">Update</button>

				<button class="btn btn-sm btn-danger mobile-share-control-btn cancel-post-xs no" @click="back()">Cancel</button>

			</div>


		</div>

	
</template>

<script type="text/javascript">
		
		import { mapGetters, mapActions, mapMutations } from 'vuex'
		import Navigation from '../../../mobile/root/Navigation'
		import globs from '../../../../tunepik/attack.js'
		import WorkFiles from '../../uploadBuilders/WorkFiles'
		import UploadCover from '../../uploadBuilders/UploadCover'

		export default {

			name  : "ChangeAvatar",
			components : {

				Navigation,
				WorkFiles,
				UploadCover

			},
			data : function(){

				return {
					screen      : globs.app.isMobile,
				/*	form 				: {

							text 	: '',
							media : this.uploadedfile,
							url   : this.url

						}
*/
				}

			},
			props : ['avatar'],
			methods  : {

				...mapActions("upload", ['userUpload']),
				...mapActions("files", ['cancel']),
				...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),
				back : function(){

					this.cancel();
					history.back();

				}

			},
			computed : {

				...mapGetters("upload", ['upload']),
				...mapGetters("files", ['image', 'checks', 'file']),
				uploadedfile  : function(){

				  	return this.image.file || '';

				},
				form  : function(){

					return {
									media : this.uploadedfile,
									text  : '',
									url : this.avatar ? '/api/upload/profile' : '/api/upload/cover'
								}

				},
				header : function(){

					return this.avatar ? 'Change Avatar' : 'Change Cover'

				},
				page : function(){

					return {

						url 		: this.avatar ? 'profile' : 'cover',
						rounded : this.avatar,
						header  : this.avatar ? 'Edit Avatar' : 'Edit Cover'

					}

				}

			},
			watch : {

				uploadedfile : function(val){

					this.form.media = val

				},

				file : function(val){

					console.log(val);

				}

			}

		};

</script>

<style type="text/css" scoped>
	
	@media only screen and (max-width: 700px){

		.wrapper{

			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background: #fff;
			/*z-index: 99999 !important;*/
			overflow-y: auto;

		}

	}

</style>