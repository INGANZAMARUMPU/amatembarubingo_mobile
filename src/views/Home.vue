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
      <ion-router-outlet/>
    </ion-content>
    <ion-footer>
      <ion-segment scrollable="true">
        <ion-segment-button routerLink="/reseau">
          <div class="img"><img src="vane.png" alt=""></div>
          <ion-label>Reseau</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/ibombo">
          <div class="img"><img src="ibombo.png" alt=""></div>
          <ion-label>amabombo</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/bp" title="Branchement privé">
          <div class="img"><img src="bp.png" alt=""></div>
          <ion-label>B. Privé</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/captage">
          <div class="img"><img src="captage.png" alt=""></div>
          <ion-label>captages</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/pompe">
          <div class="img"><img src="pompe.png" alt=""></div>
          <ion-label>pompes</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/puit">
          <div class="img"><img src="puit.png" alt=""></div>
          <ion-label>puits</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/forage">
          <div class="img"><img src="forage.png" alt=""></div>
          <ion-label>forages</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/reservoir">
          <div class="img"><img src="reservoir.png" alt=""></div>
          <ion-label>reservoirs</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/rusengo">
          <div class="img"><img src="rusengo.png"></div>
          <ion-label>Rusengo</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/sna">
          <div class="img"><img src="sna.png" title="sources non amenagées"></div>
          <ion-label>S. Non Amenag.</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/moderne" title="villages Moderne">
          <div class="img"><img src="moderne.png"></div>
          <ion-label>villages M</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/collinaire" title="Village collinaire">
          <div class="img"><img src="collinaire.png"></div>
          <ion-label>villages C</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-footer>
  </ion-page>
</template>
  
<script>
export default {
  data(){
    return {
      current_segment:0,
    }
  },
  methods:{
    changePage(event){
      console.log(event.target.value)
      this.$router.push(event.target.value)
    },
  },
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