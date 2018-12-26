<template>
	<div class="songslist" ref="songsList">
		
		<div class="songslist-wrapper">
			<ul>
				<li v-for="song in songs" @click="doPlayMusic(song.song_id)" class="border-1px" :class="{'songs-active':song.song_id == musicControll.songID}">
					<div class="left">
						<div class="song-img"><img :src="song.img"></div><!--
						--><div class="song">
							<div class="name">{{song.song_name}}</div>
							<div class="author"><span>{{song.author_name}}</span><span> - {{song.album_name}}</span></div>
						</div>
					</div>
					<div @click.stop="audioMuted" v-show="song.song_id == musicControll.songID" class="right">
						<span :class="mutedIcon"></span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
	props:{
		songs:{
			type:Array
		},
		musicControll:{
			type:Object
		}
	},
	data() {
		return{
			isMuted:false
			
		}
	},
	computed:{
		mutedIcon(){
			return this.isMuted?'icon-volume-x':'icon-volume-2';
		}
	},
	methods:{
		doPlayMusic(id){

			this.musicControll.doPlayMusic(id)
		},
		audioMuted() {
			this.isMuted = !this.isMuted
			this.musicControll.audioMuted(this.isMuted)
		},
		xxx() {
			this.$nextTick(() => {
				if (!this.listScroll) {
					this.listScroll = new BScroll(this.$refs.songsList,{
						click:true
					})
				}else{
					this.listScroll.refresh();
				}
			})
		}
	},
	created() {
		this.xxx()
	}
}

</script>

<style lang='stylus' >
.songslist
	height:100%
	position:absolute
	top:0
	left:0
	overflow:auto
	width:100%
	.songslist-wrapper
		padding:54px 8px 48px 8px
		.songs-active
			color:#961010
		li
			height:60px
			display:flex
			&:active
				background-color:#404040
			.left
				flex:1
				white-space:nowrap
				overflow:hidden
				text-overflow:ellipsis
				.song-img,.song
					display:inline-block
				.song-img
					width:38px
					height:38px
					margin-top:11px
					overflow:hidden
					border-radius:5px
				.song
					font-size:14px
					line-height:19px
					max-width:250px
					white-space:nowrap
					text-overflow:ellipsis
					overflow:hidden
					vertical-align:top
					margin-left:8px
					padding:11px 0
					/*.name*/
					.author
						font-size:10px
						white-space:nowrap
						text-overflow:ellipsis
						overflow:hidden
			.right
				font-size:18px
				line-height:60px
				padding:0 10px
			.icon-volume-x
				color:#98989a
	.list-heade
		display:none
</style>
