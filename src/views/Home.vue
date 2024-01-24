<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>AMATEMBARUBINGO</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-no-padding">
        <swiper id="swiper"
          @slideChangeTransitionEnd="e => changeSegment(e)"
          ref="slides">
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
          <swiper-slide>
            <Page10/>
          </swiper-slide>
          <swiper-slide>
            <Page11/>
          </swiper-slide>
          <swiper-slide>
            <Page12/>
          </swiper-slide>
        </swiper>
      </ion-content>
      <ion-footer>
        <ion-segment scrollable="true" :value="current_segment"
          @ionChange="e => changePage(e)">
          <ion-segment-button :value="0">
            <div class="img"><img src="vane.png" alt=""></div>
            <ion-label>Reseau</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="1">
            <div class="img"><img src="ibombo.png" alt=""></div>
            <ion-label>amabombo</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="2" title="Branchement privé">
            <div class="img"><img src="bp.png" alt=""></div>
            <ion-label>B. Privé</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="3">
            <div class="img"><img src="captage.png" alt=""></div>
            <ion-label>captages</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="4">
            <div class="img"><img src="pompe.png" alt=""></div>
            <ion-label>pompes</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="5">
            <div class="img"><img src="puit.png" alt=""></div>
            <ion-label>puits</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="6">
            <div class="img"><img src="forage.png" alt=""></div>
            <ion-label>forages</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="7">
            <div class="img"><img src="reservoir.png" alt=""></div>
            <ion-label>reservoirs</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="8">
            <div class="img"><img src="rusengo.png"></div>
            <ion-label>Rusengo</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="9">
            <div class="img"><img src="sna.png" title="sources non amenagées"></div>
            <ion-label>S. Non Amenag.</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="10" title="villages Moderne">
            <div class="img"><img src="moderne.png"></div>
            <ion-label>villages M</ion-label>
          </ion-segment-button>
          <ion-segment-button :value="11" title="Village collinaire">
            <div class="img"><img src="collinaire.png"></div>
            <ion-label>villages C</ion-label>
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
  import Page10 from "./home_pages/Page10"
  import Page11 from "./home_pages/Page11"
  import Page12 from "./home_pages/Page12"
  
  export default {
    components: {
      Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9, Page10, Page11, Page12
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
ion-segment-button{
  display: flex;
  flex-direction: column;
}
ion-segment-button ion-label{
  margin: 5px auto;  
}
ion-segment-button .img{
  margin-top: 5px;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
}
.img img{
  height: 30px;
}
</style>