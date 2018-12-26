<template>
	<div class="home">
		<Tab/>
		<transition :name="transitionName"> 
			<router-view :songsheet="songsheet" />
		</transition>
	</div>
</template>

<script>
import Tab from '../tab/tab.vue'

const debug = process.env.NODE_ENV == 'production';
export default {
	components:{
		Tab
	},
	data() {
		return {
			songsheet:[],
			transitionName:''
		}
	},
	created() {
		var _this = this;
		const url = debug ? './api/songsheet.php' : '/api/songsheet';
		this.$http.get(url).then((res) => {
			res = res.body;
			if (res.errnum === 0) {
				_this.songsheet = res.data;
			}
		}).catch(err => {
    console.log(err) // 这里catch到错误timeout
  })
	},
	watch:{
		$route:function(to,from){
			if (to.meta.index > from.meta.index) {
				this.transitionName = "view-right"
			}else if (to.meta.index < from.meta.index) {
				this.transitionName = "view-left"
			}
		}
	}
}

</script>

<style lang='stylus'>
.radio
.ranking
.recommend
.songsheet
	position:absolute
	top:96px
	bottom:48px
	&.view-right-enter
		transform:translateX(100vw)
	&.view-right-leave-to
		transform:translateX(-100vw)
	&.view-right-enter-to,&.view-right-leave
		transform:translateX(0)
	&.view-left-enter
		transform:translateX(-100vw)
	&.view-left-leave-to
		transform:translateX(100vw)
	&.view-left-enter-to,&.view-left-leave
		transform:translateX(0)
	&.view-right-enter-active,
	&.view-right-leave-active,
	&.view-left-enter-active,
	&.view-left-leave-active
		will-change: transform
		transition: all 0.4s
		position: absolute
	

</style>
