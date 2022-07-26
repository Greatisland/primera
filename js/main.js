function sideTitle() {
  let sideTitles = document.querySelectorAll(".side_title")
  sideTitles.forEach((sideTitle) => {
    let move = sideTitle.offsetWidth / 2
    let sideTitleLeftStyle = window
      .getComputedStyle(sideTitle)
      .getPropertyValue("left")
    sideTitleLeftStyle == "0px"
      ? sideTitle.style.setProperty("--side_left", `-${move + 13}px`)
      : sideTitle.style.setProperty("--side_right", `-${move + 13}px`)
  })
}
sideTitle()
//side_title 위치조정

function headerFixed() {
  let header = document.querySelector(".header")
  document.addEventListener("scroll", () => {
    window.scrollY > 800
      ? header.classList.add("on")
      : header.classList.remove("on")
  })
}
headerFixed()
//header

function slideDown(ele) {
  ele.style.height = `${ele.scrollHeight}px`
}

let searchState = false
function searchbar() {
  let searchIcon = document.querySelector(".search_icon"),
    exitBtn = document.querySelector(".exit_box"),
    searchForm = document.querySelector(".search_area")

  searchIcon.addEventListener("click", () => {
    searchForm.classList.add("on")
    searchState = true
  })
  exitBtn.addEventListener("click", () => {
    searchForm.classList.remove("on")
    searchState = false
  })
}
searchbar()
//searchbar

let menu = document.querySelector(".menu"),
  menuList = document.querySelectorAll(".menu_list")
menuList.forEach((ele, i) => {
  let thisList = menuList[i].querySelector(".slide_wrap")
  menuList[i].addEventListener("mouseover", (e) => {
    if (searchState) {
      e.preventDefault
      return
    } //검색창 on일경우 gnb메뉴 정지
    thisList.style.display = "block"
    slideDown(thisList)
  })
  menuList[i].addEventListener("mouseout", () => {
    thisList.style.display = "none"
    thisList.style.height = "0"
  })
})
//gnb slide menu

let typingText = [
  "알고 보면 섬세한 케어가 필요한",
  "프리메라 필수 스킨케어 루틴 제품과",
  "아쿠아 쉴드 파워 모이스처라이징 젤",
  "100시간 보습으로 피부 장벽 강화",
  "속부터 차오르는 차원이 다른 보습력",
  "지치고 붉은 피부를 15초 만에 급속 진정",
]
let typingTextBot = [
  "남성 피부를 위한 심플 스텝 솔루션",
  "헬리녹스 스폐셜 패키지가 만난 리미티드 세트",
  "여름 스킨 케어 이거 하나로 끝! 100시간 보습 캡슐 젤 크림",
  "",
  "워터리 크림 미스트",
  "",
]
let topNum = 0
let botNum = 0
let textState = false //false일때 typing_top 작성 중, true일때 typing_bottom 작성 중
const mainSlide = new Swiper(".main_visual", {
  loop: true,
  autoplay: {
    delay: 8000,
  },
  pagination: {
    type: "progressbar",
    el: ".progress_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".right_arrow",
    prevEl: ".left_arrow",
  },
  on: {
    activeIndexChange: function () {
      document.querySelectorAll(".swiper-slide").forEach((ele) => {
        ele.classList.remove("on")
      })
      document
        .querySelectorAll(".swiper-slide")
        [this.activeIndex].classList.add("on")
      let textTop = document.querySelectorAll(".typing_top")
      let textBot = document.querySelectorAll(".typing_bot") //요소가 위로 슬라이드 하는 애니메이션
      const typingMove = setInterval(() => {
        if (!textState) {
          textBot[this.activeIndex].classList.remove("on")
          textTop[this.activeIndex].classList.add("on")
        } else if (textState) {
          textBot[this.activeIndex].classList.add("on")
          textTop[this.activeIndex].classList.remove("on") //텍스트 커서 이동
        }
        if (topNum < typingText[this.realIndex].length) {
          textState = false
          textTop[this.activeIndex].innerHTML +=
            typingText[this.realIndex].charAt(topNum)
          topNum++ //typing_top 작성
        } else {
          if (botNum < typingTextBot[this.realIndex].length) {
            textState = true
            textBot[this.activeIndex].innerHTML +=
              typingTextBot[this.realIndex].charAt(botNum)
            botNum++ //typing_bot 작성
          } else {
            clearInterval(typingMove) //작성 완료 후 종료
          }
        }
      }, 80)
      topNum = 0
      botNum = 0
      document
        .querySelectorAll(".typing")
        .forEach((ele) => (ele.innerHTML = "")) //슬라이드 전환될 때 초기화
    },
  },
})
// swiper main slider

