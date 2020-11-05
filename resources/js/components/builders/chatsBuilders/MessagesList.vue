<template>

	<div class="wrapper card">
		
		<!-- LOADING FOR USER FETCHING -->
		<template v-if="user.loading">
			
		</template>
		<template v-else>
			<div class="make-one">
			<Navigation v-if="screen">
			
				<div class="media-body">
					<center>
						<span class="app-max-text">
							<router-link :to="{ name : 'profile', params : { username : username } }">
								{{ trim(username, 20) }}
							</router-link>
						</span>
					</center>
				</div>
				<div class="media-right align-self-center">

					<span class="icon-wrapper p-1">
						
						<a class="options">
							<i class="fa fa-cog app-fa"></i>
						</a>

					</span>
					
				</div>

			</Navigation>
			<div class="card-header" v-else></div>
			
					<template v-if="message.loading">
						
						<!-- LOADING SKELETON FOR MESSAGES -->
						<MessageSkeleton></MessageSkeleton>

					</template>
					<template v-else>
							
						<div class="card-body">
							<div class="visible-xs space-large"></div>
							<div class="visible-xs space-medium"></div>

							<div class="p-2" v-if="message.error || user.error">
								
								<center>
									<h3>
										{{ message.message || user.message }}
									</h3>
								</center>

							</div>
							<div v-else>

								<div class="profile-wrapper p-2">
								
								<center>
									
									<div class="profile-wrap mb-1">
										<router-link :to="{ name : 'profile', params : { username : user.model.getBasic().handle } }">
											<image-loader :src="user.model.getImgs().profile" width="90px" height="90px" class="rounded-circle" />
										</router-link>

									</div>
									<span class="app-bolder-text">
										{{ trim(user.model.getBasic().name, 15) }}
									</span>
									<UserFollowsBuilder :user="user.model"></UserFollowsBuilder>

									<div class="user-bio m-2" style="width: 90%;">
            
				            <span class="app-post-text">
				              
				              {{ user.model.getInfo().bio }}

				            </span>

				          </div>

								</center>

								<hr />

							</div>
								
								<div class="list-group">

								<div class="list-group-item p-1" v-for="(text, i) in message.messages" :key="i">
										
									<TextBubble :text="text"></TextBubble>

								</div>

								</div>

							</div>

						</div>

					</template>

					<div class="space-large"></div>
					<div class="space-large"></div>
					<div class="space-large"></div>

					<div class="file-wrapper bg-white" v-if="file">
						
						<WorkFiles :round="false"></WorkFiles>

					</div>

					<div class="navbar fixed-bottom bg-white" v-if="screen">
						
						<div class="media-wrapper" style="width:100%;">
							
							<form style="width:100%;" @submit.prevent="sendMessage(formDATA)">
								
								<div class="media " style="width:100%;">

									<div class="media-left align-self-center" v-if="record.isRecording">
										
										<a class="icon-wrapper p-1" @click="cancel()">
											
											<i class="fa fa-times app-fa"></i>

										</a>

									</div>
								
									<div class="media-body input-wrapper align-self-center mr-2 " v-if="!record.isRecording">
										
										<textarea @keyup="ontype($event.target.value)" placeholder="message..." v-model='form.text' class="upload-text app-input-field">
										</textarea>

									</div>
									<div class="media-body" style="width:100%;" v-else>
										
										<center>
											<div class="skeleton-shimmer record-timer">
												<samp class="app-max-text">{{ record.time }}</samp>
											</div>
										</center>

									</div>
									<div class="media-right align-self-center" >

										<!-- <span class="icon-wrapper p-1" v-if="!record.done">
											
											<a @click="doneRecording()" class="save-voice">
												
												<i class="fa fa-check app-fa"></i>

											</a>

										</span> -->

										<span class="icon-wrapper p-1" v-if="typing || record.isRecording">
											
											<button class="send-btn" type="submit">
												
												<i class="fa fa-paper-plane app-fa"></i>

											</button>

										</span>
										
										<span v-else><!--  || record.done -->
										 <span class="icon-wrapper p-1">
										 	<clipper-upload style="display:inline-block" class="camera-btn" v-model="image.src">
										 	 <i class="fa fa-camera app-fa"></i>
										 	</clipper-upload>
										 </span>
										 <span class="icon-wrapper p-1">
										 	<a class="mic-btn" @click="toggleRecording()">
										 	 <i class="fa fa-microphone app-fa"></i>
										 	</a>
										 </span>
										</span>
										
									</div>

								</div>

							</form>

						</div>

					</div>
				
			</div>
		</template>

	</div>
	
