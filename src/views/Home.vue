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
      // loadMarkers(layer, url, icon){
      //   axios.get(this.url+`/${url}/`).then(res => {
      //       for(let item of res.data.results){
      //           let lat_long = item.II_5_coordonnees.split(" ")
      //           let title = "<table>"
      //           for(let key of Object.keys(item)){
      //               let value = item[key] || "-"
      //               key = key.split("_").splice(2).join(" ") || key
      //               title += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`
      //           }
      //           title += "</table>"
      //           // let marker = L.marker(
      //           //     [lat_long[0], lat_long[1]],
      //           //     { icon: icon }
      //           // ).bindTooltip(title,{
      //               //     direction: 'top'
      //               // })//.on("click", () => this.displayDetails(item))
      //           let marker = L.circleMarker(
      //               [lat_long[0], lat_long[1]],
      //               { radius: 5 }
      //           ).bindTooltip(title,{
      //               direction: 'top'
      //           })//.on("click", () => this.displayDetails(item))
      //           layer.addLayer(marker)
      //       }
      //   }).catch(err => {
      //       this.$store.state.label = ""
      //       console.error(err);
      //   })
      // },
      loadMap(){
        try {
          this.$store.state.map = L.map("map").setView([-3.42966400, 29.92979000], 9);
          let osm_layer = L.tileLayer(
              "http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                  attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              }
          )
          this.tileLayer = {
              "Open Street Map": osm_layer,
              // "Google Maps": gmap_layer,
          }
          osm_layer.addTo(this.$store.state.map)
      } catch (error) {
        console.error(error)
      }
    },
    changeInMarkers(name, array, callback){
      if(array.length == 0){
        this.selectAll(name, (results) => {
          this.$store.state[name] = []
          for (const item of results) {
            this.$store.state[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item)
            )
          }
          callback()
        })
      } else {
        this.insertAll(name, array, (results) => {
          this.$store.state[name] = []
          for (const item of results) {
            this.$store.state[name].push(
              this.generateGeoMarker(this.$store.state.fetch_progress[name]["name"], item)
            )
          }
          callback()
        })
      }
    }
  },
  mounted(){
    window.setTimeout(() => this.loadMap(), 10)
    this.is_fetching = true
    this.downloadMarkers(() => {
      this.makeToast("Projection en cours", "", 1000*10)
      let map = this.$store.state.map
      let markers = L.markerClusterGroup().addTo(map)

      this.changeInMarkers("reseaudalimentations", this.$store.state.reseaudalimentations, () => {
        this.changeInMarkers("sourcenonamenagees", this.$store.state.sourcenonamenagees, () => {
          this.changeInMarkers("villagecollinaires", this.$store.state.villagecollinaires, () => {
            this.changeInMarkers("branchementprives", this.$store.state.branchementprives, () => {
              this.changeInMarkers("sourceamenagees", this.$store.state.sourceamenagees, () => {
                this.changeInMarkers("villagemodernes", this.$store.state.villagemodernes, () => {
                  this.changeInMarkers("reservoirs", this.$store.state.reservoirs, () => {
                    this.changeInMarkers("amabombo", this.$store.state.amabombo, () => {
                      this.changeInMarkers("captages", this.$store.state.captages, () => {
                        this.changeInMarkers("forages", this.$store.state.forages, () => {
                          this.changeInMarkers("pompes", this.$store.state.pompes, () => {
                            this.changeInMarkers("puits", this.$store.state.puits, () => {
                              console.log(this.$store.state.reseaudalimentations)
                              let overlay = {
                                "reseaudalimentations" : L.featureGroup.subGroup(markers, this.$store.state.reseaudalimentations).addTo(map),
                                "amabombo" : L.featureGroup.subGroup(markers, this.$store.state.amabombo).addTo(map),
                                "branchementprives" : L.featureGroup.subGroup(markers, this.$store.state.branchementprives).addTo(map),
                                "captages" : L.featureGroup.subGroup(markers, this.$store.state.captages).addTo(map),
                                "pompes" : L.featureGroup.subGroup(markers, this.$store.state.pompes).addTo(map),
                                "puits" : L.featureGroup.subGroup(markers, this.$store.state.puits).addTo(map),
                                "forages" : L.featureGroup.subGroup(markers, this.$store.state.forages).addTo(map),
                                "reservoirs" : L.featureGroup.subGroup(markers, this.$store.state.reservoirs).addTo(map),
                                "sourceamenagees" : L.featureGroup.subGroup(markers, this.$store.state.sourceamenagees).addTo(map),
                                "sourcenonamenagees" : L.featureGroup.subGroup(markers, this.$store.state.sourcenonamenagees).addTo(map),
                                "villagemodernes" : L.featureGroup.subGroup(markers, this.$store.state.villagemodernes).addTo(map),
                                "villagecollinaires" : L.featureGroup.subGroup(markers, this.$store.state.villagecollinaires).addTo(map),
                              }
                              let control = L.control.layers(null, overlay, {collapsed: true });
                              control.addTo(map);
                              this.is_fetching = false
                              // this.$store.state.map.addLayer(markers)
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
    })
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
