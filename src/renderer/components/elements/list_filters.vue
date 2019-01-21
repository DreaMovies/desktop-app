<template>
	<div>
		<b-form inline>
			<b-form-select text-field="label" v-if="filters != 'undefined' && typeof filters.quality !== 'undefined'" 	v-model="quality" 	:options="filters.quality" />
			<b-form-select text-field="label" v-if="filters != 'undefined' && typeof filters.order_by !== 'undefined'" 	v-model="order_by" 	:options="filters.order_by" />
			<b-form-select text-field="label" v-if="filters != 'undefined' && typeof filters.genre !== 'undefined'" 		v-model="genre" 	:options="filters.genre" />
			<b-form-select text-field="label" v-if="filters != 'undefined' && typeof filters.sort_by !== 'undefined'" 	v-model="sort_by" 	:options="filters.sort_by" />
			<b-form-input  v-if="filters != 'undefined' && typeof filters.keyword !== 'undefined'" v-model="keyword" type="text" placeholder="Keyword Search"></b-form-input>

			<b-button variant="primary">Search</b-button>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'list-filters',
		props: [
			'filters'
		],
		data: function(){
			return {
				quality: "",
				keyword: "",
				genre: "",
				sort_by: "",
				order_by: "",
			}
		},
		methods: {
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>