<template>
  <div id="wrapper" class="page-index">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Dreamovies!
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Welcome to Dreamovies App</div>
          <p>
            With this app you will be able to see local media content and get information about movies and shows from
            the internet as well from other sources.
          </p>
	        <label for="username">Set your username</label>
	        <input type="text" v-model="username" id="username" class="form-control">
	        <span class="username-check"></span>
          <!-- <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br> -->
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <!-- <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
          <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from '@/views/about';

  export default {
    name: 'landing-page',
    components: { SystemInformation },
	  data() {
		  return {
			  settings: ""
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