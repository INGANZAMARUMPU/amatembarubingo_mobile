<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>INEA 2022</ion-title>
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
      <div class="progression" v-if="is_fetching">
        <h3>Gukwega ibiharuro</h3>
        <div v-for="pair in Object.entries($store.state.fetch_progress)" class="pair">
          <div>{{ pair[1].name }}</div>
          <div>{{ pair[1].level }}/{{ pair[1].max }}</div>
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
          is_fetching: false
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
            window[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item)
            )
          }
          callback()
        })
      } else {
        this.insertAll(name, array, (results) => {
          window[name] = []
          for (const item of results) {
            window[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item)
            )
          }
          callback()
        })
      }
    },
    displayMarkers(){
        this.makeToast("Projection en cours", "", 1000*10)
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
                                console.log("BOOOM")
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
      this.downloadMarkers(() => {
        this.displayMarkers()
      })
    }
  },
  mounted(){
    window.setTimeout(() => {
      this.loadMap()
      this.displayMarkers()
    }, 10)
  },
}
</script>
<style>
#map{
  width: 100%;
  height: 100%;
}
.progression{
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
