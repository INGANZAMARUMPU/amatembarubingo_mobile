<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button @click="$router.back()"></ion-back-button>
        </ion-buttons>
        <ion-title>INEA 2024</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-no-padding">
      <div v-if="!theme" class="chooser" @click="is_selecting = true">
        <div>Choisissez un theme pour voir la carte</div>
        <ion-button>
          Choisir le thème
        </ion-button>
      </div>
      <div v-else class="player">
        <h1 @click="is_selecting = true">
          {{ theme.theme }}
          <ion-button>
            <ion-icon :src="getIcon('repeat')"/>
          </ion-button>
        </h1>
        <div class="map">
          <PDFViewer
            :source="theme.carte"
            :controls="['zoom', 'download']"
            :settings="{'defaultZoom':150}"
            :download="{'source': theme.carte, 'filename': theme.theme}"
            style="height: 100%; min-width: 100%"
          />
        </div>
        <div style="padding: 10px;">
          {{ theme.details }}
        </div>
      </div>
    </ion-content>
    <div class="overlayer" v-if="is_selecting">
      <div class="dialog">
        <h2>Choisissez le thème</h2>
        <div class="choices">
          <div v-for="item in themes" @click="switchTo(item)">
            {{item.theme}}
          </div>
          <div>
            {{this.$store.state.label}}
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <span @click="is_selecting = false">
            <ion-button>laisser</ion-button>
          </span>
        </div>
      </div>
    </div>
  </ion-page>
</template>
  
<script>
import PDFViewer from 'pdf-viewer-vue'
export default {
  components: {
    PDFViewer
  },
  data(){
    return {
      theme: null,
      themes: this.$store.state.themes,
      is_selecting: true
    }
  },
  watch:{
    "$store.state.themes"(new_val){
      this.themes = new_val
    }
  },
  methods:{
    fetchThemes(){
      this.$store.state.label = "Gukwega ama karata yose ..."
      axios.get(this.url+"/cartethematiques/").then(res => {
        this.$store.state.themes = res.data.results
        window.localStorage.setItem("themes", JSON.stringify(this.$store.state.themes))
      }).catch(err => {
        console.error(err);
        this.$store.state.themes = JSON.parse(window.localStorage.getItem("themes"))
      }).finally(() => {
        this.$store.state.label = ""
      })
    },
    switchTo(value){
      this.theme = value
      this.is_selecting = false
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
#map_chooser{
  display: none;
}
h1{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;
}
.map{
  width: calc(100% - 20px);
  margin: auto;
  flex-grow: 1;
}
.overlayer{
  position: fixed;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: #5555;
}
.dialog{
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 360px;
  max-height: 80%;
  transform: translate(-50%, -50%);
  padding: 0 20px 20px 20px;
  border-radius: 5px;
  font-size: 1.1em;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.choices{
  min-height: 40px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.player{
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
}
/* .pdf-viewer {
  min-width: 100%;
} */
</style>