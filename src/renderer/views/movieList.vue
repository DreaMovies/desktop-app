<template>
  <div>
    movie detail {{ $route.params.plugin }}
  </div>
</template>

<script>

  export default {
    name: 'movie-list',
    components: {
      
    },
    methods: {
      loadList(plugin){
        var plugin = $route.params.plugin;
        
      }
      // open(link) {
      // this.link = link;
      // require('electron').shell.openExternal(link);
      // },
    },
  };
</script>