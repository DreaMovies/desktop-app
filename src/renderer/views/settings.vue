<template>
	<div class="wrapper page-settings">
	  <aside class="Sidebar">
		  <nav class="Sidebar__nav" role="navigation">
			  <ul class="Sidebar__nav-list">
				  <li class="Sidebar__nav-list__item ion-person-stalker"></li>
				  <li class="Sidebar__nav-list__item ion-music-note"></li>
				  <li class="Sidebar__nav-list__item ion-image"></li>
				  <li class="Sidebar__nav-list__item ion-android-film"></li>
				  <li class="Sidebar__nav-list__item ion-social-dribbble-outline"></li>
				  <li class="Sidebar__nav-list__item Sidebar__nav-list__item--active ion-levels"> </li>
			  </ul>
		  </nav>
	  </aside>
	  <section class="Details">
		  <header class="Details__header">
			  <h1 class="Details__title">Settings</h1>
		  </header>
		  <nav class="Details__nav" role="navigation">
			  <ul class="Details__nav-list">
				  <li class="Details__nav-list__item">Profile</li>
				  <li class="Details__nav-list__item">Password</li>
				  <li class="Details__nav-list__item">Notifications</li>
				  <li class="Details__nav-list__item Details__nav-list__item--active">Sync</li>
				  <li class="Details__nav-list__item">Advanced</li>
			  </ul>
		  </nav>
		  <div class="Details__body">
			  <ul class="Details__options-list">
				  <li class="Details__options-list__item">
					  <div class="Media">
						  <div class="Media__side Media__side--left"><img class="Media__image" id="google-drive" src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo_of_Google_Drive.png" alt=""/>
						  </div>
						  <div class="Media__body Media u-flex-center--v">
							  <div>
								  <h3>Google Drive</h3>
								  <p>Configure to sync design and code files from Google Drive</p>
							  </div>
							  <div class="Media__side Media__side--right">
								  <input class="checkbox-input" id="DetailsOptionCheckbox1" checked="checked" type="checkbox"/>
								  <label class="checkbox ion-ios-checkmark-empty" for="DetailsOptionCheckbox1"></label>
							  </div>
						  </div>
					  </div>
				  </li>
				  <li class="Details__options-list__item">
					  <div class="Media">
						  <div class="Media__side Media__side--left"><img class="Media__image" id="dropbox-sync" src="" alt=""/>
						  </div>
						  <div class="Media__body Media u-flex-center--v">
							  <div>
								  <h3>Dropbox Sync</h3>
								  <p>Configure to sync design and code files from Dropbox</p>
							  </div>
							  <div class="Media__side Media__side--right">
								  <input class="checkbox-input" id="DetailsOptionCheckbox2" type="checkbox"/>
								  <label class="checkbox ion-ios-checkmark-empty" for="DetailsOptionCheckbox2"></label>
							  </div>
						  </div>
					  </div>
				  </li>
				  <li class="Details__options-list__item">
					  <div class="Media">
						  <div class="Media__side Media__side--left"><img class="Media__image" id="adobe-creative cloud" src="https://upload.wikimedia.org/wikipedia/en/8/88/Adobe_Creative_Cloud_Logo.png" alt=""/>
						  </div>
						  <div class="Media__body Media u-flex-center--v">
							  <div>
								  <h3>Adobe Creative Cloud</h3>
								  <p>Configure to sync design and code files from Adobe Creative Cloud</p>
							  </div>
							  <div class="Media__side Media__side--right">
								  <input class="checkbox-input" id="DetailsOptionCheckbox3" type="checkbox"/>
								  <label class="checkbox ion-ios-checkmark-empty" for="DetailsOptionCheckbox3"></label>
							  </div>
						  </div>
					  </div>
				  </li>
				  <li class="Details__options-list__item">
					  <div class="Media">
						  <div class="Media__side Media__side--left"><img class="Media__image" id="box" src="https://upload.wikimedia.org/wikipedia/commons/0/00/Box_cyan.png" alt=""/>
						  </div>
						  <div class="Media__body Media u-flex-center--v">
							  <div>
								  <h3>Box</h3>
								  <p>Configure to sync design and code files from Box</p>
							  </div>
							  <div class="Media__side Media__side--right">
								  <input class="checkbox-input" id="DetailsOptionCheckbox4" checked="checked" type="checkbox"/>
								  <label class="checkbox ion-ios-checkmark-empty" for="DetailsOptionCheckbox4"></label>
							  </div>
						  </div>
					  </div>
				  </li>
				  <li class="Details__options-list__item">
					  <div class="Media">
						  <div class="Media__side Media__side--left"><img class="Media__image" id="icloud" src="https://upload.wikimedia.org/wikipedia/en/f/f0/ICloud_logo_%28new%29.png" alt=""/>
						  </div>
						  <div class="Media__body Media u-flex-center--v">
							  <div>
								  <h3>iCloud</h3>
								  <p>Configure to sync design and code files from iCloud</p>
							  </div>
							  <div class="Media__side Media__side--right">
								  <input class="checkbox-input" id="DetailsOptionCheckbox5" type="checkbox"/>
								  <label class="checkbox ion-ios-checkmark-empty" for="DetailsOptionCheckbox5"></label>
							  </div>
						  </div>
					  </div>
				  </li>
			  </ul>
		  </div>
		  <button class="Button Button--sync" id="sync"><span class="a-spin ion-loop"></span></button>
		</section>
	</div>
</template>

<script>

  export default {
    name: 'settings',
    components: {

    },
    methods: {
      // open(link) {
      // this.link = link;
      // require('electron').shell.openExternal(link);
      // },
    },
  };
</script>