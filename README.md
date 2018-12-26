# music-player

> A Vue.js project

## 项目地址

[music-app](http://zhongwood.likesyou.org/music-app/)

# my-reader

> A Vue.js project

## 笔记

### 1.限制屏幕缩放

```HTML
<meta name="viewport" content="width=device-width,initial-scale=1.0.maxmum-scale=1.0,minmum-scale=1.0,user-scalable=no">
```

### 2.初始化字体大小

```javascript
document.addEventListener('DOMContentLoaded',() => {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px"
})
```
