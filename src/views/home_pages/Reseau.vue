<template>
<ion-page>
    <ion-content>
        <ion-accordion-group>
            <ion-accordion v-for="province in reseaux?.data" :value="province?.nom">
                <ion-item slot="header" color="light">
                    <ion-label>
                        {{ province.nom }}
                        <ion-badge>{{ province.count }}</ion-badge>
                    </ion-label>
                    <ion-button fill="clear" size="small" routerLink="/map">
                        ikarata
                    </ion-button>
                </ion-item>
                <div class="ion-padding" slot="content">
                    <ion-accordion-group>
                        <ion-accordion :multiple="true" v-for="commune in province?.data" :value="'commune-'+commune?.nom">
                            <ion-item slot="header" color="light">
                                <ion-label>
                                    {{ commune.nom }}
                                    <ion-badge>{{ commune.count }}</ion-badge>
                                </ion-label>
                                <ion-button fill="clear" size="small" routerLink="/map">
                                    ikarata
                                </ion-button>
                            </ion-item>
                            <div class="ion-padding" slot="content">
                                <ion-accordion-group>
                                    <ion-accordion :multiple="true"
                                        v-for="zone in commune?.data"
                                        :value="'zone-'+zone?.nom">
                                        <ion-item slot="header" color="light">
                                            <div class="between" @click="loadAccordion('zone-'+zone?.nom)">
                                                <ion-label>
                                                    {{ zone.nom }}
                                                    <ion-badge>{{ zone.count }}</ion-badge>
                                                </ion-label>
                                                <ion-button fill="clear" size="small" routerLink="/map">
                                                    ikarata
                                                </ion-button>
                                            </div>
                                        </ion-item>
                                        <div class="ion-padding" slot="content" v-if="active_zone=='zone-'+zone?.nom">
                                            <ion-item v-for="colline in zone?.data" :value="'colline-'+colline?.nom">
                                                <ion-label>
                                                    {{ colline.nom }}
                                                    <ion-badge>{{ colline.count }}</ion-badge>
                                                </ion-label>
                                                <ion-button fill="clear" size="small" routerLink="/map">
                                                    ikarata
                                                </ion-button>
                                            </ion-item>
                                        </div>
                                    </ion-accordion>
                                </ion-accordion-group>
                            </div>
                        </ion-accordion>
                    </ion-accordion-group>
                </div>
            </ion-accordion>
        </ion-accordion-group>
    </ion-content>
</ion-page>
</template>
    
<script>  
export default {
    data(){
        return {
            reseaux: this.$store.state.reseaux,
            active_zone: null,
        }
    },
    watch:{
        "$store.state.reseaux"(new_val){
            this.reseaux = new_val
        },
        "$route"(to, from){
            if(to.name == "reseau"){
                if(!this.$store.state.reseaux){
                    this.fetchData()
                }
            }
        }
    },
    methods:{
        fetchData(){
            axios.get(this.url+"/reseaudalimentations/grouped/")
            .then(res => {
                this.$store.state.reseaux = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        loadAccordion(zone){
            this.active_zone = zone
            console.log(zone)
        }
    },
    mounted(){
        if(!this.$store.state.reseaux){
            this.fetchData()
        }
    }
}
</script>
<style scoped>
.between{
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: absolute;
    padding-right: 40px;
    z-index: 2;
}
</style>