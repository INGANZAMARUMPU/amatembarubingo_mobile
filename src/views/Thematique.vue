<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button @click="$router.back()"></ion-back-button>
        </ion-buttons>
        <ion-title>INEA 2022</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-no-padding">
      <div v-if="!theme" class="chooser">
        <div>Choisissez un theme pour voir la carte</div>
        <ion-button>Choisir le thème</ion-button>
      </div>
      <div v-else>

      </div>
    </ion-content>
  </ion-page>
</template>
  
<script>
export default {
  data(){
    return {
      theme: null,
      themes: []
    }
  },
  methods:{
    fetchThemes(){

    }
  },
  mounted(){
    this.fetchThemes()
  }
}
</script>
<style scoped>
.chooser{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #555;
}
</style>