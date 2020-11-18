<template>

  <!--<img src="../assets/images/design/desktop-design-home-dark.jpg" alt="" style="position:absolute; left:0; top:0; z-index: 2; opacity:0.3;  margin: 0; width: 1440px;">-->
  <!--<img src="../assets/images/design/desktop-design-home-light.jpg" alt="" style="position:absolute; left:0; top:0; z-index: 2; opacity:0.3;  margin: 0; width: 1440px;">-->
  <!--<img src="../assets/images/design/mobile-index-dark.jpeg" alt="" style="position:absolute; left:0; top:0; z-index: 2; opacity:0.3;  margin: 0; width: 375px;">-->
    
    <div id="search-filter-panel">
      
      <div id="search-country-wrapper">
        <input type="text" v-model="search" aria-label="Allows you to search for a country" placeholder="Search for a country..."/>
      </div>

      <div id="select-region-wrapper" v-click-outside="onClickOutside">
        <div id="select-region-btn" @click="openSelect=!openSelect">
          {{region}}
          <svg width="12px" height="12px" viewbox="0 0 12 12" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g id="check"><path d="M0 0L12 0L12 12L0 12L0 0Z" id="Rectangle" fill="none" fill-rule="evenodd" stroke="none" /><g id="expand-more" transform="translate(1.5 3.75)"><path d="M7.95 1.33227e-15L4.5 3.45L1.05 1.33227e-15L0 1.05L4.5 5.55L9 1.05L7.95 1.33227e-15Z" transform="translate(0 -0.3)" id="Shape" fill-rule="evenodd" stroke="none" /></g></g></svg>
        </div>
        <transition name="slide"> 
          <div id=select-region-nav v-show="openSelect">
            <ul>
              <li @click="{region='Filter by Region'; openSelect=!openSelect;}">All</li>
              <li @click="{region='Africa'; openSelect=!openSelect}">Africa</li>
              <li @click="{region='Americas'; openSelect=!openSelect}">America</li>
              <li @click="{region='Asia'; openSelect=!openSelect}">Asia</li>
              <li @click="{region='Europe'; openSelect=!openSelect}">Europe</li>
              <li @click="{region='Oceania'; openSelect=!openSelect}">Oceania</li>
            </ul>
          </div>
        </transition> 
      </div>

    </div>

    <section id="countries">
      <div v-if="error" class="error">
        <p>{{error.message}}</p>
      </div>
      <div id="countries-box" v-else-if="error === false">
        <template v-for="country in countries" :key="country">
          <CountryBox v-show="filter(country)" :country="country" />
        </template>
      </div>
    </section>

</template>

<script>
import CountryBox from '@/components/CountryBox.vue'

export default {
  name: 'Home',
  data: function() {
    return {
      openSelect: false,
      error: null,
      countries: [],
      region: 'Filter by Region',
      search: ""
    }
  },
  components: {
    CountryBox
  },
  mounted() {
    this.axios.get('https://restcountries.eu/rest/v2/all')
              .then((response) => {(this.countries = response.data); this.error = false})
              .catch(error => this.error = error)
  },
  methods: {
    onClickOutside() {
      this.openSelect = false;
    },
    filter: function(country) {
      return ((country.region === this.region || this.region === 'Filter by Region') && country.name.toLowerCase().includes(this.search.toLowerCase()));
    }
  }
}
</script>

<style scoped>

/* search filter panel */

#search-filter-panel {
  margin: 0 auto;
  display:flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  padding: 48px 0px;
}

#search-country-wrapper input, #select-region-btn {
  height: 56px;
  font-size: 14px;
  box-shadow: 0px 2px 9px rgba(0,0,0,0.05);
  font-weight: 400;
  line-height: 20px;
  transition: all 0.3s;
  background-color: var(--el-color);
  border-radius: 5px;
}

#search-country-wrapper input {
  width: 480px;
  padding-left:74px;
  background-repeat: no-repeat;
  background-position: 32px;
  background-image: var(--search-svg);
  font-family: "Nunito Sans";
  border: none;
  outline: none;
  color: var(--font-color-input);
}
#search-country-wrapper input::placeholder {
  color: var(--font-color-input);
  transition: all 0.3s;
}

#select-region-wrapper {
  position: relative;
}
#select-region-btn {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  user-select: none;
  align-items: center;
  width: 200px;
  padding: 19px 17px 17px 24px;
}
#select-region-wrapper svg {
  fill: var(--arrow-select-color);
  transition: all 0.3s;
}
#select-region-nav {
  position: absolute;
  display: flex;
  align-items: center;
  background: var(--el-color);
  top: 60px;
  height: 192px;
  width: 100%;
  border-radius: 5px;
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  padding-left: 24px;
  transition: all 0.3s;
  overflow: hidden;
}
#select-region-nav li {
  cursor: pointer;
  user-select: none;
}
#select-region-nav li:hover {
 font-weight: 600;
}
#select-region-nav li:not(:last-child) {
  margin-bottom: 8px;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 192px;
}
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s;
  transform-origin: bottom;
}

/* section Countries */

#countries {
  margin: 0 auto;
  max-width: max-content;
  padding-bottom: 48px;
}
#countries-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 75px;
  max-width: 1280px;
}

/* media queries */

@media (max-width: 1350px) {
  #countries-box {
    grid-template-columns: 1fr 1fr 1fr;
  }
  #search-filter-panel {
    padding: 48px 6vw;
  }  
}

@media (max-width: 1085px) {
  #countries-box {
    grid-template-columns: 1fr 1fr;
  }  
}

@media (max-width: 850px) {
  #search-filter-panel {
    flex-direction: column;
    align-items: start;
  }
  #select-region-btn {
    margin-top: 40px;
  }
  #search-country-wrapper {
    width: 100%;
  }
  #search-country-wrapper input {
    width: 100%;
  }
  #select-region-nav {
    top: 100px;
  }
}

@media (max-width: 680px) {
  #countries-box {
    grid-template-columns: 1fr;
  }  
}

@media (max-width: 450px) {
  #countries-box {
    gap: 40px;
  }
  #search-filter-panel {
    padding: 24px 16px 32px 16px;
  }
  #search-country-wrapper input, #select-region-btn {
    font-size: 12px !important;
    line-height: 20px !important;
    height: 48px !important;
  }
  #select-region-nav {
    font-size: 12px;
    line-height: 16px;
    top: 92px;
    height: 168px;
  }
}
</style>