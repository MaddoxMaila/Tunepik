<template>

	<div class="add-post-root">
		
		 <Navigation v-if="record.done && checks.done">
		 	
		 		<div class="media-body">
		 			
		 			<center>
		 				<span class="app-max-text">
		 					Compose Post
		 				</span>
		 			</center>

		 		</div>

		 </Navigation>
		 <div class="space-large"></div>
		 <div class="space-large"></div>
		 <div class="space-large"></div>

		 <WorkFiles :round="false" v-if="file"></WorkFiles>
		 <AudioRecorder v-else></AudioRecorder>

		 <UploadCover></UploadCover>



		 <!-- Bottom Navigation! -->

		 <div class="navbar fixed-bottom mobile-share-control" v-if="record.done && checks.done">
		 	
		    <form class="add-post-form-xs" style="width: 100%;" @submit.prevent="userUpload(data)">
					<div class="media" style="width: 100%;">
						<div class="media-left media-middle">
							<center>
								<img class="add-post-img media-object img-circle" width="35" height="35" />
							</center>
						</div>
						<div class="media-body input-wrapper-xs ml-1">
							<textarea v-model="data.text" class="upload-text app-input-field" placeholder=" Add text/@mentions"></textarea>
						</div>
						<div class="media-right media-middle app-create-right self-align-center ml-2">

							<div class="space-small"></div>
								
								<clipper-upload v-model="image.src">
									
									<svg-vue icon="gallery" class="app-icon"></svg-vue>
								
								</clipper-upload>

					  </div>
				</div>
					<div class="space-small"></div>
					<div class="button-wrapper" style="width: 100%;">
						
						<button class="btn btn-sm btn-info mobile-share-control-btn send-post-xs yes">Share</button>

				    <button class="btn btn-sm btn-danger mobile-share-control-btn cancel-post-xs no" @click="history.back()">Cancel</button>

					</div>
				</form>

			</div>

	</div>


</template>


<script>

		import { mapGetters, mapActions, mapMutations } from 'vuex'
		import Form from 'vform'
		import Navigation from './Navigation'
		import AudioRecorder from '../../builders/uploadBuilders/AudioRecorder'
		import WorkFiles from '../../builders/uploadBuilders/WorkFiles'
		import UploadCover from '../../builders/uploadBuilders/UploadCover'

		export default {

			name 				: "AddPost",
			scrollToTop : false,
			data 				: function(){

				return {

					data : {
						text  	: '',
						media 	: this.uploadedFile,
						url     : '/api/upload/post'
					},

				};

			},
			components 	: {

				Navigation,
				AudioRecorder,
				WorkFiles,
				UploadCover

			},
			methods 		: {

				...mapActions("recorder", ['init', 'toggleRecording', 'startRecording', 'stopRecording']),
				...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),
				...mapActions("upload", ['userUpload']),
				/*...mapActions("files", ['isSet', 'chosen']),*/

			},
			computed 		: {

				...mapGetters("recorder", ['record']),
				...mapGetters("files", ['image', 'checks', 'file']),
				...mapGetters("upload", ['upload']),
				uploadedFile : function(){

						if(this.record.audio.file == null && this.image.file == null){

							console.log('NULLLLL')

						 	 return ''

						 }else{

						 	console.log('IS THERERERER')

						 	 return this.record.audio.file || this.image.file;

						 }

				}

			},
			watch 			 : {

				'image.src' : function(val){

				 	/*this.$store.commit('files/isSet', val != "");
				 	this.$store.commit('files/chosen', val != "")*/

				 	this.isFile(val != "");
				 	this.done(val == "")
					this.isSet(val != "");
					this.chosen(val != "");

				},
				uploadedFile : function(val){

					console.log('CHANGED!');
					this.data.media = val;

					console.log(this.data);

				}

			}

		};
	
</script>

<style>

  .add-post-root{

  	z-index: 9999 !important;
  	position: fixed;
  	top: 0;
  	bottom: 0;
  	right: 0;
  	left: 0;
  	height: 100%;
  	width: 100%;
  	background-color: white;

  }

  .input-wrapper-xs{
  	border-bottom: .05em solid rgba(211, 211, 211, .6);
  }

  .mobile-share-control{
  	border-top: .05em solid rgba(211, 211, 211, .4);
  	width: 100%;
  	background-color: #fff;
  }	
</style>