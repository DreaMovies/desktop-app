<template>
	<div class="page-file-explorer">
		<explorer-sidebar :type="listType" @toggleView="toggleView"></explorer-sidebar>
		<explorer-grid v-if="listType == 'grid'"></explorer-grid>
		<explorer-list v-else-if="listType == 'list'"></explorer-list>
	</div>
</template>



<script>
	import explorerSidebar from "../components/elements/explorer/explorer-sidebar";
	import explorerList from "../components/elements/explorer/explorer-list";
	import explorerGrid from "../components/elements/explorer/explorer-grid";

	export default {
		name: 'file-explorer',
		components: {
			explorerSidebar,
			explorerList,
			explorerGrid
		},
		data() {
			return {
				listType: "list", //"list" or "grid"
			}
		},
		methods: {
			toggleView(view){
				this.listType = view;
			},
		}
	};
</script>