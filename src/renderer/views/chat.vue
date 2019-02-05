<template>
	<div class="clearfix page-chat">
		<contactList :persons="persons"></contactList>
		<chatList :info="activePerson" :messages="messages" :typing="config.typing"></chatList>
	</div>
</template>

<script>
	import io from 'socket.io-client';
	import P2P from 'socket.io-p2p';

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
					},
				],
				activePerson: {},

				messages: [],

				chat:{
					numUsers: 0,
					message: '',
					typing: false,
				},
				config:{
					FADE_TIME: 150, // ms
					TYPING_TIMER_LENGTH: 400, // ms
					COLORS: [
						'#e21400', '#91580f', '#f8a700', '#f78b00',
						'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
						'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
					],
					// Initialize variables
					//$window: $(window),
					//$usernameInput: $('.usernameInput'), // Input for username
					//$messages: $('.messages'), // Messages area
					//$inputMessage: $('.inputMessage'), // Input message input box
//
					//$loginPage: $('.login.page'), // The login page
					//$chatPage: $('.chat.page'), // The chatroom page

					// Prompt for setting a username
					connected: false,
					typing: [],
					typingMessage: '',
					lastTypingTime: null,
					//$currentInput: $usernameInput.focus(),
					socket : io('//dreamovies-chat-server.herokuapp.com'),
					p2p: null
				}
			};
		},
		created() {
			Event.$on("chat::contact-change", (key) => {
				this.changePerson(key);
			});
			Event.$on("chat::typing", (room) => {
				this.updateTyping(room);
			});
			Event.$on("chat::send-message", (message) => {
				this.sendMessage(message);
			});
		},
		mounted() {
			console.log("Mount Chat");
			this.config.p2p = new P2P(this.config.socket);

			this.config.socket.on('new message', (data) => {
				this.messages = [...this.messages, data];
				// you can also do this.messages.push(data)
			});
			this.config.socket.emit('add user', this.$user.username);

			// Whenever the server emits 'login', log the login message
			this.config.socket.on('login', (data) => {
				console.log("login");
				console.log(data);
				this.config.connected = true;
				this.$user.status = "online";
			});

			// Whenever the server emits 'user joined', log it in the chat body
			this.config.socket.on('user joined', (data) => {
				console.log(data.username + ' joined');
				this.contactOnline(data);
			});

			// Whenever the server emits 'user left', log it in the chat body
			this.config.socket.on('user left', (data) => {
				console.log(data.username + ' left');
				this.contactOffline(data);
			});

			// Whenever the server emits 'typing', show the typing message
			this.config.socket.on('typing', (data) => {
				console.log(data);
				this.isTyping(data, true);
			});

			// Whenever the server emits 'stop typing', kill the typing message
			this.config.socket.on('stop typing', (data) => {
				console.log(data);
				this.isTyping(data, false);
			});

			this.config.socket.on('disconnect', () => {
				console.log('you have been disconnected');
				this.$user.status = "offline";
			});

			this.config.socket.on('reconnect', () => {
				console.log('you have been reconnected');
				this.$user.status = "online";
				this.config.socket.emit('add user', this.chat.username);
			});

			this.config.socket.on('reconnect_error', () => {
				console.log('attempt to reconnect has failed');
				this.$user.status = "offline";
			});
		},
		methods: {
			changePerson(key){
				console.log(key);
				this.activePerson = this.persons[key];
			},
			sendMessage(message) {
				console.log("new message");
				if(message != "") {
					const newMessage = {
						message: message,
						username: this.$user.username,
						date: new Date()
					};
					this.config.socket.emit('new message', newMessage);
					this.messages.push(newMessage);
				}
			},
//			https://dreamovies-chat-server.herokuapp.com/

			contactOnline(data){
				console.log("someone went online");
				console.log(data);
			},
			contactOffline(data){
				console.log("someone went offline");
				console.log(data);
			},
			isTyping(data, typing){
				if(typing){
					if(this.config.typing.indexOf(data.username) == -1){
						this.config.typing.push(data.username);
					}
				} else {
					if(this.config.typing.indexOf(data.username) > -1){
						this.config.typing.splice(this.config.typing.indexOf(data.username));
					}
				}
			},
			// Updates the typing event
			updateTyping(room){
				if (this.config.connected) {
					if (!this.chat.typing) {
						this.chat.typing = true;
						this.config.socket.emit('typing');
					}
					this.config.lastTypingTime = (new Date()).getTime();

					setTimeout(() => {
						var typingTimer = (new Date()).getTime();
						var timeDiff = typingTimer - this.config.lastTypingTime;
						if (timeDiff >= this.config.TYPING_TIMER_LENGTH && this.chat.typing) {
							this.config.socket.emit('stop typing');
							this.chat.typing = false;
						}
					}, this.config.TYPING_TIMER_LENGTH);
				}
			},
/*
			addParticipantsMessage(data){
				var message = '';
				if (data.numUsers === 1) {
					message += "there's 1 participant";
				} else {
					message += "there are " + data.numUsers + " participants";
				}
				this.numUsers = data.numUsers;
				console.log(message);
			},

			// Sets the client's username
			setUsername(){
				// Tell the server your username
				socket.emit('add user', this.username);
			},

			// Sends a chat message
			sendMessage(){
				// if there is a non-empty message and a socket connection
				if (this.message && this.config.connected) {
					addChatMessage({
						username: this.username,
						message: this.message
					});
					// tell server to execute 'new message' and send along one parameter
					socket.emit('new message', this.message);
					this.message = "";
				}
			},

				// Log a message
				const log = (message, options) => {
					var $el = $('<li>').addClass('log').text(message);
					addMessageElement($el, options);
				}

			// Adds the visual chat message to the message list
			addChatMessage(data, options){
				// Don't fade the message in if there is an 'X was typing'
				var $typingMessages = getTypingMessages(data);
				options = options || {};
				if ($typingMessages.length !== 0) {
					options.fade = false;
					$typingMessages.remove();
				}

				var $usernameDiv = $('<span class="username"/>')
					.text(data.username)
					.css('color', getUsernameColor(data.username));
				var $messageBodyDiv = $('<span class="messageBody">')
					.text(data.message);

				var typingClass = data.typing ? 'typing' : '';
				var $messageDiv = $('<li class="message"/>')
					.data('username', data.username)
					.addClass(typingClass)
					.append($usernameDiv, $messageBodyDiv);

				addMessageElement($messageDiv, options);
			},

				// Adds the visual chat typing message
				const addChatTyping = (data) => {
					data.typing = true;
					data.message = 'is typing';
					addChatMessage(data);
				}

				// Removes the visual chat typing message
				const removeChatTyping = (data) => {
					getTypingMessages(data).fadeOut(function () {
						$(this).remove();
					});
				}

				// Adds a message element to the messages and scrolls to the bottom
				// el - The element to add as a message
				// options.fade - If the element should fade-in (default = true)
				// options.prepend - If the element should prepend
				//   all other messages (default = false)
				const addMessageElement = (el, options) => {
					var $el = $(el);

					// Setup default options
					if (!options) {
						options = {};
					}
					if (typeof options.fade === 'undefined') {
						options.fade = true;
					}
					if (typeof options.prepend === 'undefined') {
						options.prepend = false;
					}

					// Apply options
					if (options.fade) {
						$el.hide().fadeIn(FADE_TIME);
					}
					if (options.prepend) {
						$messages.prepend($el);
					} else {
						$messages.append($el);
					}
					$messages[0].scrollTop = $messages[0].scrollHeight;
				}

				// Prevents input from having injected markup
				const cleanInput = (input) => {
					return $('<div/>').text(input).html();
				}

				// Updates the typing event
				const updateTyping = () => {
					if (connected) {
						if (!typing) {
							typing = true;
							socket.emit('typing');
						}
						lastTypingTime = (new Date()).getTime();

						setTimeout(() => {
							var typingTimer = (new Date()).getTime();
							var timeDiff = typingTimer - lastTypingTime;
							if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
								socket.emit('stop typing');
								typing = false;
							}
						}, TYPING_TIMER_LENGTH);
					}
				}

				// Gets the 'X is typing' messages of a user
				const getTypingMessages = (data) => {
					return $('.typing.message').filter(function (i) {
						return $(this).data('username') === data.username;
					});
				}

				// Gets the color of a username through our hash function
				const getUsernameColor = (username) => {
					// Compute hash code
					var hash = 7;
					for (var i = 0; i < username.length; i++) {
						hash = username.charCodeAt(i) + (hash << 5) - hash;
					}
					// Calculate color
					var index = Math.abs(hash % COLORS.length);
					return COLORS[index];
				}

				// Keyboard events

				$window.keydown(event => {
					// Auto-focus the current input when a key is typed
					if (!(event.ctrlKey || event.metaKey || event.altKey)) {
						$currentInput.focus();
					}
					// When the client hits ENTER on their keyboard
					if (event.which === 13) {
						if (username) {
							sendMessage();
							socket.emit('stop typing');
							typing = false;
						} else {
							setUsername();
						}
					}
				});

				$inputMessage.on('input', () => {
					updateTyping();
				});

				// Click events

				// Focus input when clicking anywhere on login page
				$loginPage.click(() => {
					$currentInput.focus();
				});

				// Focus input when clicking on the message input's border
				$inputMessage.click(() => {
					$inputMessage.focus();
				});

				// Socket events

				// Whenever the server emits 'login', log the login message
				socket.on('login', (data) => {
					connected = true;
					// Display the welcome message
					var message = "Welcome to Socket.IO Chat – ";
					log(message, {
						prepend: true
					});
					addParticipantsMessage(data);
				});

				// Whenever the server emits 'new message', update the chat body
				socket.on('new message', (data) => {
					addChatMessage(data);
				});

				// Whenever the server emits 'user joined', log it in the chat body
				socket.on('user joined', (data) => {
					log(data.username + ' joined');
					addParticipantsMessage(data);
				});

				// Whenever the server emits 'user left', log it in the chat body
				socket.on('user left', (data) => {
					log(data.username + ' left');
					addParticipantsMessage(data);
					removeChatTyping(data);
				});

				// Whenever the server emits 'typing', show the typing message
				socket.on('typing', (data) => {
					addChatTyping(data);
				});

				// Whenever the server emits 'stop typing', kill the typing message
				socket.on('stop typing', (data) => {
					removeChatTyping(data);
				});

				socket.on('disconnect', () => {
					log('you have been disconnected');
				});

				socket.on('reconnect', () => {
					log('you have been reconnected');
					if (username) {
						socket.emit('add user', username);
					}
				});

				socket.on('reconnect_error', () => {
					log('attempt to reconnect has failed');
				});

			});*/

		},
		beforeDestroy() {
			Event.$off("chat::contact-change");
			Event.$off("chat::typing");
			Event.$off("chat::send-message");

			this.config.socket.disconnect();
		}
	};
</script>