<template>
<ion-page>
    <ion-content>
        <ion-accordion-group>
            <ion-accordion v-for="province in reseaux?.data" :value="province?.nom">
            <ion-item slot="header" color="light">
                <ion-label>{{ province.nom }}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">{{ province }}</div>
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
        }
    },
    watch:{
        "$store.state.reseaux"(new_val){
            this.reseaux = new_val
        },
        "$route"(to, from){
            if(to.name == "reseau"){
                if(!this.$store.state.reseaux){
                    console.log("fetching")
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
    },
    mounted(){
        if(!!this.$store.state.reseaux){
            this.fetchData()
        }
    }
}
</script>
<style scoped>
</style>