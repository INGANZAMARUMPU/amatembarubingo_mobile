<template>
  <ion-app>
    <ion-router-outlet/>
  </ion-app>
</template>

<style>
</style>
<script>
export default {
  methods:{
  },
  mounted(){
    window.reseaudalimentations = []
    window.amabombo = []
    window.branchementprives = []
    window.captages = []
    window.pompes = []
    window.puits = []
    window.forages = []
    window.reservoirs = []
    window.sourceamenagees = []
    window.sourcenonamenagees = []
    window.villagemodernes = []
    window.villagecollinaires = []

    let openRequest = indexedDB.open("AMATEMBARUBINGO_DB", 1);
    openRequest.onupgradeneeded = function() {
      let db = openRequest.result;
      db.createObjectStore('reseaudalimentations', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('sourcenonamenagees', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('branchementprives', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('sourceamenagees', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('villagecollinaires', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('villagemodernes', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('reservoirs', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('captages', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('amabombo', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('forages', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('puits', { keyPath: 'II_5_coordonnees', autoIncrement:false });
      db.createObjectStore('pompes', { keyPath: 'II_5_coordonnees', autoIncrement:false });
    };
    openRequest.onerror = () => {
      console.error("Error", openRequest.error);
    };
    openRequest.onsuccess = async () => {
      this.$store.state.DB = openRequest.result;
      this.loadData()
    };
  },
}
</script>