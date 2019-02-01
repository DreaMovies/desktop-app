<template>

	<li class="clearfix">
		<div :class="'message-data ' + (message.sent ? '' : 'align-right')">
			<span class="message-data-time" >{{ message.date }}</span> &nbsp; &nbsp;
			<span class="message-data-name" >{{ user.name }}</span>
			<i :class="'fa fa-circle' + (message.sent ? 'me' : user.status)"></i>

		</div>
		<div class="message other-message float-right">
			{{ message.text }}
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
	}
</script>

<style scoped>

</style>