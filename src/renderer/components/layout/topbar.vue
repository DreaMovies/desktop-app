<template>
	<div class="window-topbar">
		Dreamovies App
		<div :class="[( os_type == 'mac' ? 'os-mac' : 'os-windows')]">
			<div class="wc-box">
				<div class="minimize" @click="window_min"></div>
				<div :class="[(isMax ? 'maximized' : 'maximize')]" @click="window_max"></div>
				<div class="close" @click="window_close"></div>
			</div>
			<div class="title-bar">
				<div class="close" @click="window_close"></div>
				<div class="minimize" @click="window_min"></div>
				<div class="zoom"></div>
				<div class="maximize" @click="window_max"><span class="arrow-icon"></span></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'layout-topbar',
		data() {
			return {
				isMax: false,
				os_type: 'windows',
			}
		},
		methods: {
			window_close(){
				this.$electron.remote.getCurrentWindow().close();
			},
			window_min(){
				this.$electron.remote.getCurrentWindow().minimize();
			},
			window_max(){
				if(this.$electron.remote.getCurrentWindow().isMaximized()){
					this.$electron.remote.getCurrentWindow().unmaximize();
					this.isMax = false;
				} else {
					this.$electron.remote.getCurrentWindow().maximize();
					this.isMax = true;
				}
			},
			// open(link) {
			// this.link = link;
			// require('electron').shell.openExternal(link);
			// },
		},
	};
</script>