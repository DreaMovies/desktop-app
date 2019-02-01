<template>
	<div class="clearfix page-chat">
		<contactList :persons="persons"></contactList>
		<chatList :info="activePerson"></chatList>
	</div> <!-- end container -->
</template>

<script>
	import contactList from "../components/elements/chat/contact-list";
	import chatList from "../components/elements/chat/chat-list";

	export default {
		name: 'chat',
		components: {
			contactList,
			chatList
		},
		props: [],
		data() {
			return {
				user: '',
				persons: [
					{
						show: true,
						active: false,
						user: {
							name: "Peyton Mckinney",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg",
							message: "what movie will we se...",
							messages_count: 82,
							status: "online",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}
						]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Dean Henry",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg",
							message: "what lorum epsum...",
							messages_count: 132,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Dean Henry, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Dean Henry, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Dean Henry, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}
						]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Monica Ward",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg",
							message: "why lorum epsum...",
							messages_count: 562,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Monica Ward, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Monica Ward, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Monica Ward, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Peyton Mckinney",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg",
							message: "what movie will we se...",
							messages_count: 72,
							status: "online",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Peyton Mckinney, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Peyton Mckinney, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Peyton Mckinney, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Peyton Mckinney, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Dean Henry",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg",
							message: "what lorum epsum...",
							messages_count: 102,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Monica Ward",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg",
							message: "why lorum epsum...",
							messages_count: 120,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}
						]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Peyton Mckinney",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg",
							message: "what movie will we se...",
							messages_count: 1562,
							status: "online",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Dean Henry",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg",
							message: "what lorum epsum...",
							messages_count: 12234,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Monica Ward",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg",
							message: "why lorum epsum...",
							messages_count: 178,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Peyton Mckinney",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg",
							message: "what movie will we se...",
							messages_count: 52,
							status: "online",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Dean Henry",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg",
							message: "what lorum epsum...",
							messages_count: 12,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}
						]
					},
					{
						show: true,
						active: false,
						user: {
							name: "Monica Ward",
							avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_08.jpg",
							message: "why lorum epsum...",
							messages_count: 32,
							status: "offline",
							last_online: new Date(),
						},
						messages: [
							{
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: true,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}, {
								sent: false,
								date: new Date(),
								text: "Hi Vincent, how are you? How is the project coming along?",
								attachments: []
							}]
					},
				],
				activePerson: {}
			};
		},
		created() {
			Event.$on("chat::contact-change", (key) => {
				this.changePerson(key);
			});
		},
		methods: {
			changePerson(key){
				console.log(key);
				this.activePerson = this.persons[key];
			},

//			https://dreamovies-chat-server.herokuapp.com/
		},
		beforeDestroy() {
			Event.$off("chat::contact-change");
		}
	};
</script>