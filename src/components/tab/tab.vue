<template>
	<div class="tab">
		<div class="link-wrapper">
			<router-link @click.native="navFun" class="link" to="/home/recommend">个性推荐</router-link>
			<router-link @click.native="navFun" class="link" to="/home/songsheet">歌单</router-link>
			<router-link @click.native="navFun" class="link" to="/home/radio">主播电台</router-link>
			<router-link @click.native="navFun" class="link" to="/home/ranking">排行榜</router-link>
		</div>
		<div class="bottom-line">
			<div class="inner" ref="lineItem"></div>
		</div>
	</div>
</template>

<script>

export default {
	name:'tab',
	methods:{
		navFun() {
			var _this = this;
			this.$nextTick(()=>{
				var toLeft = _this.$el.getElementsByClassName("router-link-exact-active")[0].offsetLeft;
				var line = _this.$refs.lineItem;
				line.style.left=toLeft+"px"
			})
		}
	},
	created() {
		this.navFun()
	}
}
</script>
<style lang='stylus'>
.tab
	position:fixed
	top:50px
	left:0
	width:100%
	box-shadow: 0 6px 6px rgba(0,0,0,.35)
	.link-wrapper
		display:flex
		width:100%
		background-color: #222;
		.link
			flex:1
			text-align:center
			font-size:14px
			padding:16px 0
			color:#98989a
			&.router-link-active
				color:#fff
	.bottom-line
		position:absolute
		bottom:0
		left:0
		width:100%
		/*height:3px*/
		z-index:5
		.inner
			border-top:2px solid #961010
			width:25%
			position:absolute
			bottom:0
			transition:all .2s linear

</style>
