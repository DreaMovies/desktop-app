<template>

	<li class="clearfix">
		<div :class="'message-data ' + (message.username == username ? 'align-right' : '' )">
			<span v-if="message.username !== username" class="message-data-name" >{{ message.username }}</span>
			<span class="message-data-time" >{{ message.date }}</span>
			<span v-if="message.username == username" class="message-data-name" >{{ message.username }}</span>
		</div>
		<div :class="'message ' + (message.username == username ? ' other-message float-right' : ' my-message')">
			{{ message.message }}
		</div>
	</li>

</template>

<script>
	//import { Picker } from 'emoji-mart-vue';
	// Maybe later change the icons to some defined by the user in the settings?
	// Reference to replace emojis in text
	// https://gist.github.com/jm-david/7f98c3ee4fe235c596cff26d7aa26b7b
	export default {
		name: "chat-message",
		props: [
			'message',
			'user'
		],
		data(){
			return{
				username: this.$user.username
			};
		},
	}
</script>

<style scoped>

</style>