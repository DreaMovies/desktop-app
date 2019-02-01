<template>
	<div class="chat-header clearfix">
		<img :src="contact.avatar" alt="avatar" />

		<div class="chat-about">
			<div class="chat-with">Chat with {{ contact.name }}</div>
			<div class="chat-num-messages">already {{ contact.messages_count }} messages</div>
		</div>
		<chatActions></chatActions>
	</div> <!-- end chat-header -->
</template>

<script>
	import chatActions from "./chat-actions";
	export default {
		name: "chat-header",
		components: {
			chatActions,
		},
		props: [
			'contact'
		]
	}
</script>

<style scoped>

</style>