<template>

		<div class="wrapper">
			
			<center>

				<div class="wrapper-audio">
					
					<a @click="playpause(timeView)">

						<!-- <vue-wave-surfer ref="surf" :src="post.getPost().url" :options="options"></vue-wave-surfer> -->
				      <div class="wave-surf" :id="postId"></div>

					</a>

				</div>

			</center>
			<div class="media-info-body">
				<div class="media-text info-views">
					{{ timeView }}
				</div>
			</div>

		</div>
       
</template>

<script>

  import globs from '../../../tunepik/attack.js'
  // import VueWaveSurfer from 'vue-wave-surfer'
  import WaveSurfer from 'wavesurfer.js'

    export default {

        name    		: "AudioBodyBuilder",
        components	: {

        	// VueWaveSurfer

        },
        data    		: function(){

          return {
            screen               : globs.app.isMobile,
			isPlayerReady        : false,
			timeView 			 : '00:00',

          }

        },
        props    : ['post'],
        computed : {

        	player : function(){

        		return WaveSurfer.create(this.options);

        	},
            options : function(){

                return {

                  container : `#${this.postId}`,
                  waveColor : '#5bc0de',
                  progressColor : '#111',
                  barWidth: 2,
                  barHeight: 10,
                  barRadius: 3,
                  barGap: 2,
                  height: 40,
                  interact: false

                }

            },
            postId : function(){

                return `surfer-${this.post.getPost().id}`;

            }

        },
        methods  : {

        	isReady   : function(time){


        		this.player.on('ready', () => {

        			globs.timer.time({ view : time, currentTime : this.player.getDuration() });

                    console.log('READYY');

        			this.isPlayerReady = true;

        		});

        	},
        	playpause : function(time){

                console.log('PLAY?PAUSE');

        		if(this.isPlayerReady){

        			this.player.playPause();

        			this.player.on('audioprocess', () => {

        				globs.timer.time({ view : time, currentTime : this.player.getCurrentTime() });

        			});


        		}

        	}

        },
        mounted  : function(){

            this.player.load(this.post.getPost().url);

        	this.$nextTick(function(){
                
                console.log(this.player);

                this.isReady(this.timeView); // Init The Player To Ready Status

            });

        }

    };
</script>

<style scoped>

	.wrapper-audio{

		border-radius: 5px;
		border: .05em solid rgba(211, 211, 211, .4);
		width: 95%;

	}

</style>
