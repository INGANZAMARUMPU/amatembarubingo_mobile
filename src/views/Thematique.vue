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
      <div v-if="!theme" class="chooser" @click="selectMap">
        <div>Choisissez un theme pour voir la carte</div>
        <ion-button>
          Choisir le thème
        </ion-button>
        <ion-select
          id="map_chooser"
          multiple="false"
          @IonChange="theme = $event.target.value"
          cancel-text="reka" ok-text="sawa">
          <ion-select-option v-for="item in themes" :value="item">
            {{ item.theme }}
          </ion-select-option>
        </ion-select>
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
      themes: this.$store.state.themes
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
        this.$store.state.label = ""
        console.error(err);
        this.$store.state.themes = JSON.parse(window.localStorage.getItem("themes"))
      })
    },
    selectMap(){
      map_chooser.click()
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
</style>