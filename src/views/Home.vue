<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Swipin Test</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-no-padding">
        <swiper id="swiper"
          @slideChangeTransitionEnd="e => changeSegment(e)"
          pager="false" ref="slides">
          <swiper-slide>
            <Page1/>
          </swiper-slide>
          <swiper-slide>
            <Page2/>
          </swiper-slide>
          <swiper-slide>
            <Page3/>
          </swiper-slide>
          <swiper-slide>
            <Page4/>
          </swiper-slide>
          <swiper-slide>
            <Page5/>
          </swiper-slide>
          <swiper-slide>
            <Page6/>
          </swiper-slide>
          <swiper-slide>
            <Page7/>
          </swiper-slide>
          <swiper-slide>
            <Page8/>
          </swiper-slide>
          <swiper-slide>
            <Page9/>
          </swiper-slide>
        </swiper>
      </ion-content>
      <ion-footer>
        <ion-segment :value="current_segment" @ionChange="e => changePage(e)">
          <ion-segment-button :value="0">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 1</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="1">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 2</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="2">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 3</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="3">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 4</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="4">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 5</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="5">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 6</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="6">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 7</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="7">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 8</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="8">
            <ion-icon :icon="getIcon('homeOutline')"></ion-icon>
            <ion-label>Page 9</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-footer>
    </ion-page>
  </template>
  
  <script>
  import Page1 from "./home_pages/Page1"
  import Page2 from "./home_pages/Page2"
  import Page3 from "./home_pages/Page3"
  import Page4 from "./home_pages/Page4"
  import Page5 from "./home_pages/Page5"
  import Page6 from "./home_pages/Page6"
  import Page7 from "./home_pages/Page7"
  import Page8 from "./home_pages/Page8"
  import Page9 from "./home_pages/Page9"
  
  export default {
    components: {
      Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9
    },
    data(){
      return {
        current_segment:0,
      }
    },
    watch:{
    },
    methods:{
      changePage(event){
        console.log(this.$refs.slides)
        console.log(event.detail.value)
        // this.$refs.slides.slideTo(event.detail.value)
      },
      changeSegment(event){
        this.current_segment = event.activeIndex
      }
    },
    mounted(){
    }
  }
  </script>
  <style scoped>
  #swiper{
    height: 100%;
}
  </style>