<template>
  <div class="page-local-media">
    lets go
    <itemMovie :movie="movie"></itemMovie> 
  </div>
</template>

<script>
  import itemMovie from '@/components/elements/item_movie';

  export default {
    name: 'local-media',
    components: { itemMovie },
    data: function(){
      return {
        movie: {
          imdb: "tt12312",
          title: "star wars",
          poster: "https://television.mxdwn.com/wp-content/uploads/2016/08/stranger-things1-770x470.jpeg",
          year: "2019",
          rating: "5.5",
          duration: "88"
        }
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