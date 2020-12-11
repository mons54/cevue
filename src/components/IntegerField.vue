<template>
  <v-text-field
    v-model="model"
    @keydown="keydown"
    @paste.native="paste"
    :label="label"
    :rules="rules"
    :hint="hint"
    :required="required"
  />
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    hint: String,
    rules: Array,
    required: Boolean,
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  },
  methods: {
    keydown(e) {
      if (!e.ctrlKey && ![8, 17].includes(e.keyCode) && !e.key.match(/\d/))
        e.preventDefault()
    },
    paste(e) {
      const paste = (event.clipboardData || window.clipboardData).getData('text')
      if (!paste.match(/^\d+$/))
        e.preventDefault()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
