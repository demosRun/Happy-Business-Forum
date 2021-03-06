// 设计宽度
var deviseW = 750
// 设计高度
var deviseH = 1508

var hideHeight = 0

function getScale () {
  // 如果比例大于1则进入电脑模式
  if ((window.innerWidth / window.innerHeight) < 1) {
    var scale = window.innerWidth / deviseW
    document.body.style.width = deviseW + 'px'
    document.body.style.height = deviseH + 'px'
    document.body.style.transform = `scale(${scale}, ${scale})`
    // console.log(window.innerHeight, deviseH * scale)
    hideHeight = window.innerHeight - deviseH * scale
    document.body.style.transformOrigin = `0 ${hideHeight + 'px' } 0`
  } else {
    var scale = (window.innerHeight / deviseH).toFixed(2)
    document.body.style.width = deviseW + 'px'
    document.body.style.height = deviseH + 'px'
    document.body.style.transform = `scale(${scale}, ${scale}) translate(${(window.innerWidth - deviseW * scale) / 2 / scale + 'px' }, 0)`
    document.body.style.transformOrigin = '0 0 0'
  }
  setTimeout(() => {
    document.getElementsByTagName('html')[0].style.height = document.body.offsetHeight * scale + 'px'
  }, 0)
}

getScale()

let timer = null
window.onresize = () => {
  // console.log(timer)
  window.clearTimeout(timer)
  timer = setTimeout(() => {
    getScale()
  }, 1000)
}

function scrollIntoView () {
  // alert('滚动')
  window.scrollTo(0, 0)
  setTimeout(() => {
    getScale()
  }, 500)
}

// 阻止微信拖动
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false})

// 微信加载完毕自动播放音乐
var bgMusic = null
document.addEventListener("WeixinJSBridgeReady", function () {
  if (bgMusic === null) {
    bgMusic = new Audio("./static/resource/bg.mp3")
    bgMusic.loop = true
    bgMusic.play()
  }
}, false)