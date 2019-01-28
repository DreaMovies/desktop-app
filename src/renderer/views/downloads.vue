<template>
  <div class="page-downloads">

  </div>
</template>

<script>
  export default {
    name: 'downloads',
    data() {
      return {
        electron: process.versions.electron,
        node: process.versions.node,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
        app_version: require('os').platform(),
        app_update: false,
      };
    },
    created() {
      this.app_update = true;
    },
  };
</script>