<template>
  <div id="app">
    <textarea
      v-model="search"
      placeholder="Input Search Query (Optional)"
    />
    <br>
    <button
      v-on:click="getData()"
    >
      Search
    </button>
    <br>
    <br>
    {{ displayText }}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data: ()=> ({
    search: '',
    refreshTimer: null,
    cache: null,
    displayText: {},
    prevSearch: '',
  }),
  methods: {
    async getData() {
      console.log('here is cache', this.cache);
      if(this.search !== this.prevSearch || !this.cache) {
        this.displayText = await axios.get('http://localhost:8081/', {
          params: {
            searchTerm: this.search,
          }
        });
        this.cache = this.displayText;
        console.log('Refilled Search', this.cache);
        this.prevSearch = this.search
        this.refreshCache();
      }
    },
    refreshCache() {
      this.refreshTimer = setInterval(() => {
        this.cache = null;
      }, 10000);
    }
  },
}
</script>

<style>
</style>
