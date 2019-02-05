<template>
	<div class="people-list" id="people-list">
		<div class="search">
			<input type="text" placeholder="search" />
			<i class="fa fa-search"></i>
		</div>
		<ul class="list discussions">
			<contactItem v-for="(info, key) in persons" :person="info" @click.native="selectPerson(key)"></contactItem>
		</ul>
	</div>
</template>

<script>
	import contactItem from "./contact-item";

	export default {
		name: "contact-list",
		components: {
			contactItem
		},
		props: [
			'persons'
		],
		data(){
			return {

			}
		},
		methods: {
			selectPerson(key){
				console.log(key);
				if( this.persons[key].active == false ){
					this.persons.filter(obj => {
						if( obj.active === true ) {
							obj.active = false;
						}
					});
					this.persons[key].active = true;

					Event.$emit("chat::contact-change", key);
				}
			}
		}
	}
</script>