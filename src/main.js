import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonicVue,
  IonRouterOutlet, IonIcon, IonList, IonPopover, IonLabel, IonButtons, IonButton,
  IonFooter, IonMenuButton, IonSegmentButton, IonSegment, toastController,
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
  IonFooter, IonMenuButton, IonSegmentButton, IonSegment,
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
    serialize(value) {
      if (typeof value === 'function') return value.toString();
      if (typeof value === 'object') {
        var serializeObject = {};
        for (const [objectKey, objectValue] of Object.entries(value)) {
          if(!!objectValue)
            serializeObject[objectKey] = this.serialize(objectValue);
        }
        return serializeObject;
      }
      return value;
    },
    insertAll(storage, data, callback){
      let transaction
      try {  
        transaction = this.$store.state.DB.transaction(storage, "readwrite");
      } catch (error) {
        console.error(error)
        return
      }
      let table = transaction.objectStore(storage);

      let i = 0
      let vue = this
      putNext();
      function putNext() {
        if (i<data.length) {
          table.put(vue.serialize(data[i])).onsuccess = putNext;
          ++i;
        } else {
          if(!!callback) callback(data);
        }
      }
      transaction.onsuccess = () => {
        if(!!callback) callback(data)
      };
      transaction.onerror = (error) => {
        console.error(error)
      };
    },
    selectAll(storage, callback){
      let transaction
      try {  
        transaction = this.$store.state.DB.transaction(storage, "readonly");
      } catch (error) {
        return
      }
      let table = transaction.objectStore(storage);
      let request = table.getAll()
      request.onsuccess = () => callback(request.result);
      request.onerror = (error) => console.error(error);
    },
    loadData(callback){
      this.selectAll("reseaudalimentations", data => {
        window.reseaudalimentations = data
        this.selectAll("sourcenonamenagees", data => {
          window.sourcenonamenagees = data
          this.selectAll("branchementprives", data => {
            window.branchementprives = data
            this.selectAll("sourceamenagees", data => {
              window.sourceamenagees = data
              this.selectAll("villagecollinaires", data => {
                window.villagecollinaires = data
                this.selectAll("villagemodernes", data => {
                  window.villagemodernes = data
                  this.selectAll("reservoirs", data => {
                    window.reservoirs = data
                    this.selectAll("captages", data => {
                      window.captages = data
                      this.selectAll("amabombo", data => {
                        window.amabombo = data
                        this.selectAll("forages", data => {
                          window.forages = data
                          this.selectAll("puits", data => {
                            window.puits = data
                            this.selectAll("pompes", data => {
                              window.pompes = data
                              window.displayMarkers()
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
    generateGeoMarker(name, item, lat_long){
      let title = `<b style="text-transform:uppercase;font-size:1.2em">${name}</b><br/>`
      for(let key of Object.keys(item)){
          let value = item[key] || "-"
          key = key.split("_").splice(2).join(" ") || key
          title += `<b>${key}: </b><br>${value}<br>`
      }
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
        array.push(...res.data.results)
        if(!!res.data.next){
          this.performDownload(name, res.data.next, array, callback)
        } else {
          callback()
        }
      }).catch(err => {
        if(!!callback) callback()
      })
    },
    downloadMarkers(callback){
      this.performDownload(
        "reseaudalimentations", null, window.reseaudalimentations, () => this.performDownload(
          "sourcenonamenagees", null, window.sourcenonamenagees, () => this.performDownload(
            "branchementprives", null, window.branchementprives, () => this.performDownload(
              "sourceamenagees", null, window.sourceamenagees, () => this.performDownload(
                "villagecollinaires", null, window.villagecollinaires, () => this.performDownload(
                  "villagemodernes", null, window.villagemodernes, () => this.performDownload(
                    "reservoirs", null, window.reservoirs, () => this.performDownload(
                      "captages", null, window.captages, () => this.performDownload(
                        "amabombo", null, window.amabombo, () => this.performDownload(
                          "forages", null, window.forages, () => this.performDownload(
                            "puits", null, window.puits, () => this.performDownload(
                              "pompes", null, window.pompes, () => {
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