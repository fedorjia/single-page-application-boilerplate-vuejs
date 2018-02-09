<template>
  <div>
    <sub-item user="fedor"></sub-item>

    <br/>

    <div>state items: </div>
    <ul>
      <li v-bind:key="item" v-for="item in items">
        {{ item }}
        <br>
      </li>
    </ul>

    <br/>

    <div>getter items: </div>
    <ul>
      <li v-bind:key="item" v-for="item in gitems">
        {{ item }}
        <br>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import homeTypes from './types'
import SubItem from './component/sub-item.vue'

export default {
  components: {
    SubItem
  },

  computed: {
    ...mapState({
      items: ({home}) => home.items
    }),

    ...mapGetters({
      gitems: 'gItems'
    })
  },

  created () {
    this.$store.dispatch(homeTypes.LOAD)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
