import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
// Home --二级路由
import Recommend from '@/components/recommend/recommend'
import Songsheet from '@/components/songsheet/songsheet'
import Radio from '@/components/radio/radio'
import Ranking from '@/components/ranking/ranking'
import SongsList from '@/components/songslist/songslist'
import PlayingPage from '@/components/playingpage/playingpage'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '*',redirect: "/home/recommend"},
    {path: '/',redirect: "/home/recommend"},
    {
    	path: '/home',
    	component: Home,
    	children:[
    		{path: '/home',redirect:'/home/recommend'},
    		{path: '/home/recommend',component: Recommend,meta:{index:0}},
    		{path: '/home/songsheet',component: Songsheet,meta:{index:1}},
		    {path: '/home/radio',component: Radio,meta:{index:2}},
		    {path: '/home/ranking',component: Ranking,meta:{index:3}}
    	]
    },
    {path: '/songslist',component:SongsList},
    {path: '/playingpage',component:PlayingPage}

    
  ]
})
