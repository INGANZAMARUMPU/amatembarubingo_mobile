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
      <div id="map">
        <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
          <l-marker :lat-lng="[-3.42966400, 29.92979000]"> </l-marker>
        </l-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data() {
    return {
      map: null,
      bp: L.icon({iconUrl: "bp.png", iconAnchor:[20, 26]}),
      captage: L.icon({iconUrl: "captage.png", iconAnchor:[20, 27]}),
      forage: L.icon({iconUrl: "forage.png", iconAnchor:[20, 13]}),
      ibombo: L.icon({iconUrl: "ibombo.png", iconAnchor:[18, 27]}),
      pompe: L.icon({iconUrl: "pompe.png", iconAnchor:[18, 35]}),
      puit: L.icon({iconUrl: "puit.png", iconAnchor:[19, 20]}),
      reservoir: L.icon({iconUrl: "reservoir.png", iconAnchor:[20, 30]}),
      robinnet: L.icon({iconUrl: "robinnet.png", iconAnchor:[20, 26]}),
      rusengo: L.icon({iconUrl: "rusengo.png", iconAnchor:[20, 12]}),
      sna: L.icon({iconUrl: "sna.png", iconAnchor:[20, 26]}),
      vane: L.icon({iconUrl: "vane.png", iconAnchor:[20, 26]}),
    };
  },
  methods:{
    demanderAide(){
      let text = `Hari akabazo mfise ku bijaniranye n'iyi application Amatembarubingo:\n`
      let url =  `https://wa.me/25761069606?text=${text}`
      window.open(url, '_system');
    },
    mapClicked(event){
      let icons = [
        this.bp, this.captage, this.forage, this.ibombo, this.pompe, this.puit,
        this.reservoir, this.robinnet, this.rusengo, this.sna, this.vane
      ]
      let position = parseInt(Math.random() * icons.length)
      L.marker(event.latlng, { icon: icons[position] }).addTo(this.map)
    }
  },
  mounted(){
    let vue = this
    window.setTimeout(() => {
      vue.map = L.map("map").setView([-3.42966400, 29.92979000], 9);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(vue.map);
      vue.map.on("click", vue.mapClicked, vue)
    }, 10)
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }
}
</script>
<style>
#map{
  width: 100%;
  height: 100%;
}
</style>
