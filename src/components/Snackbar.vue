<template>
  <v-snackbar
    v-model="model"
    :color="color"
    top
    right>
    <slot></slot>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    value: Boolean,
    color: String,
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
