<template>
	<div v-if="Object.keys(info).length > 0" class="chat">
		<chatHeader :contact="info.user"></chatHeader>
		<ul class="chat-history">
			<chatMessage v-for="message in info.messages" :message="message" :user="person"></chatMessage>
		</ul>

		<div class="chat-message clearfix">
			<textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>

			<i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
			<i class="fa fa-file-image-o"></i>

			<button>Send</button>

		</div> <!-- end chat-message -->
	</div>
</template>

<script>
	import chatHeader from "./chat-header";
	import chatMessage from "./chat-message";

	export default {
		name: "chat-list",
		components: {
			chatHeader,
			chatMessage
		},
		props: [
			'info'
		],
		data(){
			return{
				person: {},
			};
		},
		created() {

		},
		updated(){
			var elem = this.$el.querySelector(".chat-history");
			elem.scrollTop = elem.clientHeight;
		},
	}
</script>

<style scoped>

</style>