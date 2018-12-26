<template>
  <div id="app" >
    <Header/>
    <router-view :songs="songs" :musicControll="musicControll"/>
    <Footer :songs="songs" :musicControll="musicControll" v-if="songs != ''" />
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'

const debug = process.env.NODE_ENV == 'production';
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data() {
  	return {
  		songs:[],
      musicControll:{
        audio:'',
        isPlaying:false,  // 播放按钮
        songID:'',         // 当前歌曲ID
        bufferLine:0,     // 加载线宽度 
        playingLine:0,    // 播放线长度
        allTime:0,        // 歌曲时间 
        isLoop:false,      //循环播放
        lrcArr:[]           //歌词数组
        // audioPush(audio)  播放暂停(传入控制的audio)
        //changeSong(index,n)   切换歌曲(当前歌曲索引，n) -1 上一首 1 下一首
      }
  	}
  },
  created() {
  	var _this = this;
    this._musicControll();
    const url = debug ? './api/songs.php' : '/api/songs';
  	this.$http.get(url).then((res) => {
  		res = res.body;
  		if (res.errnum === 0) {
  			this.songs = res.data
        // console.log(this.songs)
        this.musicControll.songID = res.data[0].song_id;
  		}
  	}).catch(err => {
    console.log(err) // 这里catch到错误timeout
  })
    // 
  },
  methods:{
    _musicControll() {
      var _this = this

      //初始化
      this.musicControll._initAudio = function(audio) {
        _this.musicControll.audio = audio;


        // _this._doPlaying()

       audio.oncanplay = function() {
        _this.musicControll.allTime = audio.duration;
        _this._bufferline(audio);
        if (audio.ended) {
          _this.musicControll.changeSong(index+1,1)
        }
       }
      _this._initLyrics()
      }

      //控制音乐播放暂停
      this.musicControll.audioPush = function(index) {
        // console.log(this.audioPush)
        _this.musicControll.isPlaying = true;
        _this.musicControll.changeSong(index,0)

        this.audioPush = _this._audioPush;
        // console.log(this.audioPush)

      }

      //前进/后退 切换歌曲
      this.musicControll.changeSong = function(index,n) {
        if (_this._playingLine.timer) {
          // alert("oncanplay qiehuan之后 关")
          clearInterval(_this._playingLine.timer)
        }
        if (_this._bufferline.timer) {    //如果在加载 则关闭
          // alert("oncanplay qiehuan之后 关")
          clearInterval(_this._bufferline.timer)
        }
        _this.musicControll.bufferLine = 0;   //切换歌曲后设置加载线为0
        _this.musicControll.playingLine = 0;


        var audio = _this.musicControll.audio;
       
        var i = index+n;
        if(i <= 0){                            //第一首歌
          i = 0;
        }else if(i >= _this.songs.length){  //最后一首歌曲
          i = _this.songs.length;
        }
        
        _this.musicControll.songID = _this.songs[i].song_id; //修改歌曲id

        _this._initLyrics();
        _this._doPlaying();

      }

      //list点击播放
      this.musicControll.doPlayMusic = function(id){
        if (_this._playingLine.timer) {
          // alert("oncanplay qiehuan之后 关")
          clearInterval(_this._playingLine.timer)
        }
        if (_this._bufferline.timer) {    //如果在加载 则关闭
          // alert("oncanplay qiehuan之后 关")
          clearInterval(_this._bufferline.timer)
        }
        _this.musicControll.songID = id;
        
        _this.musicControll.bufferLine = 0;   //切换歌曲后设置加载线为0
        _this.musicControll.playingLine = 0;

        var audio = _this.musicControll.audio;
        //
        if (!audio) {
          audio.pause();    //关闭播放
        }
        _this.musicControll.isPlaying = true;
        _this._initLyrics();
        _this._doPlaying();
      }

      //静音
      this.musicControll.audioMuted = function(bl) {
        _this.musicControll.audio.muted = bl
      } 

      //拖拉时间线
      this.musicControll.setCurrentTime = function(time) {
        _this.musicControll.audio.currentTime = time;
        // alert("关")
        // _this.musicControll.isPlaying = false;
        clearInterval(_this._playingLine.timer)
      }

      //循环播放
      this.musicControll.loopPlay = function() {
        _this.isLoop = !_this.isLoop;
        _this.musicControll.audio.loop = _this.isLoop
      }
    },
    _doPlaying() {
      var _this = this;
      var audio = this.musicControll.audio;

      audio.load();     //重新加载
      _this._bufferline(audio)          //获取缓冲线
      audio.oncanplay = function() {
        if (_this.musicControll.isPlaying) {
          audio.play();
          _this.getPlayingLine();         //获取播放时间线
          // _this.musicControll.isPlaying = true
        }

      }
    },
    defaultSong() {
      for(let i=0; i<this.songs.length; i++){
        if (this.songs[i].song_id == this.musicControll.songID) {
          this.songIndex = i;
          // console.log(this.songIndex)
          return this.songs[i];
        }
      }

    },
    _playingLine() {    //  定时器获取播放时间
      var _this = this;
      var audio = _this.musicControll.audio;
      var allTime = audio.duration;
      var err = audio.readyState;

      // console.log("_playingLine 定时开始")
      if (err == 4) {
        _this._playingLine.timer = setInterval(function(){
          var nowTime = audio.currentTime;
          var playingLine = parseInt((nowTime/allTime)*1000)/10;
          _this.musicControll.playingLine = playingLine;
          // console.log(playingLine)
        },100);
      }
    },
    getPlayingLine() {
      // console.log("getPlayingLine 开关定时")
      if (!this.musicControll.isPlaying) {
        // alert("关")
        clearInterval(this._playingLine.timer)
      }else{
        // alert("开")
        this._playingLine()
      }
    },
    _bufferline(audio) {
      var _this = this;
      // alert("加载开始")
      _this._bufferline.timer = setInterval(function(){
        // console.log(audio.buffered)
        if (_this.musicControll.bufferLine < 100 && audio.buffered.length != 0) {
          // alert("加载中")
          var bufferLine = parseInt((audio.buffered.end(0)/audio.duration)*1000)/10;
          _this.musicControll.bufferLine = bufferLine;
          // console.log(_this.musicControll.bufferLine);
        }else{
          clearInterval(_this._bufferline.timer);
          // alert('加载完')
        }
      },1000)
    },
    _audioPush() {
      var audio = this.musicControll.audio;
      var err = audio.readyState;
      // alert("暂停 播放")
      // console.log(err)
      if(err == 4){
        if (audio.paused) {
          audio.play();
          this.musicControll.isPlaying = true
        }else{
          audio.pause();
          this.musicControll.isPlaying = false
        }
      }else{
        this.musicControll.isPlaying = false;
        alert('loading error!')
      }
      this.getPlayingLine();
    },
    _initLyrics() {
      var _this = this;
      _this.musicControll.lrcArr = [];
      var lrcArr1 = this.defaultSong().lyrics.split('[')
      lrcArr1.splice(0,1);
      lrcArr1.forEach((val,index) => {
        
        var arr = val.split("]")
        var time = arr[0].split(":");
        // console.log(val)
        _this.musicControll.lrcArr.push({
          time:(time[0]*60-0)+(time[1]-0),
          text:arr[1]
        })
      })
      // console.log(_this.musicControll.lrcArr);
    }
  }
}



</script>

<style>
@import "./assets/css/index.css"
</style>
