<template>
  <v-text-field
    v-model="model"
    @keydown="keydown"
    @paste.native="paste"
    :label="label"
    :rules="rules"
    :hint="hint"
    :required="required"
    :disabled="disabled"
    autocomplete="none"
    class="field--integer"
    :style="`text-align: ${align}`"
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
    disabled: Boolean,
    maxlength: Number,
    align: {
      type: String,
      default: 'left',
    },
  },
  computed: {
    model: {
      get() {
        return this.value || ''
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  },
  methods: {
    keydown(e) {

      this.$emit('keydown', e, this.value)

      if (e.ctrlKey || [8, 9, 17].includes(e.keyCode))
        return

      if (!e.key.match(/\d/))
        e.preventDefault()

      if (this.maxlength && this.model.length >= this.maxlength)
        e.preventDefault()
    },
    paste(e) {

      this.$emit('paste', e)

      const paste = (event.clipboardData || window.clipboardData).getData('text')

      if (!paste.match(/^\d+$/))
        e.preventDefault()

      const value = paste + this.model

      if (this.maxlength && value.length > this.maxlength)
        e.preventDefault()
    }
  }
}
</script>

<style lang="scss">
.field--integer {
  input {
    text-align: inherit;
  }
}
</style>
