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
    </ion-content>
  </ion-page>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data() {
      return {
          layer_control: null,

          reseaudalimentations_layer: null,
          amabombo_layer: null,
          branchementprives_layer: null,
          captages_layer: null,
          pompes_layer: null,
          puits_layer: null,
          forages_layer: null,
          reservoirs_layer: null,
          sourceamenagees_layer: null,
          sourcenonamenagees_layer: null,
          villagemodernes_layer: null,
          villagecollinaires_layer: null,

          overlay: null,
          
      };
  },
  watch:{
      "$store.state.map"(new_val){
          if(!!new_val) this.displayMarkers()
      },
  },
  methods:{
      loadMarkers(layer, url, icon){
        axios.get(this.url+`/${url}/`).then(res => {
            for(let item of res.data.results){
                let lat_long = item.II_5_coordonnees.split(" ")
                let title = "<table>"
                for(let key of Object.keys(item)){
                    let value = item[key] || "-"
                    key = key.split("_").splice(2).join(" ") || key
                    title += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`
                }
                title += "</table>"
                let marker = L.marker(
                    [lat_long[0], lat_long[1]],
                    { icon: icon }
                ).bindTooltip(title,{
                    direction: 'top'
                })//.on("click", () => this.displayDetails(item))
                layer.addLayer(marker)
            }
        }).catch(err => {
            this.$store.state.label = ""
            console.error(err);
        })
      },
      displayMarkers(){
          if(!!this.$store.state.map){
            if(!!this.overlay) return

            this.reseaudalimentations_layer = L.layerGroup()
            this.reseaudalimentations_layer.source_url = "reseaudalimentations"
            this.reseaudalimentations_layer.icon = L.icon({iconUrl: "vane.png", iconAnchor:[20, 26]})

            this.amabombo_layer = L.layerGroup()
            this.amabombo_layer.source_url = "amabombo"
            this.amabombo_layer.icon = L.icon({iconUrl: "ibombo.png", iconAnchor:[18, 27]})
            
            this.branchementprives_layer = L.layerGroup()
            this.branchementprives_layer.source_url = "branchementprives"
            this.branchementprives_layer.icon = L.icon({iconUrl: "bp.png", iconAnchor:[20, 26]})
            
            this.captages_layer = L.layerGroup()
            this.captages_layer.source_url = "captages"
            this.captages_layer.icon = L.icon({iconUrl: "captage.png", iconAnchor:[20, 27]})
            
            this.pompes_layer = L.layerGroup()
            this.pompes_layer.source_url = "pompes"
            this.pompes_layer.icon = L.icon({iconUrl: "pompe.png", iconAnchor:[18, 35]})
            
            this.puits_layer = L.layerGroup()
            this.puits_layer.source_url = "puits"
            this.puits_layer.icon = L.icon({iconUrl: "puit.png", iconAnchor:[19, 20]})
            
            this.forages_layer = L.layerGroup()
            this.forages_layer.source_url = "forages"
            this.forages_layer.icon = L.icon({iconUrl: "forage.png", iconAnchor:[20, 13]})
            
            this.reservoirs_layer = L.layerGroup()
            this.reservoirs_layer.source_url = "reservoirs"
            this.reservoirs_layer.icon = L.icon({iconUrl: "reservoir.png", iconAnchor:[20, 30]})
            
            this.sourceamenagees_layer = L.layerGroup()
            this.sourceamenagees_layer.source_url = "sourceamenagees"
            this.sourceamenagees_layer.icon = L.icon({iconUrl: "rusengo.png", iconAnchor:[20, 12]})
            
            this.sourcenonamenagees_layer = L.layerGroup()
            this.sourcenonamenagees_layer.source_url = "sourcenonamenagees"
            this.sourcenonamenagees_layer.icon = L.icon({iconUrl: "sna.png", iconAnchor:[20, 26]})
            
            this.villagemodernes_layer = L.layerGroup()
            this.villagemodernes_layer.source_url = "villagemodernes"
            this.villagemodernes_layer.icon = L.icon({iconUrl: "moderne.png", iconAnchor:[22, 20]})
            
            this.villagecollinaires_layer = L.layerGroup()
            this.villagecollinaires_layer.source_url = "villagecollinaires"
            this.villagecollinaires_layer.icon = L.icon({iconUrl: "collinaire.png", iconAnchor:[25, 48]})

            this.overlay = L.control.layers(this.tileLayer, {
                "Reseaux AEP": this.reseaudalimentations_layer,
                "Bornes Fontaines": this.amabombo_layer,
                "Branchement Privés": this.branchementprives_layer,
                "Captages": this.captages_layer,
                "Pompes": this.pompes_layer,
                "Puits": this.puits_layer,
                "Forages": this.forages_layer,
                "Reservoirs": this.reservoirs_layer,
                "Rource Amenagées": this.sourceamenagees_layer,
                "Source Non Amenagées": this.sourcenonamenagees_layer,
                "Village Modernes": this.villagemodernes_layer,
                "Village Collinaires": this.villagecollinaires_layer,
            })
            this.overlay.addTo(this.$store.state.map)
            this.reseaudalimentations_layer.addTo(this.$store.state.map)
            // this.amabombo_layer.addTo(this.$store.state.map)
            // this.branchementprives_layer.addTo(this.$store.state.map)
            // this.captages_layer.addTo(this.$store.state.map)
            // this.pompes_layer.addTo(this.$store.state.map)
            // this.puits_layer.addTo(this.$store.state.map)
            // this.forages_layer.addTo(this.$store.state.map)
            // this.reservoirs_layer.addTo(this.$store.state.map)
            // this.sourceamenagees_layer.addTo(this.$store.state.map)
            // this.sourcenonamenagees_layer.addTo(this.$store.state.map)
            // this.villagemodernes_layer.addTo(this.$store.state.map)
            // this.villagecollinaires_layer.addTo(this.$store.state.map)
          }
      },
      displayDetails(item) {
          this.$store.state.item = item;
          this.$store.state.infos_shown = true
      },
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
            this.$store.state.map.on('layeradd', e => {
                if(!!e.layer.source_url) this.loadMarkers(e.target, e.layer.source_url, e.layer.icon)
            });
            this.$store.state.map.on('layerremove', e => {
                console.log(e)
                if(!!e.layer.source_url) e.target.clearLayers()
            });
        } catch (error) {}
      },
  },
  mounted(){
      let vue = this
      window.setTimeout(() => {
          vue.loadMap()
          vue.displayMarkers()
      }, 10)
  },
}
</script>
<style>
#map{
  width: 100%;
  height: 100%;
}
</style>
