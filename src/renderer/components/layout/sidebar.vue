<template>
	<ul :class="['navbar-nav side-nav', (expanded ? 'nav-open' : 'nav-closed')]">
		<b-nav-item class="text-white" to="/index">Home</b-nav-item>
		<b-nav-item class="text-white" to="/explorer">Local Files</b-nav-item>
		<b-dropdown-header>API's</b-dropdown-header>
		<b-nav-item v-for="item in list" :key="item.config.name" class="text-white" :to="'/' + item.config.type + '-list/' + item.config.name">{{ item.config.label }}</b-nav-item>
		<li class="footer-item">
			<b-btn-group>
				<b-btn to="/settings">
					<i class="fas fa-cog"></i>
				</b-btn>
				<b-btn to="/chat">
					<i class="fas fa-comments"></i>
				</b-btn>
				<b-btn @click="openFolder">
					<i class="fas fa-folder-open"></i>
				</b-btn>
			</b-btn-group>
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'layout-sidebar',
		props: [
			'expanded'
		],
		data: function(){
			return {
				list: []
			}
		},
        created() {
			this.list = this.$plugins;
		},
		methods: {
			openFolder() {
				const folder = "C:/Users/miguel.cerejo/Documents/Download/torrent";//this.$db.settings[0].download_folder;
				require('electron').shell.openItem(folder);
			},
		},
	};
</script>