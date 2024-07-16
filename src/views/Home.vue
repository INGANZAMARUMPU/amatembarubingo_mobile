<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>INEA 2024</ion-title>
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
            <ion-item button @click="downloadData">
              <ion-label>Mettre à jours les données</ion-label>
              <ion-icon :src="getIcon('downloadOutline')"/>
            </ion-item>
            <ion-item button routerLink="/thematique">
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
      <div id="map"></div>
      <div class="dialog" v-if="is_fetching">
        <h3>Gukwega ibiharuro</h3>
        <div v-for="pair in Object.entries($store.state.fetch_progress)" class="pair">
          <div>{{ pair[1].name }}</div>
          <div>{{ (((pair[1].level / pair[1].max) || 0) * 100).toFixed(1) }}/100</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../MarkerCluster.css"
import "../MarkerCluster.Default.css"
import "../leaflet.markercluster-src"
import "../leaflet.markercluster"
import "../leaflet.markercluster.layersupport"
import "../leaflet.featuregroup.subgroup"

export default {
  data() {
      return {
          overlay: null,
          is_fetching: false,
          failed: 0
      };
  },
  watch:{},
  methods:{
      loadMap(){
        try {
          window.map = L.map("map").setView([-3.42966400, 29.92979000], 9);
          let osm_layer = L.tileLayer(
              "http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                  attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              }
          )
          this.tileLayer = {
              "Open Street Map": osm_layer,
              // "Google Maps": gmap_layer,
          }
          osm_layer.addTo(window.map)
      } catch (error) {
        console.error(error)
      }
    },
    changeInMarkers(name, array, callback){
      this.makeToast(`Projection ${name}...`)
      if(array.length == 0){
        this.selectAll(name, (results) => {
          window[name] = []
          for (const item of results) {
            let lat_long = item.II_5_coordonnees.split(" ")
            if(!lat_long[1]) continue
            window[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item, lat_long)
            )
          }
          callback()
        })
      } else {
        this.insertAll(name, array, (results) => {
          window[name] = []
          for (const item of results) {
            let lat_long = item.II_5_coordonnees.split(" ")
            if(!lat_long[1]) continue
            window[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item, lat_long)
            )
          }
          callback()
        })
      }
    },
    displayMarkers(){
      if(window.reseaudalimentations.length == 0){
          this.makeToast("Pas de données à projecter. Veuillez les télécharger", "", 1000*5)
          return
      }
      // if(this.failed < 5){
      //   if(window.reseaudalimentations.length == 0){
      //     this.failed += 1
      //     window.setTimeout(() => {
      //       this.makeToast("collecte de données en cours...", "", 1000*2)
      //       this.displayMarkers()
      //     }, 5000)
      //     return
      //   }
      // } else {
      //   if(window.reseaudalimentations.length == 0){
      //     this.failed = 0
      //     this.makeToast("Pas de données à projecter. Veuillez les télécharger", "", 1000*5)
      //     this.is_fetching = false
      //     return
      //   }
      // }
      this.makeToast("Projection en cours", "", 1000*2)
      let map = window.map
      let markers = L.markerClusterGroup().addTo(map)
      this.changeInMarkers("reseaudalimentations", window.reseaudalimentations, () => {
        this.changeInMarkers("sourcenonamenagees", window.sourcenonamenagees, () => {
          this.changeInMarkers("villagecollinaires", window.villagecollinaires, () => {
            this.changeInMarkers("branchementprives", window.branchementprives, () => {
              this.changeInMarkers("sourceamenagees", window.sourceamenagees, () => {
                this.changeInMarkers("villagemodernes", window.villagemodernes, () => {
                  this.changeInMarkers("reservoirs", window.reservoirs, () => {
                    this.changeInMarkers("amabombo", window.amabombo, () => {
                      this.changeInMarkers("captages", window.captages, () => {
                        this.changeInMarkers("forages", window.forages, () => {
                          this.changeInMarkers("pompes", window.pompes, () => {
                            this.changeInMarkers("puits", window.puits, () => {
                              let overlay = {
                                "reseaudalimentations" : L.featureGroup.subGroup(markers, window.reseaudalimentations).addTo(map),
                                "amabombo" : L.featureGroup.subGroup(markers, window.amabombo).addTo(map),
                                "branchementprives" : L.featureGroup.subGroup(markers, window.branchementprives).addTo(map),
                                "captages" : L.featureGroup.subGroup(markers, window.captages).addTo(map),
                                "pompes" : L.featureGroup.subGroup(markers, window.pompes).addTo(map),
                                "puits" : L.featureGroup.subGroup(markers, window.puits).addTo(map),
                                "forages" : L.featureGroup.subGroup(markers, window.forages).addTo(map),
                                "reservoirs" : L.featureGroup.subGroup(markers, window.reservoirs).addTo(map),
                                "sourceamenagees" : L.featureGroup.subGroup(markers, window.sourceamenagees).addTo(map),
                                "sourcenonamenagees" : L.featureGroup.subGroup(markers, window.sourcenonamenagees).addTo(map),
                                "villagemodernes" : L.featureGroup.subGroup(markers, window.villagemodernes).addTo(map),
                                "villagecollinaires" : L.featureGroup.subGroup(markers, window.villagecollinaires).addTo(map),
                              }
                              let control = L.control.layers(null, overlay, {collapsed: true });
                              control.addTo(map);
                              this.is_fetching = false
                              // window.map.addLayer(markers)
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    },
    downloadData(){
      this.is_fetching = true
      this.downloadMarkers(this.displayMarkers)
    },
    demanderAide(){
      let text = `Amahoro,\n nari mfise akabazo muri iyi application ya INEA 2024\n`
      let url =  `https://wa.me/25761069606?text=${text}`
      window.open(url, '_system');
    }
  },
  mounted(){
    window.setTimeout(() => {
      this.loadMap()
      window.displayMarkers = this.displayMarkers
      this.loadData()
    }, 10)
  },
}
</script>
<style>
#map{
  width: 100%;
  height: 100%;
}
.dialog{
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 360px;
  background-color: #eee;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px #555;
  padding: 0 20px 20px 20px;
  border-radius: 5px;
}
.pair{
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.leaflet-tooltip{
  width: 300px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  text-wrap: wrap;
  overflow-wrap: break-word;
}
</style>
