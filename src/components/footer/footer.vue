<template>
	<div class="footer">
		<div class="footer-wrapper"  @click="toPlayPage">
			<div class="yingui">
				<div class="onload-line" ref="onloadLine"></div>
				<div class="playing-line" ref="playingLine"></div>
			</div>
			<div class="do-song">
				<div class="song-img"><img :src="defaultSong.img"></div><!--
				--><div class="song-text">
					<div class="song-name"><span>{{defaultSong.song_name}}</span></div>
					<div class="author-name">{{defaultSong.author_name}} </div>
				</div>
			</div>
			<div class="song-contreller">
				<div class="play-list" @click.stop="showList"><span class="icon-list1"></span></div><!--
				--><div class="pre-song" @click.stop="changeSong(songIndex,-1)">
					<span class="icon-skip-back"></span>
				</div><!--
				--><div class="star-stop" @click.stop="audioPush(songIndex)">
					<span :class="playIcon"></span>
				</div><!--
				--><div class="next-song" @click.stop="changeSong(songIndex,1)">
					<span class="icon-skip-forward"></span>
				</div>
			</div>
		</div>
		<transition name="footer-list" >
			<div class="bbbb" v-show="songlistShow" @click.stop="showList"></div>
		</transition>
		<transition name="footer-list">
			<div class="footer-songslist" v-show="songlistShow">
				<div class="list-heade" >
					<div class="inner">
						<span class="all">总共{{songs.length}}首</span>
						<div class="right">
							<span class="icon-date-add"> 收藏</span><!--
							--><span class="icon-trash-2"></span>
						</div>
					</div>
				</div>
				<SongList ref="songlist" :songs="songs" :musicControll="musicControll"/>

			</div>
		</transition>
		<audio ref="audio">
			<source :src="defaultSong.play_url" type="audio/mp3">
		</audio>
	</div>
</template>

<script>
import SongList from '../songslist/songslist.vue'

export default {
	props:{
		songs:{
			type:Array
		},
		musicControll:{
			type:Object
		}
	},
	components:{
		SongList
	},
	data() {
		return {
			songIndex:0,
			songlistShow:false
		}
	},
	computed:{
		defaultSong() {
	        for(let i=0; i<this.songs.length; i++){
	        	if (this.songs[i].song_id == this.musicControll.songID) {
	        		this.songIndex = i;
	        		// console.log(this.songIndex)
	        		return this.songs[i];
	        	}
	        }

	    },
     	playIcon(){
	        return this.musicControll.isPlaying ? 'icon-pause-outline':'icon-play-outline'
	    }
	},
	methods:{
	    audioPush(index) {
       		this.musicControll.audioPush(index)
		},
		changeSong(index,n){
			this.musicControll.changeSong(index,n)
		},
		showList(){
			this.songlistShow = !this.songlistShow
			this.$refs.songlist.xxx()
		},
		toPlayPage() {
			this.$router.push('/playingpage')
		}
	}, 
	created() {
		this.$nextTick(() => {
			//初始化播放模块
			var audio = this.$refs.audio;
			this.musicControll._initAudio(audio)
		})
	},
	
	watch:{
		"musicControll.playingLine":function(n,o) {
			this.$refs.playingLine.style.width = n+"%"
		},
		"musicControll.bufferLine":function(n,o) {
			this.$refs.onloadLine.style.width = n+"%"
		}
		
	}
}
</script>

<style lang='stylus'>
.footer
	height:48px
	position:fixed
	bottom:0
	left:0
	width:100%
	/*background-color:#222*/
	.footer-wrapper
		position:absolute
		top:0
		left:0
		height:100%
		display:flex
		background-color:#222
		width:100%
		z-index:100
		.do-song
			margin-top:4px
			margin-left:8px
			flex:1
			.song-img
				display:inline-block
				width:40px
				height:40px
				overflow:hidden
				border-radius:5px
			.song-text
				display:inline-block
				vertical-align:top
				margin-left:8px
				.song-name
					font-size:14px
					line-height:20px
					width:100px
					white-space:nowrap
					/*overflow:hidden*/
					text-overflow:ellipsis
				.author-name
					font-size:10px
					line-height:20px
		.song-contreller
			flex:1
			margin-right:8px
			text-align:right
			font-size:25px
			color:#961010
			/*line-height:48px*/
			.play-list
			.star-stop
			.next-song
			.pre-song
				display:inline-block
				vertical-align:middle
				padding:8px 10px
				margin-top:3px
			.star-stop
				padding:0px
				font-size:30px
		.yingui
			position:absolute
			top:0
			left:0
			width:100%
			z-index:1000
			.playing-line
			.onload-line
				position:absolute
				top:0
				left:0
				border-top:1px solid rgba(152, 152, 152, 0.4)
			.playing-line
				border-color:#961010
	.bbbb
		height:100%
		width:100%
		position:fixed
		top:0
		left:0
		filter:blur(10px)
		background-color:rgba(0,0,0,.7)
		transition:all 0.1s linear
		&.footer-list-enter,&.footer-list-leave-to
			opacity:0
		&.footer-list-enter-to,&.footer-list-leave
			opacity:1
	.footer-songslist
		position:fixed
		bottom:0
		z-index:10
		width:100%
		background-color:#19181d
		border-radius:5px
		overflow:hidden
		border-top:1px solid #525252
		transition:all 0.1s linear
		&.footer-list-enter,&.footer-list-leave-to
			opacity:0
			transform:translateY(10px)
		&.footer-list-enter-to,&.footer-list-leave
			opacity:1
			transform:translateY(0)
		.songslist
			position:relative
			height:50vh
			.songslist-wrapper
				padding-top:0
				li
					height:40px
					.left
						.song-img
							display:none
						.song
							padding:0
							.name,.author
								display:inline-block
								font-size:14px
								line-height:40px
								vertical-align:top
							.author
								span
									&:last-child
										display:none
									&:first-child
										font-size:10px
										&:before
											content:' - '
					.right
						line-height:40px			
		.list-heade
			display:block
			background-color:#222
			height:48px
			padding:0 8px
			.all,.right
				display:inline-block
				line-height:48px
				font-size:14px
			.right
				float:right
				.icon-trash-2
					padding-left:15px
					padding-right:7px
				.icon-date-add
					padding-right:15px
					border-right:1px solid rgba(152,152,152,.16)

</style>
