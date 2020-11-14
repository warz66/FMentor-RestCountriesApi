<template>
  <div id="root" :class="$store.state.mode ? 'light-mode' : 'dark-mode'">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
@import './assets/styles/minireset.min.css';

:root {
  /*- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
  - Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
  - Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
  - Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
  - Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
  - White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)*/
  --color-dark-el: hsl(209, 23%, 22%);
  --color-dark-bg: hsl(207, 26%, 17%);
  --color-light-text: hsl(200, 15%, 8%);
  --color-light-input: hsl(0, 0%, 52%);
  --color-light-bg: hsl(0, 0%, 98%);
  --color-dark-light-text-bg: hsl(0, 0%, 100%);
}
.dark-mode {
  --font-color: var(--color-dark-light-text-bg); 
  --el-color: var(--color-dark-el);
  --bg-color: var(--color-dark-bg);
  --font-color-input: var(--color-dark-light-text-bg);
  --arrow-select-color: white;
  --search-svg: url("./assets/images/search-dark.svg");
  --mode-svg: url("./assets/images/moon-solid.svg");
}
.light-mode {
  --font-color: var(--color-light-text); 
  --el-color: var(--color-dark-light-text-bg);
  --bg-color: var(--color-light-bg);
  --font-color-input: var(--color-light-input);
  --arrow-select-color: black;
  --search-svg: url("./assets/images/search-light.svg");
  --mode-svg: url("./assets/images/moon-regular.svg");
}
.semi-bold {
  font-weight: 600;
}
#root {
  font-family: 'Nunito Sans', sans-serif;
  color: var(--font-color);
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: all 0.3s;
}
/* error api */
.error {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
</style>
