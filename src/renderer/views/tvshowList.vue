<template>
  <div class="page-tvshow-list">
    movie detail {{ $route.params.id }}
  </div>
</template>

<script>

  export default {
    name: 'movie-list',
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