<template>
	<div v-if="Object.keys(info).length > 0" class="chat">
		<chatHeader :contact="info.user"></chatHeader>
		<ul class="chat-history">
			<chatMessage v-for="msg in messages" :message="msg" :person="person"></chatMessage>
		</ul>

		<div class="chat-message clearfix">
			<span v-if="typing.length > 0" v-for="user in typing">{{ user }}</span>
			<textarea
				name="message-to-send"
				id="message-to-send"
				placeholder="Type your message"
				rows="3"
				v-model="message"
				@keyup.enter="sendMessage"
				@keydown="meTyping">
			</textarea>
			<i class="far fa-smile" @click="showEmojis = !showEmojis"></i>
			<div class="emoji-picker" v-show="showEmojis" @click="showEmojis = !showEmojis">
				<picker
					set="apple"
					@select="addEmoji"
					:style="{ position: 'absolute', bottom: '20px', right: '20px' }" />
			</div>
			<i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
			<i class="fa fa-file-image-o"></i>

			<button @click="sendMessage">Send</button>

		</div> <!-- end chat-message -->
	</div>
</template>

<script>
	import { Picker } from 'emoji-mart-vue';
	import chatHeader from "./chat-header";
	import chatMessage from "./chat-message";


	export default {
		name: "chat-list",
		components: {
			chatHeader,
			chatMessage,
			Picker
		},
		props: [
			'info',
			'messages',
			'typing'
		],
		data(){
			return{
				person: {},
				message: "",
				room: "",
				showEmojis: false,
			};
		},
		created() {

		},
		updated(){
			var elem = this.$el.querySelector(".chat-history");
			elem.scrollTop = elem.clientHeight;
		},
		methods: {
			addEmoji(emoji){
				this.message = this.message + emoji.native;
			},
			sendMessage(){
				if(this.message != "") {
					Event.$emit('chat::send-message', this.message);
					this.message = "";
				}
			},
			meTyping(){
				Event.$emit('chat::typing', this.room)
			}
		},
	}
</script>

<style scoped>

</style>