let textList = document.querySelector(".text_list")
let animImgs = document.querySelectorAll(".anim_imgs")
function isYou() {
  let list = document.querySelectorAll(".is_you .list")
  textList.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.classList.contains("txt_list01")) {
        if (e.target.classList.contains("on")) return
        animImgs.forEach((element) => {
          element.classList.remove("on")
        })
        list.forEach((element) => {
          element.classList.remove("on")
        })
        animImgs[0].classList.add("on")
        list[0].classList.add("on")
      } else if (e.target.classList.contains("txt_list02")) {
        if (e.target.classList.contains("on")) return
        animImgs.forEach((element) => {
          element.classList.remove("on")
        })
        list.forEach((element) => {
          element.classList.remove("on")
        })
        animImgs[1].classList.add("on")
        list[1].classList.add("on")
      } else if (e.target.classList.contains("txt_list03")) {
        if (e.target.classList.contains("on")) return
        animImgs.forEach((element) => {
          element.classList.remove("on")
        })
        list.forEach((element) => {
          element.classList.remove("on")
        })
        animImgs[2].classList.add("on")
        list[2].classList.add("on")
      }
    },
    isYouMove()
  )
}
isYou()

function isYouMove() {
  textList.addEventListener("mousemove", (e) => {
    animImgs.forEach((element) => {
      element.style.transform =
        "translate(" +
        (e.offsetX / e.target.getBoundingClientRect().width) * 50 +
        "px," +
        (e.offsetY / e.target.getBoundingClientRect().height) * 50 +
        "px)"
    })
  })
}
//is_you section tab 구현

let tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
let firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
let backImg = document.querySelector(".back_img") //재생 종료 시 백그라운드 화면으로 유튜브를 덮음
let player
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "emfjaPuNMOc",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerReady(event) {
  event.target.playVideo()
  event.target.mute()
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PAUSED) {
    backImg.classList.remove("on")
  }
}

function youtubePlay() {
  let playBtn = document.querySelector(".button_wrap")
  playBtn.addEventListener("click", () => {
    player.playVideo()
    backImg.classList.add("on")
  })
}
youtubePlay()
// youtube section 구현

function IsScrollMove() {
  let scrollEles = document.querySelectorAll(".is_you .scrollEle")
  scrollEles.forEach((scrollEle, index) => {
    gsap.to(scrollEle, 1, {
      delay: index * 0.8,
      opacity: 1,
      y: 0,
    })
  })
}

function ProdScrollMove() {
  let scrollEles = document.querySelectorAll(".product .scrollEle")
  scrollEles.forEach((scrollEle, index) => {
    gsap.to(scrollEle, 1, {
      delay: index * 0.2,
      opacity: 1,
      y: 0,
    })
  })
}

function SupScrollMove() {
  let subScrEles = document.querySelectorAll(".sub_scr_ele")
  subScrEles.forEach((subScrEle, index) => {
    gsap.to(subScrEle, 1, {
      delay: index * 0.2,
      opacity: 1,
      y: 0,
    })
  })
}

new ScrollMagic.Scene({
  triggerElement: ".intro",
  triggerHook: 0.6,
})
  .setClassToggle(".intro", "on")
  .addTo(new ScrollMagic.Controller())
// intro scroll animation

new ScrollMagic.Scene({
  triggerElement: ".is_you",
  triggerHook: 0.9,
})
  .setTween(IsScrollMove)
  .addTo(new ScrollMagic.Controller())
// isYou scroll animation

new ScrollMagic.Scene({
  triggerElement: ".product",
  triggerHook: 0.6,
})
  .setTween(ProdScrollMove)
  .addTo(new ScrollMagic.Controller())
// product scroll animation

new ScrollMagic.Scene({
  triggerElement: ".supporters",
  triggerHook: 0.6,
})
  .setTween(SupScrollMove)
  .addTo(new ScrollMagic.Controller())
// supporters scroll animation

let topNavi = document.querySelector(".top_navi")
topNavi.addEventListener("click", () => {
  gsap.to(window, 0.5, {
    scrollTo: 0,
  })
})

document.addEventListener("scroll", () => {
  currentScroll = window.scrollY
  currentScroll > 500 ? topNaviOn() : topNaviOff()
})

function topNaviOn() {
  gsap.to(topNavi, 0.6, {
    opacity: 1,
    display: "block",
  })
}

function topNaviOff() {
  gsap.to(topNavi, 0.6, {
    opacity: 0,
    display: "none",
  })
}
// top_navi
