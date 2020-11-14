<template>
    <header>
        <div>
            <h1>Where in the world?</h1>
            <div @click="$store.state.mode = !$store.state.mode" id="select-mode">
                <img alt="image moon mode">
                {{$store.state.mode ? 'Dark Mode' : 'Light Mode'}}
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    country: Object
  },
}
</script>

<style scoped>
header {
    box-shadow: 0px 2px 4px rgba(0,0,0,0.05);
    background-color: var(--el-color);
    transition: all 0.3s;
}
header > div {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    height: 80px;
}
#select-mode {
    cursor: pointer;
    user-select: none;
    display: flex;
    font-weight: 600;

}
#select-mode img {
    content: var(--mode-svg);
    margin-right: 6px;
}
@media (max-width: 1350px) {
    header > div {
        padding: 0 6vw;
    }
}
h1 {
    font-size:24px;
    line-height: 33px;
    font-weight: bold;     
}
@media (max-width: 450px) {
    header > div {
        padding: 0 16px;
    }
    h1 {
        font-size:14px;
        line-height: 20px;  
    } 
    #select-mode {
        font-size: 12px;
    }
    #select-mode img {
        width: 16px;
        height: 16px;
    }
}
</style>