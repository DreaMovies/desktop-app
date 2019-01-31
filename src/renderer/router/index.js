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
import player 		from '@/views/player';
import chat 		from '@/views/chat';
import fileExplorer	from '@/views/file-explorer';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: require('@/views/').default
		},
		{
			path: '/explorer',
			name: 'explorer',
			component: fileExplorer
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
			path: '/movie-detail/:plugin/:id',
			name: 'movie-detail',
			component: movieDetail
		},
		{
			path: '/tvshow-list/:plugin',
			name: 'tvshow-list',
			component: tvshowList
		},
		{
			path: '/tvshow-detail/:plugin/:id',
			name: 'tvshow-detail',
			component: tvshowDetail
		},
		{
			path: '/downloads',
			name: 'downloads',
			component: downloads
		},
		{
			path: '/player',
			name: 'player',
			component: player,
			props: true,
		},
		{
			path: '/settings',
			name: 'settings',
			component: settings
		},
		{
			path: '/chat',
			name: 'chat',
			component: chat
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})
