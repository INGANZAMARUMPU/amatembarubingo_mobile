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