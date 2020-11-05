import axios from 'axios'



export const state = {

	theme 		: {

		type  : localStorage.getItem('theme-color') == null ? 'theme-light' : localStorage.getItem('theme-color'),  // default, darkcity, light
		icon  : '#111',  // #111, blue
		colors : {

			dark 			: '#111',
			light 		: '#fff',
			blue  		: '#5bc0de',
			lightgrey : 'lightgrey',
			grey 			: 'rgba(211, 211, 211, .4)'

		}

	},
	overlay : {

		popup 		: {
			isOpen : false,
		},

		snackbar	: {
			isOpen : false,
			theme   : 'info',
			message : ''
		},

		confirm 	: {
			isOpen : false,
		}

	}

}

export const getters = {

	theme  		: state => state.theme,
	overlay		: state => state.overlay,

}

export const mutations = {

	SET_THEME : function(state, theme){

		state.theme.type = theme.type

		state.theme.icon = theme.icon

	},
	SNACK_BAR : function(state, data){

		state.overlay.snackbar.isOpen = data.isOpen
		
		

		if(state.overlay.snackbar.isOpen){

			state.overlay.snackbar.message = data.message
			state.overlay.snackbar.theme = data.theme ? data.theme : 'info'

			setTimeout(() => {

				state.overlay.snackbar.isOpen = false
				state.overlay.snackbar.message = ''

			}, 3500)

		}

	},
	POP_UP 		: function(state, isOpen){

		state.overlay.popup.isOpen = isOpen

	},
	COMFIRM 	: function(state, isOpen){

		state.overlay.confirm.isOpen = isOpen

	},
	SNACK_DATA : function(state, data){

	}

}

export const actions = {

	toggleTheme : function({ commit, state, dispatch }, type){

			if(state.theme.type == type) return

			if(localStorage.getItem('theme-color')){

				localStorage.removeItem('theme-color')

				localStorage.setItem('theme-color', type)

			}else{

				localStorage.setItem('theme-color', type)

			}

			let iconColor = null

			switch (type) {
				
				case 'theme-light'    :

						iconColor = '#111'
						document.querySelector("#main-body").style.backgroundColor = '#fff';

					break;

				case 'theme-dark' :

						iconColor = '#fff'
						document.querySelector("#main-body").style.backgroundColor = '#222';

				default:

						iconColor = '#5bc0de'

					break;
			}

			commit('SET_THEME', {

				type 		: type,
				icon    : iconColor

			});

	},
	backgroundColor : function({ state }){

		switch (state.theme.type) {

			case 'theme-light'	:

					document.querySelector("#main-body").style.backgroundColor = '#fff';

				break;

			case 'theme-dark'		:

					document.querySelector("#main-body").style.backgroundColor = '#222';

				break;

			default:
			
					document.querySelector("#main-body").style.backgroundColor = '#fff';

				break;
		}

	},
	toggleSnackBar : function({ state, commit }, data = null){

		if(data){

		}

	},
	togglePopUp 	 : function({ state, commit }){

			commit('POP_UP', state.overlay.popup.isOpen ? false : true)

	},
	toggleConfirm  : function({ state, commit }){

		commit('CONFIRM', state.overlay.confirm.isOpen ? false : true)

	},

}