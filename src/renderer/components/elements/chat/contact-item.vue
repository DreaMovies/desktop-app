<template>
	<li :class="'discussion ' + (person.active ? 'message-active' : '')">
		<div class="photo">
			<img :src="person.user.avatar" alt="avatar">
			<div v-if="person.user.status == 'online'" class="online"></div>
		</div>
		<div class="desc-contact">
			<p class="name">{{ person.user.name }}</p>
			<p class="message">{{ person.user.message }}</p>
		</div>
		<div class="timer">{{ getAgo(person.user.last_online) }}</div>
	</li>
</template>

<script>
	import moment from 'moment';
	export default {
		name: "contact-item",
		props: [
			'person'
		],
		data(){
			return {

			}
		},
		methods: {
			getAgo(date){
				return moment(date).fromNow();
			}
		}
	}
</script>