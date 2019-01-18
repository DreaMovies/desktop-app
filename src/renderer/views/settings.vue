<template>
  <div id="wrapper" class="page-settings">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Settings!
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
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
    name: 'settings',
    components: { SystemInformation },
    methods: {
      // open(link) {
      // this.link = link;
      // require('electron').shell.openExternal(link);
      // },
    },
  };
</script>