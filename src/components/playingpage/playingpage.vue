<template>
	<div class="playingpage">
		<div class="bg"><img :src="defaultSong.img"></div>
		<div class="heade" v-if="defaultSong.song_name">
			<div class="go-back" @click="goBack"><span class="icon-arrow_lift"></span></div>
			<div class="song">
				<div class="song-name" >{{defaultSong.song_name}}</div>
				<div class="author-name">{{defaultSong.author_name}}</div>
			</div>
			<div class="share">分享</div>
			<div class="line"></div>
		</div>
		<div class="content">
			<div class="img-wrapper" >
				<div class="img" ><img ref="imgDiv" :src="defaultSong.img"></div>
			</div>
			<div class="url">
				<ul>
					<li class="lrc-aa" v-if="musicControll.lrcArr[lrcIndex-1]">{{musicControll.lrcArr[lrcIndex-1].text}}</li>
					<li class="lrc-active">{{musicControll.lrcArr[lrcIndex+0].text}}</li>
					<li class="lrc-aa" v-if="musicControll.lrcArr[lrcIndex+1]">{{musicControll.lrcArr[lrcIndex+1].text}}</li>
				</ul>
			</div>
		</div>
		<div class="controll">
			<div class="play-line" @touchend="changeTime">
				<div class="now-time">{{parseNowTime}}</div>
				<div class="line-bar">
					<input @click="setTime1()" :style="lineStyle" v-model="nowTime" :max="maxTime" type="range">
				</div>
				<div class="all-time">{{parseMaxTime}}</div>
			</div>
			<div class="cotr-button">
				<div @click="loopPlay" class="class-flex play-mode"><span :class="modeIcon"></span></div>
				<div @click="changeSong(songIndex,-1)" class="class-flex pre-song"><span class="icon-skip-back"></span></div>
				<div @click="audioPush(songIndex)" class="class-flex star-stop"><span :class="playIcon"></span></div>
				<div @click="changeSong(songIndex,1)" class="class-flex next-song"><span class="icon-skip-forward"></span></div>
				<div @click="gotoList()" class="class-flex songs-list"><span class="icon-list1"></span></div>
			</div>
		</div>
	</div>
</template>

<script>

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
		return {
			songIndex:0,
			maxTime:0,
			minTime:0,
			nowTime:0,
			playMode:false,
			lrcIndex:0,
			n:0, 	//设置歌词初始index
			s:0.5 	//歌词偏移
		}
	},
	methods:{
		imgRotate() {
			var _this = this;
			var imgDiv = this.$refs.imgDiv;
			var DEG = 0;
			// alert("开")
			// console.log(this.$refs.imgDiv)
			_this.imgRotate.timer = setInterval(function(){
				DEG += 45
				// console.log(DEG)
				imgDiv.style.transform = `rotateZ(${DEG}deg)`;
			},2000)
			_this.imgRotate.stop = function(){
				// alert("关")
				clearInterval(_this.imgRotate.timer);
				imgDiv.style.transform = 'rotateZ(0deg)';
			}
		},
		_initTime() {
			var _this = this;
			if (this.musicControll) {
				var audio = this.musicControll.audio;
				_this.maxTime = audio.duration;
			}
		},
		setTime1() {
			this.musicControll.setCurrentTime(n)
			// console.log(1111)
		},
		goBack() {
			window.history.go(-1)
		},
		changeSong(index,n){
			this.musicControll.changeSong(index,n)
		},
		audioPush(index) {
	    	this.musicControll.audioPush(index)
		},
		gotoList(){
			this.$router.push('/songslist')
		},
		loopPlay() {
			this.playMode = !this.playMode
			this.musicControll.loopPlay()
		},
		changeTime() {
			// console.log(this.imgRotate)
       		
			// console.log(this.musicControll.isPlaying)
			this.musicControll.setCurrentTime(this.nowTime)
			// alert(this.musicControll.isPlaying)
       		
		},
	    setLrc(t) {
	    	var arr = this.musicControll.lrcArr;
	    	var n = this.n;
	    	var _this =this;
	    	t=t+_this.s
	    	arr.forEach((val,i)=>{
	    	// console.log(arr.length)
	    		// if (i == arr.length-1) {
	    		// 	_this.lrcIndex = i
	    		// }else{
			    		// console.log(_this.musicControll.audio.duration)
			    	if (arr[i].time <= t && t <= _this.musicControll.audio.duration) {
			    		_this.lrcIndex = i;
			    		return
			    	}
	    			
	    		// }
	    		
	    	})
	    	
	    }
	},
	computed:{
		defaultSong() {
	        for(let i=0; i<this.songs.length; i++){
	        	if (this.songs[i].song_id == this.musicControll.songID) {
	        		this.songIndex = i;
	        		// console.log(this.songs[i].img)
	        		return this.songs[i];
	        	}
	        }
	    },
	    lineStyle() {
	    	var a = (this.nowTime*100)/this.maxTime;
	    	return {background:`-webkit-linear-gradient(top,#961010,#961010) 0% 0% / ${a}% 100% no-repeat`}
	    },
	    parseNowTime() {
	    	var time = parseInt(this.nowTime);
	    	var fen = parseInt(time/60);
	    	var miao = time%60;
	    	var ss = function(n){
	    		if (n<10) {
	    			return "0"+n
	    		}else{
	    			return n
	    		}
	    	}
	    	return ss(fen)+":"+ss(miao)
	    },
	    parseMaxTime() {
	    	// return parseInt(this.maxTime)
	    	var time = parseInt(this.maxTime);
	    	var fen = parseInt(time/60);
	    	var miao = time%60;
	    	var sss = function(n){
	    		if (n<10) {
	    			return "0"+n
	    		}else{
	    			return n
	    		}
	    	}
	    	return sss(fen)+":"+sss(miao)
	    },
	    playIcon(){
	        return this.musicControll.isPlaying ? 'icon-pause-outline':'icon-play-outline'
	    },
	    modeIcon() {
	    	return this.playMode? 'icon-repost' : 'icon-shuffle'
	    }
	},
	watch:{
		// nowTime:function(n,o){
		// 	this.musicControll.setCurrentTime(n)
		// },
		'musicControll.playingLine':function(n,o){
			var t = this.musicControll.audio.currentTime
			this.nowTime = t
			// console.log(t)
			this.setLrc(t)
		}
	},
    created:function(){
    	this.$nextTick(() => {
			this.imgRotate()
			this._initTime()
		})
        // console.log('2-created 创建完成');
    },
    updated() {
    	this._initTime()
    	// console.log(this.maxTime)
    }
}

