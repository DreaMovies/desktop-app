<template>
	<div class="wrapper page-settings">
		<div class="form-group row">
			<label for="staticEmail" class="col-sm-2 col-form-label">Start App with:</label>
			<div class="col-sm-10">
				<select name="start" id="start" class="form-control" v-model="settings.startApp">
					<option value="home">HomePage</option>
					<option value="suggestions">Suggestions</option>
					<option value="continue">Continue</option>
					<option value="api">API</option>
					<option value="chat">Chat</option>
					<option value="downloads">Downloads</option>
				</select>
			</div>
		</div>


		<div class="form-group row">
			<label for="inputPassword" class="col-sm-2 col-form-label">Download Location</label>
			<div class="col-sm-10">
				<input type="file" class="form-control" @change="changeFolder" webkitdirectory/>
				<small>{{ settings.downloads.folder }}</small>
			</div>
		</div>


		<div class="form-group row">
			<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
			<div class="col-sm-10">
				<input type="password" class="form-control" id="inputPassword" placeholder="Password">
			</div>
		</div>

		<div>
			<label for="maxDownloads">Max Downloads Same Time</label>
			<input type="range" v-model="settings.downloads.maxDownloads" class="custom-range" min="0" max="10" step="1" id="maxDownloads">
		</div>

		<div>
			<label for="maxUploads">Max Uploads Same Time</label>
			<input type="range" v-model="settings.downloads.maxUploads" class="custom-range" min="0" max="10" step="1" id="maxUploads">
		</div>

		<div>
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="customSwitch_notifications"
				       @change="updateNotifications">
				<label class="custom-control-label" for="customSwitch_notifications">Show Notifications</label>
			</div>
		</div>
		<div>
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="customSwitch_darkMode"
				       @change="updateNotifications">
				<label class="custom-control-label" for="customSwitch_darkMode">App in Dark Mode</label>
			</div>
		</div>
		<div>
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="customSwitch_subtitles"
				       @change="updateNotifications">
				<label class="custom-control-label" for="customSwitch_subtitles">Automaticly download Subtitles</label>
			</div>
		</div>

		<div>
			<div class="custom-control custom-switch">
				<label class="custom-control-label" for="customSwitch_download">Play Content</label>
				<input type="checkbox" class="custom-control-input" id="customSwitch_download"
				       @change="updateNotifications">
				<label class="custom-control-label" for="customSwitch_download">Download</label>
			</div>
		</div>

		<div>
			<div class="custom-control custom-switch">
				<input type="checkbox" class="custom-control-input" id="customSwitch_toTray"
				       @change="updateNotifications">
				<label class="custom-control-label" for="customSwitch_toTray">Minimize app to tray</label>
			</div>
		</div>


		<h3>Plugins Management</h3>
		<div>
			<h5>Content </h5>
			<ul class="list-group">
				<li v-for="(plugin, index) in $plugins" :key="plugin.id"
				    class="list-group-item d-flex justify-content-between align-items-center">
					{{ plugin.config.label }}
					<div class="custom-control custom-switch">
						<input :checked="plugin.active" type="checkbox" class="custom-control-input" :id="'customSwitch_' + index"
						       @change="updatePlugin(index)">
						<label class="custom-control-label" :for="'customSwitch_' + index">Toggle this switch
							element</label>
					</div>
				</li>
			</ul>
			<h5>Subtitles</h5>
			<ul class="list-group">
				<li v-for="(plugin, index) in $plugins" :key="plugin.id"
				    class="list-group-item d-flex justify-content-between align-items-center">
					{{ plugin.config.label }}
					<div class="custom-control custom-switch">
						<input :checked="plugin.active" type="checkbox" class="custom-control-input" :id="'s_customSwitch_' + index"
						       @change="updatePlugin(index)">
						<label class="custom-control-label" :for="'s_customSwitch_' + index">Toggle this switch
							element</label>
					</div>
				</li>
			</ul>
		</div>

		<div>
			<a href="#" @click="openDevTools">open dev console</a>

		</div>
	</div>
</template>

<script>
	const { remote } = require('electron');
	const mainWindow = remote.getCurrentWindow();

	export default {
		name: 'settings',
		components: {},
		data() {
			return {
				settings: {
					startApp: "home",
					downloads: {
						folder: "",
						maxDownloads: 3,
						maxUploads: 3,
						seed: true
					},
				}
			}
		},
		created(){
			const Self = this;
			this.$db.settings.get().then(function(settings) {
				Self.settings = settings[0];
				console.log(settings)
			});
		},
		methods: {
			updatePlugin(index) {
				this.settings.plugins = {};
				this.$plugins[index].active = !this.$plugins[index].active;
			},
			changeFolder(event){
				console.log(event);
				this.settings.downloads.folder = event.target.files[0].path;
			},
			saveInDB(){
				this.$db.settings = this.settings;
			},
			updateNotifications(){

			},
			openDevTools(){
				mainWindow.webContents.openDevTools();
			}
		},
	};
</script>