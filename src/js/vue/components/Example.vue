<template>

  <section>
      <h1>VUE COMPONENT {{ message }}</h1>
  </section>

</template>


<script>
  export default {
    data() {
      return {
        message: null,
      }
    },
    created() {
      this.message = this.$store.getters.getMessage
    }

  }
</script>


<style lang="scss" scoped>

  h1 {
    color: greenyellow
  }

</style>