</script>

<style lang='stylus'>
.playingpage
	position:fixed
	top:0
	left:0
	width:100%
	height:100%
	background: linear-gradient(to top, #202020, #202020, #3b3b3b)
	z-index:100
	color:rgba(255,255,255,.5)
	text-shadow: 0px 1px 0px rgba(0,0,0,0.23);
	.bg
		position:fixed
		z-index:-1
		height:100%
		width:100%
		filter:blur(50px)
	.heade
		width:100%
		height:50px
		background:linear-gradient(to bottom,rgba(0,0,0,.5)50%,rgba(0,0,0,.3),rgba(0,0,0,0))
		.go-back
		.song
			display:inline-block
		.go-back
			line-height:50px
			padding:0 10px
			vertical-align:top
		.song
			.song-name
				line-height:20px
				font-weight:600
				margin-top:5px
			.author-name
				line-height:20px
				font-size:12px
		.share
			float:right
			line-height:50px
			padding:0 10px
		.line
			width:100%
			height:1px
			background: linear-gradient(to right, rgba(255,255,255,0) ,rgba(255,255,255,0.4),rgba(255,255,255,0))
	.content
		.img-wrapper
			width:100%
			.img
				width:120px
				height:120px
				overflow:hidden
				border-radius:50%
				padding:30px
				background:linear-gradient(#1f1f1f ,#1f1f1f,rgb(66,66,66),#1f1f1f,#1f1f1f)
				margin:0 auto
				margin-top:30px
				border:3px solid rgba(255,255,255,.75)
				box-shadow:inset 0px 0px 1px 2px rgba(0, 0, 0, 0.08)
				img
					transition:all 2s linear
					transform:rotateZ(0deg)
					border-radius:50%
					box-shadow:0px 0px 2px 3px rgba(0,0,0,0.5)
		.url
			ul
				text-align:center
				margin-top:20px
				.lrc-aa
				.lrc-active
					padding: 10px 0
				.lrc-aa
					color:rgba(255,255,255,.5)
				.lrc-active
					color:#fff

	.controll
		position:absolute
		bottom:0
		left:0
		width:100%
		padding:20px 0
		background: linear-gradient(to top, rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.65), rgba(0,0,0,0.3), rgba(0,0,0,0));
		.play-line
			width:90%
			margin:0 auto
			display:flex
			.now-time,.all-time
				font-size:10px
				height:16px
				line-height:18px
				vertical-align:bottom
			.line-bar
				flex:1
				height:16px
				text-align:center
				input[type=range]/*划线样式*/
					vertical-align:middle 
					appearance: none		
					width:90%
					height:2px
					border-radius:1px
					background-color:rgba(255,255,255,.5) !important
					box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.23);
					/*background:-webkit-linear-gradient(top,red,red)*/
					/*滑块样式*/
					&::-webkit-slider-thumb
						-webkit-appearance: none
						height:12px
						width:12px
						border:3px solid rgba(255,255,255,.9)
						border-radius:9px
						background-color:#961010
						box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.23);
					&::range-progress
						background:red
					&:focus
						outline:none
		.cotr-button
			display:flex
			font-size:25px
			.class-flex
				flex:1
				text-align:center
				height:50px
				margin-top:20px
				line-height:50px
			.star-stop
				font-size:40px
</style>
