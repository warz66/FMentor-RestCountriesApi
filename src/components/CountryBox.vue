<template>
  <div class="country-box" :to="{ name: 'Country', params: { alpha3Code: country.alpha3Code } }">
    <img :src="country.flag" :alt="country.name+' flag'">
    <div class="country-box-info">
        <h2>{{country.name}}</h2>
        <p><span class="semi-bold">Population: </span>{{country.population.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")}}</p>
        <p><span class="semi-bold">Region: </span>{{country.region}}</p>
        <p><span class="semi-bold">Capital: </span>{{country.capital}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryBox',
  props: {
    country: Object
  },
}
</script>

<style scoped>
  .country-box {
    display: flex;
    flex-wrap: wrap;
    width: 264px;
    height: 336px;
    background-color:var(--el-color);
    box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.03);
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  .country-box img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  .country-box-info {
    width: 100%;
    height: 176px;
    padding: 24px 24px 46px 24px;
  }
  .country-box-info h2 {
    font-size: 18px;
    line-height: 26px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .country-box-info p {
    font-size: 14px;
    line-height: 16px;
  }
  .country-box-info p:not(:last-child) {
    margin-bottom: 8px;
  }
</style>