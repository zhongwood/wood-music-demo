<template>
	<div class="m-header">
		<div class="left-back" @click="goback()"><span class="icon-home"></span></div>
		<div class="middel-title">
			<span class="icon-music-notes"></span>
			{{title}}
		</div>
		<router-link class="right-list" to="/songslist"><span class="icon-list1"></span></router-link>
	</div>
</template>

<script>

export default {
	data() {
		return {
			title:'music player'
		}
	},
	methods:{
		goback() {
			this.$router.push("/")
		}
	}
}

</script>

<style lang='stylus'>
.m-header
	height:50px
	width:100%
	background-color:#222222
	font-size:16px
	text-align:center
	position:fixed
	top:0
	left:0
	z-index:100
	.middel-title
		color:#fff
		line-height:50px
		span
			color:#fff
	.left-back
	.right-list
		display:inline-block
		position:absolute
		font-size:20px
		top:0
		padding:17.5px 10px
		span
			color:#fff
	.left-back
		left:0
	.right-list
		right:0
		.icon-list1
			font-weight:700


</style>
