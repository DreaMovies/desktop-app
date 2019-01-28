<template>
	<div class="filters-tab">
		<b-form inline>
			<b-form-select
					class="col-2"
					text-field="label"
					v-if="filters != 'undefined' && typeof filters.quality !== 'undefined'"
					v-model="params.quality"
					:options="filters.quality.list" />
			<b-form-select
					class="col-2"
					text-field="label"
					v-if="filters != 'undefined' && typeof filters.order_by !== 'undefined'"
					v-model="params.order_by"
					:options="filters.order_by.list" />
			<b-form-select
					class="col-2"
					text-field="label"
					v-if="filters != 'undefined' && typeof filters.genre !== 'undefined'"
					v-model="params.genre"
					:options="filters.genre.list" />
			<b-form-select
					class="col-2"
					text-field="label"
					v-if="filters != 'undefined' && typeof filters.sort_by !== 'undefined'"
					v-model="params.sort_by"
					:options="filters.sort_by.list" />
			<b-form-input
					class="col-2"
					v-if="filters != 'undefined' && typeof filters.keyword !== 'undefined'"
					:placeholder="filters.keyword.placeholder"
					v-model="params.keyword" type="text">
			</b-form-input>

			<b-button class="col-2" variant="primary" @click="search">Search</b-button>
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
				params: {
					limit: 30,
					quality: "0",
					genre: "0",
					sort_by: "0",
					order_by: "0",
					keyword: "",
				}
			}
		},
		created() {
			if(this.filters != 'undefined'){
				this.params.quality = this.filters.quality.default;
				this.params.genre = this.filters.genre.default;
				this.params.sort_by = this.filters.sort_by.default;
				this.params.order_by = this.filters.order_by.default;
			}
		},
		methods: {
			search(){
				Event.$emit('search-trigger', this.params);
			}
		},
	};
</script>