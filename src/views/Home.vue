<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>AMATEMBARUBINGO</ion-title>
        <ion-buttons slot="primary">
          <ion-button id="menu-toggler">
            <ion-icon slot="icon-only"
              :ios="getIcon('ellipsisHorizontal')"
              :md="getIcon('ellipsisVertical')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-popover trigger="menu-toggler" dismiss-on-select="true" show-backdrop="false">
        <ion-content>
          <ion-list lines="none">
            <ion-item button routerLink="/profile">
              <ion-label>Rechercher</ion-label>
              <ion-icon :src="getIcon('search')"/>
            </ion-item>
            <ion-item button @click="demanderAide">
              <ion-label>Signaler un problème</ion-label>
              <ion-icon :src="getIcon('logoWhatsapp')"/>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>
    </ion-header>
    <ion-content class="ion-no-padding">
      <keep-alive>
        <ion-router-outlet />
      </keep-alive>
    </ion-content>
    <ion-footer>
      <ion-segment scrollable="true" :value="$route.name">
        <ion-segment-button routerLink="/" value="reseau">
          <div class="img"><img src="vane.png" alt=""></div>
          <ion-label>Reseau</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/ibombo" value="ibombo">
          <div class="img"><img src="ibombo.png" alt=""></div>
          <ion-label>amabombo</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/bp" value="bp" title="Branchement privé">
          <div class="img"><img src="bp.png" alt=""></div>
          <ion-label>B. Privé</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/captage" value="captage">
          <div class="img"><img src="captage.png" alt=""></div>
          <ion-label>captages</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/pompe" value="pompe">
          <div class="img"><img src="pompe.png" alt=""></div>
          <ion-label>pompes</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/puit" value="puit">
          <div class="img"><img src="puit.png" alt=""></div>
          <ion-label>puits</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/forage" value="forage">
          <div class="img"><img src="forage.png" alt=""></div>
          <ion-label>forages</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/reservoir" value="reservoir">
          <div class="img"><img src="reservoir.png" alt=""></div>
          <ion-label>reservoirs</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/rusengo" value="rusengo">
          <div class="img"><img src="rusengo.png"></div>
          <ion-label>Rusengo</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/sna" value="sna">
          <div class="img"><img src="sna.png" title="sources non amenagées"></div>
          <ion-label>S. Non Amenag.</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/moderne" value="moderne" title="villages Moderne">
          <div class="img"><img src="moderne.png"></div>
          <ion-label>villages M</ion-label>
        </ion-segment-button>
        <ion-segment-button routerLink="/collinaire" value="collinaire" title="Village collinaire">
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