import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: "http://127.0.0.1:8000/api",
    // url: "http://84.46.251.167:8001/api",
    reseaux: null,
    item: null,
    info_shown: false,
    logs:"",
    DB: null,
    reseaudalimentations: [],
    amabombo: [],
    branchementprives: [],
    captages: [],
    pompes: [],
    puits: [],
    forages: [],
    reservoirs: [],
    sourceamenagees: [],
    sourcenonamenagees: [],
    villagemodernes: [],
    villagecollinaires: [],
    fetch_progress:{
      reseaudalimentations:{name:"Reseaux d' alimentations", level:0, max:0},
      sourcenonamenagees:{name:"Source non-amenagées", level:0, max:0},
      branchementprives:{name:"Branchements Prives", level:0, max:0},
      sourceamenagees:{name:"Source Amenagees", level:0, max:0},
      villagecollinaires:{name:"Village Collinaires", level:0, max:0},
      villagemodernes:{name:"Village Modernes", level:0, max:0},
      reservoirs:{name:"Reservoirs", level:0, max:0},
      captages:{name:"Captages", level:0, max:0},
      amabombo:{name:"Bornes fontaines", level:0, max:0},
      forages:{name:"Forages", level:0, max:0},
      puits:{name:"Puits", level:0, max:0},
      pompes:{name:"Pompes", level:0, max:0}
    },

    // reseaudalimentations_icon: L.icon({iconUrl: "vane.png", iconAnchor:[20, 26]}),
    // amabombo_icon: L.icon({iconUrl: "ibombo.png", iconAnchor:[18, 27]}),
    // branchementprives_icon: L.icon({iconUrl: "bp.png", iconAnchor:[20, 26]}),
    // captages_icon: L.icon({iconUrl: "captage.png", iconAnchor:[20, 27]}),
    // pompes_icon: L.icon({iconUrl: "pompe.png", iconAnchor:[18, 35]}),
    // puits_icon: L.icon({iconUrl: "puit.png", iconAnchor:[19, 20]}),
    // forages_icon: L.icon({iconUrl: "forage.png", iconAnchor:[20, 13]}),
    // reservoirs_icon: L.icon({iconUrl: "reservoir.png", iconAnchor:[20, 30]}),
    // sourceamenagees_icon: L.icon({iconUrl: "rusengo.png", iconAnchor:[20, 12]}),
    // sourcenonamenagees_icon: L.icon({iconUrl: "sna.png", iconAnchor:[20, 26]}),
    // villagemodernes_icon: L.icon({iconUrl: "moderne.png", iconAnchor:[22, 20]}),
    // villagecollinaires_icon: L.icon({iconUrl: "collinaire.png", iconAnchor:[25, 48]}),

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
