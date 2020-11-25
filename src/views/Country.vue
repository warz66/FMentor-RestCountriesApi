<template>
    <!--<img src="../assets/images/design/desktop-design-detail-light.jpg" alt="" style="position:absolute; left:0; top:0; z-index: 2; opacity:0.3;  margin: 0; width: 1440px;">-->
    <!--<img src="../assets/images/design/mobile-design-detail-light.jpg" alt="" style="position:absolute; left:0; top:0; z-index: 2; opacity:0.3;  margin: 0; width: 375px;">-->

    <section id="country-view">

        <router-link :to="{ name: 'Home' }" id="button-back">
            <svg width="18px" height="18px" viewbox="0 0 18 18" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 18 0)"><path d="M4.5 0L4.5 1.5L9.45 1.5L0 10.95L1.05 12L10.5 2.55L10.5 7.5L12 7.5L12 0L4.5 0Z" transform="matrix(0.70710677 0.70710677 -0.70710677 0.70710677 9 0.514719)" fill-rule="evenodd" stroke="none" /></g></svg>
            Back
        </router-link>
        
        <div v-if="error" class="error">
            <p>{{error.message}}</p>
        </div>
        <div class="loading" v-else-if="!isLoadedCountry">
            Loading...
        </div>
        <div id="country" v-else>
            <div id="country-img">
                <img :src="country.flag" :alt="country.name+' flag'">
            </div>
            <div id="country-panel">
                <h2>{{country.name}}</h2>
                <div id="country-panel-info">
                    <div>
                        <p><span class="semi-bold">Native Name: </span>{{country.nativeName}}</p>
                        <p><span class="semi-bold">Population: </span>{{country.population.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")}}</p>
                        <p><span class="semi-bold">Region: </span>{{country.region}}</p>
                        <p><span class="semi-bold">Sub Region: </span>{{country.subregion}}</p>
                        <p><span class="semi-bold">Capital: </span>{{country.capital}}</p>
                    </div>
                    <div>
                        <p><span class="semi-bold">Top Level Domain: </span>{{country.topLevelDomain[0]}}</p>
                        <p><span class="semi-bold">Currencies: </span>{{sortArray(country.currencies,'name')}}</p>
                        <p><span class="semi-bold">Languages: </span>{{sortArray(country.languages,'name')}}</p>
                    </div>
                </div>
                <div id="countries-border">
                    <p><span class="semi-bold">Border Countries: </span></p>
                    <p v-if="!isLoadedCountriesBorder">Loading...</p>
                    <template v-else-if="countriesBorder.length">
                        <router-link class="button-border-country" v-for="country in countriesBorder" :key="country" :to="{ name: 'Country', params: { alpha3Code: country.a3c } }">
                            {{country.name}}
                        </router-link>
                    </template>
                    <p v-else>No neighbor bordering on this country.</p>
                </div>
            </div>
        </div>

    </section>

</template>

<script>

export default {
    name: 'Country',
    data: function() {
        return {
        country: null,
        isLoadedCountry: false,
        isLoadedCountriesBorder: false,
        error: false,
        countriesBorder: []
        }
    },
    props: {
        alpha3Code: String
    },
    mounted() {
        this.consumeAPI(this.alpha3Code);
    },
    methods: {
        sortArray: function(array,idxStr) {
            return array.map(array => array[idxStr]).join(', ');
        },
        consumeAPI: function(a3c) {
            this.axios.get('https://restcountries.eu/rest/v2/alpha/'+a3c)
                .then((response) => {(this.country = response.data); this.isLoadedCountry = true;})
                .catch(error => {this.error = error} )
        }
    },
    watch: {
        country: async function() {
            this.countriesBorder = await Promise.all(this.country.borders.map(async function(countryBorderA3C) {
                return await fetch(`https://restcountries.eu/rest/v2/alpha/${countryBorderA3C}?fields=name`).then(res => res.json())
                    .then(result => { return {"name": result.name, "a3c": countryBorderA3C} }).catch(() => { return {"name": countryBorderA3C, "a3c": countryBorderA3C}});
            }));
            this.isLoadedCountriesBorder = true;
        },
        $route(from) {
            if(from.name === 'Country') {
                this.consumeAPI(from.params.alpha3Code);
            }
        }
    }
}
</script>

<style scoped>
#country-view {
    max-width: 1280px;
    margin: 80px auto 0 auto;
    padding-bottom: 80px;
}
#country {
    display: flex;
    justify-content: space-between;
    /*align-items: center;*/
    margin-top: 80px;
    max-width: 1280px;
}
#country-panel {
    width: 600px;
}
#country-panel h2 {
    font-size: 32px;
    line-height: 44px;
    margin-bottom: 23px;
    transition: all 0.3s;
}
#country-panel-info {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 58px;
    transition: all 0.3s;
}
#country-panel-info div {
    max-width: 50%;
}
#countries-border {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    transition: all 0.3s;
}
.button-border-country {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 96px;
    border-radius: 2px;
    min-height: 28px;
    background-color: var(--el-color);
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.11);
    font-size: 14px;
    line-height: 19px;
    margin: 10px 5px;
    padding: 4px 10px;
    transition: all 0.3s;  
    text-decoration: none;
    color: var(--font-color);
}
#button-back {
    width: 136px;
    height: 40px;
    background-color: var(--el-color);
    box-shadow: 0px 0px 7px rgba(0,0,0,0.29);
    border-radius: 6px;
    display: flex;
    align-items: center;
    font-size: 16px;  
    line-height: 20px;
    padding: 0px 40px 0px 33px; 
    text-decoration: none;
    color: var(--font-color);
    transition: all 0.3s; 
}
#button-back svg {
    fill: var(--font-color);
    transition: fill 0.3s; 
    margin-right: 10px;
}
#countries-border p:first-of-type {
    margin-right: 10px;
}
#country-img {
    width: 560px;
}
#country img {
    width: 100%;
    max-height: 401px;
}

@media (max-width: 1350px) {
    #country-view {
        padding: 0px 6vw 80px 6vw;
    }
    #country-panel {
        margin-left:50px;
    }    
}
@media (max-width: 1150px) {
    #country {
        flex-direction: column;
        align-items: center;
    }
    #country-panel {
        margin-top: 74px;
    }
}
@media (max-width: 800px) {
    #country-panel {
        margin-left: 0px;
        width: 100%;
    }
    #country-img {
        width: 100%;
        max-width: none;
    }
}
@media (max-width: 600px) {
    #country-view {
        padding: 0 27px 40px 28px;
        margin-top: 40px;
    }
    #country {
        margin-top: 64px;
    }
    #country-panel {
        width: 100%;
        margin: 30px 0px 0px 0px;
    }
    #country-panel h2 {
        font-size: 22px;
        margin-bottom: 11px;
    }
    #country-panel-info div {
        max-width: none;
    }
    #country-panel-info {
        flex-direction: column;
        margin-bottom: 34px;
        font-size: 14px;
    }
    #country-panel-info div:first-of-type {
        margin-bottom: 32px;
    }
    #countries-border p {
        width: 100%;
        margin-bottom: 16px;
    }
    #button-back {
        width: 104px;
        height: 32px;
        font-size: 14px;
        padding: 0 23px 0 22px;
    }
    .button-border-country {
        font-size: 12px;
        margin: 0px 10px 10px 0px;
    }
}
</style>