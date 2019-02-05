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