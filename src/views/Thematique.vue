<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button @click="$router.back()"></ion-back-button>
        </ion-buttons>
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
              <ion-label>Cartes thematiques</ion-label>
              <ion-icon :src="getIcon('mapOutline')"/>
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