

export const state = {

	image  : {

		src  	   : '',
		clipper  : '',
		canvas   : '',
		file     : null,
		url 		 : '',
		pixel 	 : '',
		chosen 	 : false,
		cancel 	 : false,
		rotation : 0,

	},

	checks  : {

		isSet : false,
		done  : true,

	},

	file : false,

}


export const getters = {

	image 		: state => state.image,
	checks    : state => state.checks,
	file 			: state => state.file,

}

export const mutations = {

	isFile 	  : function(state, file){

		state.file = file;

	},

	chosen  : function(state, chosen){

		state.image.chosen = chosen;

	},

	cancel  : function(state, cancel){

		state.image.cancel = cancel

	},

	done  : function(state, done){

		state.checks.done = done;

	},

	isSet  : function(state, isSet){

		state.checks.isSet = isSet;

	},

	clipper : function(state, clipper){

		state.image.clipper = clipper;

		state.checks.done = false;

	},

	setRotation : function(state, rotation){

		state.image.rotation = rotation;

	},

	setImage  : function(state, args){

		state.image.canvas = args.canvas;

		state.image.canvas.toBlob(function(blob){

			state.image.file = blob;

			state.image.url = URL.createObjectURL(blob);

		});

		state.image.pixel = `${state.image.canvas.width} x ${state.image.canvas.height}`;

	}

}

export const actions = {

		crop : function({ state, commit }){

			 if(state.image.src != '' && state.image.clipper != ''){

			 		commit('setImage', {
			 			canvas   : state.image.clipper.clip(),
			 		});

			 		commit('done', true);

			 }

		},
		isSet : function({commit}, set){

			commit('isSet', set);

		},

		chosen : function({commit}, chosen){

			commit('chosen', chosen);

		},

		cancel : function({ state, commit }){

			state.image.src 			= "";
			state.image.clipper 	= "";
			state.image.rotation  = 0;
			state.image.canvas 		= "";
			state.image.pixel 		= "";
			state.image.file 	    = "";
			state.image.url 			= "";
			state.image.chosen 		= false;
			state.checks.done 		= true;
			state.checks.isSet 		= false;

			state.file 						= false;


		}

}