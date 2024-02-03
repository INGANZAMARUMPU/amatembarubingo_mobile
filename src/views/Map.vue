<template>
  <ion-page>
      <ion-header :translucent="true">
          <ion-toolbar>
              <ion-buttons slot="start">
                  <ion-back-button @click="$router.back()"></ion-back-button>
              </ion-buttons>
              <ion-title>FAQ</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content class="ion-no-padding">
          <div id="map"></div>
          <div class="mylocation" title="my location" @click="watchPosition">
              <img src="/location.png" alt="">
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
          layer_control: null,
          agent_icon: L.icon({iconUrl: "agent.png", iconAnchor:[10, 15],  iconSize: [20, 20],}),
          my_pos_icon: L.icon({iconUrl: "location.png", iconAnchor:[10, 25],  iconSize: [20, 30],}),
          waiting_agents: [],
          overlay: null,
          agent_layer: null,
          interval: null,
          marker: null,
          my_pos_shown: false
      };
  },
  watch:{
      "$store.state.agents":{
          deep:true,
          handler(new_val){
              this.loadAgentMarkers(new_val)
          }
      },
      "$store.state.map"(new_val){
          if(!!new_val) this.displayMarkers()
      },
  },
  methods:{
      loadAgentMarkers(items){
          let markers = []
          for(let agent of items){
              if(!agent.latitude || !agent.longitude) continue
              markers.push(
                  L.marker(
                      [agent.latitude, agent.longitude],
                      { icon: this.agent_icon }
                  ).on("click", () => this.getInfo("agent", agent))
              )
          }
          this.waiting_agents = markers
          this.displayMarkers()
      },
      displayMarkers(){
          if(!!this.$store.state.map){
              if(this.waiting_agents.length > 0){
                  if(!!this.overlay) this.overlay.remove(this.$store.state.map)
                  if(!!this.agent_layer) this.agent_layer.remove(this.$store.state.map)
                  this.agent_layer = L.layerGroup(this.waiting_agents)
                  this.overlay = L.control.layers(this.tileLayer, {
                      "agents": this.agent_layer
                  })
                  this.overlay.addTo(this.$store.state.map)
                  this.agent_layer.addTo(this.$store.state.map)
              }
          }
      },
      getInfo(person) {
          this.$store.state.agent = person;
          this.$store.state.agent_shown = true
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
          } catch (error) {}
      },
      watchPosition(){
          if(this.my_pos_shown){
              window.clearInterval(this.interval)
              this.my_pos_shown = !this.my_pos_shown
              try {
                  this.marker.removeFrom(this.$store.state.map)
              } catch (error) {}
          } else {
              this.my_pos_shown = !this.my_pos_shown
              this.interval = setInterval(() => {
                  navigator.geolocation.getCurrentPosition(x => {
                      try {
                          this.marker.removeFrom(this.$store.state.map)
                      } catch (error) {}
                      this.marker = L.marker(
                          [x.coords.latitude, x.coords.longitude],
                          { icon: this.my_pos_icon }
                      )
                      this.marker.addTo(this.$store.state.map)
                  });
              }, 1000)
          }
      }
  },
  mounted(){
      let vue = this
      window.setTimeout(() => {
          vue.loadMap()
      }, 10)
  },
}
</script>
<style>
#map{
  width: 100%;
  height: 100%;
}
.mylocation{
  position: fixed;
  z-index: 401;
  left: 10px;
  bottom: 10px;
  background-color: #fff9;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 2px solid #5555;
}
.mylocation:hover{
  background-color: white;
}
.mylocation img{
  width: 20px;
  height: 30px;
}
</style>
