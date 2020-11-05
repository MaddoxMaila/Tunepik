<template>

	<ChatsList></ChatsList>
	
</template>

<script type="text/javascript">

		import ChatsList from '../../components/builders/chatsBuilders/ChatsList'

		export default {

				name 				: "Chats",
				scrollToTop : false,
				components 	: {

					ChatsList

				}

		};
	
</script>

<style type="text/css" scoped>
	
</style>