</template>

<script type="text/javascript">

		import { mapActions, mapGetters, mapMutations } from 'vuex'
	  import globs from '../../../tunepik/attack.js'
		import Navigation from '../../mobile/root/Navigation'
		import TextBubble from './TextBubble'
		import MessageSkeleton from '../skeletonBuilders/MessageSkeleton'
		import UserFollowsBuilder from '../profileBuilders/UserFollowsBuilder'
		import WorkFiles from '../uploadBuilders/WorkFiles'

		export default {

			name 			: "MessagesList",
			scrollToTop : false,
			data 			: function(){

				return {

					screen  : globs.app.isMobile,
					trim    : globs.trim,
					form 		: {
						text 	: '',
						media : null,
					},
					typing : false,
					recordText : '',

				}

			},
			components : {

				Navigation,
				MediaBodySwitch,
				UserFollowsBuilder,
				TextBubble,
				MessageSkeleton,
				WorkFiles

			},
			methods    : {

				...mapActions("messages", ['getMessages', 'getUser']),
				...mapActions("recorder", ['init', 'toggleRecording', 'startRecording', 'stopRecording']),
				...mapMutations("files", ['isSet', 'chosen', 'isFile', 'done']),
				...mapActions("upload", ['userUpload']),
				sendMessage	 	: async function(data){

					 // Check If Still Recording
					 if(this.record.isRecording){

					 		await this.toggleRecording(); // Stop The Recording And Save The File!

					 		console.log({data});

					 		this.form.media = this.uploadedFile;

					 		this.userUpload(data);

					 		console.log({data});

					 }else{

					 		this.userUpload(data);

					 }

				},
				/*doneRecording : function(){

					this.stopRecording();

					this.cancelRecording();

				},*/
				ontype   : function(text){

					this.typing = text != '';

				},
				cancel   : function(){

					this.done(true);
					this.stopRecording();

				},

			},
			computed   : {

				username : function(){

					return this.$route.params.username;

				},
				uploadedFile : function(){

						if(this.record.audio.file == null && this.image.file == null){

							console.log('NULLLLL')

						 	 return ''

						 }else{

						 	console.log('IS THERERERER')

						 	 return this.record.audio.file || this.image.file;

						 }

				},
				formDATA  : function(){

					return {

						text 	: this.form.text,
						media : this.form.media,
						url   : `/api/chats/messages/send/${this.user.model.getBasic().id}`,

					};

				},
				...mapGetters("messages", ['message', 'user']),
				...mapGetters("recorder", ['record']),
				...mapGetters("files", ['image', 'checks', 'file']),
				...mapGetters("upload", ['upload']),

			},
			mounted     : function(){

				this.$nextTick(function(){

					this.getUser(this.username);

					this.getMessages(this.username);

					this.init();

				});

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
					this.form.media = val;

					console.log(this.form);

				}

			}

		};
	
</script>

<style type="text/css" scoped>


		@media only screen and (max-width: 700px){

			.file-wrapper{

				height: 100%;
				width: 100%;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;


			}

		}

		.upload-text{
			border: 0;
		}

		.list-group-item{
			border : 0;
		}

		.app-message-bubble{
			border: .05em solid rgba(211, 211, 211, .5);
			border-radius: 15px;
			width: auto;
		}

		.navbar{

			box-shadow: 0 0 0 0 transparent;
			border: 0;

		}

		.app-fa{
			width: 19px;
			height: 19px;
		}

		.input-wrapper{
			border: .05em solid rgba(211, 211, 211, .5);
			border-radius: 15px;
		}

		.send-btn{
			border: 0;
			background-color: transparent;
		}

		.record-timer{
			padding-top: 3px;
			padding-bottom: 3px;
			padding-right: 3px;
			padding-left: 3px;
			width: 30%;
			border-radius: 10px;
			background-color: rgba(211, 211, 211, .4);
		}
		.navbar{
			/*padding-left: 4px;
			padding-top: 2px;
			padding-bottom: 2px;*/
		}

</style>