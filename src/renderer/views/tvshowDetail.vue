<template>
  <div>
    movie detail {{ $route.params.id }}
  </div>
</template>

<script>

  export default {
    name: 'movie-detail',
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