import axios from 'axios'
import * as types from '../mutation-types'
import globs from '../../tunepik/attack.js'

export const state = {

	chat  : {

		 error : false,
		 message : '',
		 loading : false,
		 chats   : []

	},

	message : {

		 error : false,
		 message : '',
		 loading : false,
		 messages   : []

	},

	user   : {

		 error : false,
		 message : '',
		 loading : false,
		 model   : null,

	}

}

export const getters = {

	chat  	: state => state.chat,
	message : state => state.message,
	user    :  state => state.user,

}

export const mutations = {

	[types.CHAT_LOADING](state, loading){

		state.chat.loading = loading;

	},

	[types.FETCH_CHATS](state, data){

		state.chat.error = data.error
		state.chat.message = data.message
		
		if(!state.chat.error){

			data.chats.forEach(function(chat){

				state.chat.chats.push(new globs.model.chat(chat))

			});

		}

	},

	[types.MESSAGES_LOADING](state, loading){

		state.message.loading = loading

	},

	[types.FETCH_MESSAGES](state, data){

		state.message.error = data.error
		state.message.message = data.message
		
		if(!state.message.error){

			data.messages.forEach(function(message){

				state.message.messages.push(new globs.model.message(message))

			});

		}

	},

	[types.USER_LOADING](state, loading){

		state.user.loading = loading

	},

	[types.MESSAGE_USER](state, data){

		state.user.error = data.error
		state.user.message = data.message
		state.user.model = new globs.model.user(data.user)

	}

}

export const actions = {

	getChats : async function({ commit }) {

		 commit(types.CHAT_LOADING, true);

		 const { data } = await axios.get('/api/chats/conversations');

		 commit(types.FETCH_CHATS, {

		 		error  	: !data.list,
		 		message : data.message,
		 		chats   : data.chats

		 });

		 commit(types.CHAT_LOADING, false);

	},

	getMessages : async function({ commit }, handle, lastId = ''){

		commit(types.MESSAGES_LOADING, true);

		const { data } = await axios.get(`${globs.api}chats/messages/${handle}`);

		commit(types.FETCH_MESSAGES, {

			error : data.error,
			message : data.message,
			messages : data.messages

		});

		commit(types.MESSAGES_LOADING, false);

	},

	getUser : async function({ commit }, handle){

		commit(types.USER_LOADING, true);

		const { data } = await axios.get(`${globs.api}chats/user/${handle}`);

		commit(types.MESSAGE_USER, {

			error : data.error,
			message : data.message,
			user    : data.user

		});

		commit(types.USER_LOADING, false)

	}

}