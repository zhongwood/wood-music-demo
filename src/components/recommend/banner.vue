<template>
	<div class="banner">
		<ul>
			<span v-if="img.length<=0" class="icon-photo"></span>
			<li class="banner-list"  v-for="item in img">
				<img class="banner-img" :src="item.img">
			</li>
		</ul>
	</div>
</template>

<script>
const debug = process.env.NODE_ENV == 'production';
export default {
	data() {
		return {
			img:[]
		}
	},
	created() {
		var _this = this;
		const url = debug ? './api/bannerimg.php' : '/api/bannerimg';
		this.$http.get(url).then((res)=>{
			res = res.body;
			if(res.errnum === 0){
				_this.img = res.data;
			}
		}).catch(err => {
    console.log(err) // 这里catch到错误timeout
  })
	}
}

</script>

<style lang='stylus'>
	.banner
		width:100%
		overflow:auto
		overflow-y:hidden
		ul
			width:500vw
			height:176px
			.banner-list
				display:inline
				.banner-img
					width:100vw
					height:176px
</style>
