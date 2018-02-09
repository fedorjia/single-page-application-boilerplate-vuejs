<template>
  <div>
    {{name}} - {{user}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'sub-item'
    }
  },
  props: {
    user: String
  }
}
</script>
