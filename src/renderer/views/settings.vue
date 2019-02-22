<template>
	<div class="wrapper page-settings container-fluid">

		<b-card no-body>
			<b-tabs pills card>
				<b-tab title="User Settings" active>

					<div class="form-group row">
						<label for="inputUsername" class="col-sm-2 col-form-label">Username</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="inputUsername" placeholder="Username">
						</div>
					</div>
					<div class="form-group row">
						<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" id="inputPassword" placeholder="Password">
						</div>
					</div>

				</b-tab>
				<b-tab title="App">

					<div>
						<div class="custom-control custom-switch">
							<input type="checkbox" class="custom-control-input" id="customSwitch_toTray"
							       @change="updateNotifications">
							<label class="custom-control-label" for="customSwitch_toTray">Minimize app to tray</label>
						</div>
					</div>

					<div class="form-group row">
						<label for="locale" class="col-sm-2 col-form-label">locale:</label>
						<div class="col-sm-10">
							<select id="locale" class="form-control" v-model="locale">
								<option value="en">English</option>
								<option value="pt">Portugues</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
							</select>
							<p>Local Change Test: <small>{{ $t('welcome.title') }}</small></p>
						</div>
					</div>
					<div class="form-group row">
						<label for="app_start_with" class="col-sm-2 col-form-label">Start App with:</label>
						<div class="col-sm-10" id="app_start_with">
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
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitch_darkMode"
						       @change="updateNotifications">
						<label class="custom-control-label" for="customSwitch_darkMode">App in Dark Mode</label>
					</div>

					<div class="form-group row">
						<label class="col-sm-2 col-form-label">Double click on item to:</label>
						<div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="play" @change="updateNotifications">
								<label class="custom-control-label" for="customRadioInline1">Play Content</label>
							</div>
							<div class="custom-control custom-radio custom-control-inline">
								<input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="download" @change="updateNotifications">
								<label class="custom-control-label" for="customRadioInline2">Download</label>
							</div>
						</div>
					</div>


				</b-tab>
				<b-tab title="Player">
					<div>
						<div class="custom-control custom-switch">
							<input type="checkbox" class="custom-control-input" id="customSwitch_subtitles"
							       @change="updateNotifications">
							<label class="custom-control-label" for="customSwitch_subtitles">Automaticly download Subtitles</label>
						</div>
					</div>

				</b-tab>
				<b-tab title="Notifications">

					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitch_notifications"
						       @change="updateNotifications">
						<label class="custom-control-label" for="customSwitch_notifications">Show Notifications</label>
					</div>
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitch_notification_shows"
						       @change="updateNotifications">
						<label class="custom-control-label" for="customSwitch_notification_shows">Notifications for new episodes of favorited Tv Shows</label>
					</div>
				</b-tab>
				<b-tab title="Plugins">

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
				</b-tab>
				<b-tab title="Torrents">

					<div class="form-group row">
						<label for="inputPassword" class="col-sm-2 col-form-label">Download Location</label>
						<div class="col-sm-10">
							<div class="custom-file">
								<input id="customFileLangHTML"
								       type="file"
								       class="custom-file-input"
								       placeholder="Choose a file..."
								       drop-placeholder="Drop file here..."
								       @change="changeFolder"
								       webkitdirectory>
								<label class="custom-file-label" for="customFileLangHTML" data-browse="Selecionar">
									{{ (settings.downloads.folder != "" ? settings.downloads.folder : "Selecionar Pasta") }}
								</label>
							</div>
							<small>{{ (settings.downloads.folder != "" ? settings.downloads.folder : "") }}</small>
						</div>
					</div>

					<div>
						<label for="maxDownloads">Max Downloads Same Time: {{ settings.downloads.maxDownloads }}</label>
						<input type="range" v-model="settings.downloads.maxDownloads" class="custom-range" min="0" max="10" step="1" id="maxDownloads">
						<span>0</span>
						<span style="float:right;">10</span>
					</div>

					<div>
						<label for="maxUploads">Max Uploads Same Time: {{ settings.downloads.maxUploads }}</label>
						<input type="range" v-model="settings.downloads.maxUploads" class="custom-range" min="0" max="10" step="1" id="maxUploads">
						<span>0</span>
						<span style="float:right;">10</span>
					</div>

				</b-tab>
				<b-tab title="About">

					<system-information></system-information>
					<div>
						<a href="#" @click="openDevTools">open dev console</a>
					</div>
				</b-tab>
			</b-tabs>
		</b-card>

	</div>
</template>

<script>
	const { remote } = require('electron');
	const mainWindow = remote.getCurrentWindow();
	import SystemInformation from '@/views/about';

	export default {
		name: 'settings',
		components: { SystemInformation },
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
				},
				locale: 'en'
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
				console.log("Open console");
				mainWindow.webContents.openDevTools();
			}
		},
		watch: {
			locale (val) {
				this.$i18n.locale = val;
			}
		}
	};
</script>