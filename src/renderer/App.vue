<template>
	<div id="app" @paste="onPaste">
		<Layout></Layout>
	</div>
</template>

<script>
	import Layout from '@/components/layout';
	import { clipboard } from 'electron';

	export default {
		name: 'Dreamovies-App',
		components: {
			Layout,
		},
		methods: {
			onPaste (e) {
				const magnetLinks = clipboard.readText().split(/\s+/).filter(str => /^magnet:?[^\\"]+/.test(str))
				this.$electron.ipcRenderer.send('new-torrenting', magnetLinks)
			}
		}
	};
</script>

<style lang="scss">
	@import "@/assets/css/all.scss";
</style>
