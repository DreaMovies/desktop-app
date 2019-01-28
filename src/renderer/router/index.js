import Vue from 'vue'
import Router from 'vue-router'

/* Pages import */

import localMedia 	from '@/views/localMedia';
import movieList 	from '@/views/movieList';
import movieDetail 	from '@/views/movieDetail';
import tvshowList 	from '@/views/tvshowList';
import tvshowDetail from '@/views/tvshowDetail';
import settings 	from '@/views/settings';
import downloads 	from '@/views/downloads';

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: require('@/views/').default
		},
		{
			path: '/local-media',
			name: 'local-media',
			component: localMedia
		},
		{
			path: '/movie-list/:plugin',
			name: 'movie-list',
			component: movieList
		},
		{
			path: '/movie-detail/:plugin/:imdb/:id',
			name: 'movie-detail',
			component: movieDetail
		},
		{
			path: '/tvshow-list/:plugin',
			name: 'tvshow-list',
			component: tvshowList
		},
		{
			path: '/tvshow-detail/:plugin/:imdb/:id',
			name: 'tvshow-detail',
			component: tvshowDetail
		},
		{
			path: '/downloads',
			name: 'downloads',
			component: downloads
		},
		{
			path: '/settings',
			name: 'settings',
			component: settings
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
