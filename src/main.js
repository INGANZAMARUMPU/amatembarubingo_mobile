import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import {
  IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonicVue,
  IonRouterOutlet, IonIcon, IonList, IonPopover, IonLabel, IonButtons, IonButton,
  IonItem, IonFooter, IonMenuButton, IonSegmentButton, IonSegment,
  IonAccordionGroup, IonAccordion, IonBadge, IonCol, IonBackButton
} from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
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
  IonItem, Swiper, SwiperSlide, IonFooter, IonMenuButton, IonSegmentButton, IonSegment,
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
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    logOut(x) {
      alertController.create({
        header: 'Attention!',
        message: 'Voulez-vous vraiment vous deconnecter?',
        buttons: [
          {
            text: 'laisser',
            role: 'cancel'
          },
          {
            text: 'OUI',
            handler: () => {
              localStorage.clear() 
              this.$store.state.user = null
            },
          },
        ],
      }).then(res => {
        res.present();
      });
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
      this.$store.state.logs = `gukwega ${url}...`
      if(!url) url = this.url+`/${name}/`
      axios.get(url).then(res => {
        let progress = res.data.count / 100
        let page = res.data.next.split("page=")[1] || progress
        this.$store.state.logs = `${page}/${progress} gukwega ${url}`
        for(let item of res.data.results){
          array.push(this.generateGeoMarker(item))
        }
        // if(!!res.data.next) this.performDownload(name, res.data.next, array)
      }).catch(err => {
      }).finally(() => {
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