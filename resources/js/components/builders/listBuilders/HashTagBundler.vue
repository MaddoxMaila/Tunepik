<template>


	<div class="list-group" v-if="tags.length > 0">
		
		<div class="list-group-item" v-for="(tag, key) in tags">
			
			<span class="app-hash block-text">#{{ tag.getHash().hash }}</span>
			<span class="app-grey-text-sm">{{ tag.getHash().message }}</span>

		</div>

	</div>
	<div class="app-deleted-post grey-matter" v-else>
		
		<center>
			<span class="app-post-text">{{ message }}</span>
		</center>

	</div>
	
</template>

<script>

	export default {

		name 			: "HashTagBundler",
		props 		: ['tags', 'message']

	};
	
</script>

<style scoped>
	
</style>