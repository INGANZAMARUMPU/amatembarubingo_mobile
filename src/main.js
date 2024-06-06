import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonicVue,
  IonRouterOutlet, IonIcon, IonList, IonPopover, IonLabel, IonButtons, IonButton,
  IonItem, IonFooter, IonMenuButton, IonSegmentButton, IonSegment, toastController,
  IonAccordionGroup, IonAccordion, IonBadge, IonCol, IonBackButton
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'
import * as allIcons from "ionicons/icons";
import { App as CapacitorApp } from '@capacitor/app';

window.axios = axios;
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)

const components = {
  IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonicVue,
  IonRouterOutlet, IonIcon, IonList, IonPopover, IonLabel, IonButtons, IonButton,
  IonItem, IonFooter, IonMenuButton, IonSegmentButton, IonSegment,
  IonAccordionGroup, IonAccordion, IonBadge, IonCol, IonBackButton
};

Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.mixin({
  methods: {
    getIcon(name) {
      return allIcons[name];
    },
    makeToast(title, message="", duration=5000, callback, callback_text="OK"){
      if(message.toString().includes("</div>")){
        message = "Sorry, something went wrong!"
      }
      toastController.create({
        header: title,
        message: this.cleanString(message).slice(0, 240),
        icon: this.getIcon('informationCircleOutline'),
        duration:duration,
        buttons: [
          {
            text: callback_text,
            handler: callback
          }
        ]
      }).then(toast => {
        toast.present();
      });
    },
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += ` ${value} `
            }
            valeur = child;
          }
          string+=`${clef.toUpperCase()}: ${valeur}`
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    generateGeoMarker(item){
      let lat_long = item.II_5_coordonnees.split(" ")
      let title = "<table>"
      for(let key of Object.keys(item)){
          let value = item[key] || "-"
          key = key.split("_").splice(2).join(" ") || key
          title += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`
      }
      title += "</table>"
      let marker = L.circleMarker(
          [lat_long[0], lat_long[1]],
          { radius: 5 }
      ).bindTooltip(title,{
          direction: 'top'
      })
      return marker
    },
    performDownload(name, url, array, callback){
      if(!url) url = this.url+`/${name}/`
      axios.get(url).then(res => {
        let progress = Math.ceil(res.data.count / 100)
        let page = res.data.next.split("page=")[1] || progress
        this.$store.state.fetch_progress[name].level = page
        this.$store.state.fetch_progress[name].max = progress
        for(let item of res.data.results){
          array.push(this.generateGeoMarker(item))
        }
        if(!!res.data.next)
          this.performDownload(name, res.data.next, array, callback)
        else
          if(!!callback) callback()
      }).catch(err => {
        if(!!callback) callback()
      })
    },
    downloadMarkers(callback){
      this.performDownload(
        "reseaudalimentations", null, this.$store.state.reseaudalimentations, () => this.performDownload(
          "sourcenonamenagees", null, this.$store.state.sourcenonamenagees, () => this.performDownload(
            "branchementprives", null, this.$store.state.branchementprives, () => this.performDownload(
              "sourceamenagees", null, this.$store.state.sourceamenagees, () => this.performDownload(
                "villagemodernes", null, this.$store.state.villagemodernes, () => this.performDownload(
                  "reservoirs", null, this.$store.state.reservoirs, () => this.performDownload(
                    "captages", null, this.$store.state.captages, () => this.performDownload(
                      "amabombo", null, this.$store.state.amabombo, () => this.performDownload(
                        "forages", null, this.$store.state.forages, () => this.performDownload(
                          "puits", null, this.$store.state.puits, () => this.performDownload(
                            "pompes", null, this.$store.state.pompes, () => {
                              if(!!callback) callback()
                            }
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    }
  },
  computed:{
    url(){
      return this.$store.state.url;
    },
  }
})
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if((!canGoBack) || (window.history.state.back == null)){
    CapacitorApp.exitApp();
  } else {
    window.open(window.history.state.back, "_self")
  }
});
app.mount('#app');