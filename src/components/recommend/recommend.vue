<template>
	<div class="recommend" ref="reScroll">
		<div class="scroll-wrapper">
			<Banner/>
			<div class="three-class">
				<div class="one">
					<div class="inner"><span class="icon-directions_run"></span></div>
					<p>私人FM</p>
				</div>
				<div class="one">
					<div class="inner">{{initDate}}</div>
					<p>每日歌曲推荐</p>
				</div>
				<div class="one">
					<div class="inner"><span class="icon-chart-bar"></span></div>
					<p>新歌榜</p>
				</div>
			</div>
			<div class="song-sheet">
				<div class="title"><span class="icon-event_available"></span>推荐歌单
					<div class="more">
						更多<span class="icon-navigate_next"></span>
					</div>
				</div>
				<ul>
					<li v-for="item in songsheet">
						<div class="inner">
							<div class="img-wrapper">
								<div class="img">
									<img :src="item.img">
								</div>
								<div class="listener"><span class="icon-headset"></span>{{item.listener}}万</div>
							</div>
							<p>{{item.sheet_name}}</p>
						</div>
					</li>
				</ul>
				
			</div>
		</div>
	</div>
</template>

<script>

import Banner from './banner.vue'
import BScroll from 'better-scroll'

export default {
	components:{
		Banner
	},
	props:{
		songsheet:{
			type:Array
		}
	},
	computed:{
		initDate(){	//获取当前日期
			var date = new Date();
			return date.getDate()
		}
	},
	created() {
		this.$nextTick(() => {
			this.reScroll = new BScroll(this.$refs.reScroll,{
				click:true
				// eventPassthrough:true
			})
		})
	}
}

</script>

<style lang='stylus'>
.recommend
	/*height:100%*/
	overflow:auto
	width:100%
	.scroll-wrapper
		.three-class
			display:flex
			text-align:center
			.one
				flex:1
				color:#98989a
				.inner
					color:#98989a
					width:54px
					height:54px
					border:1.5px solid #98989a
					border-radius:50%
					margin: 20px auto
					line-height:54px
					font-size:25px
					margin-bottom:8px
					span
						color:#98989a
				p
					font-size:12px
					color:#98989a
		.song-sheet
			margin-top:26px
			padding:0 4px
			.title
				font-size:16px
				.icon-event_available
					margin-right:4px
				.more
					display:inline-block
					float:right
					font-size:12px
					line-height:16px
			ul
				display:flex
				margin-top:10px
				flex-flow:row wrap
				width:100%
				justify-content:center
				align-item:center
				li
					flex:1
					margin-bottom:12px
					.inner
						width:110px
						margin: 0 auto
						padding:2px
						.img-wrapper
							position:relative
							.img
								width:110px
								height:110px
							.listener
								position:absolute
								top:4px
								right:4px
								color:#FFF
								font-size:10px
								span
									color:#FFF
						p
							font-size:12px
							margin-top:4px
							width:100%
							overflow:hidden
							line-height:16px
							height:32px
							text-overflow:ellipsis
							white-space:wrap


</style>
