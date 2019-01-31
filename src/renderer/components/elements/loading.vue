<template>
	<div class="loading">
		<svg class="load" x="0px" y="0px" viewBox="0 0 150 150">
			<circle class="loading-inner" cx="75" cy="75" r="60"/>
		</svg>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: [
			'center', 'page'
		],
		data: function(){
			return {

			}
		},
		methods: {

		},
	};
</script>