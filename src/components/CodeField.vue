<template>
  <div class="d-flex">
    <IntegerField
      v-for="n in codeLength"
      @input="input"
      @keydown="keydown"
      @paste="paste"
      :key="n"
      v-model="code[n - 1]"
      required
      class="mr-2 field--code"
      align="center"
      :maxlength="1"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import IntegerField from '@/components/IntegerField'

export default {
  props: {
    value: String,
    disabled: Boolean,
  },
  components: {
    IntegerField,
  },
  data() {
    return {
      code: [],
      codeLength: 6,
    }
  },
  methods: {
    input(value) {
      if (value) {
        const parent = event.target.closest('.field--code')
        const next = parent.nextElementSibling
        if (next) {
          const input = next.querySelector('input')
          if (input)
            input.focus()
        }
      }
    },
    keydown(event, value) {
      if (event.keyCode === 8 && !value) {
        const parent = event.target.closest('.field--code')
        const prev = parent.previousElementSibling
        if (prev) {
          const input = prev.querySelector('input')
          if (input)
            input.focus()
        }
      }
    },
    paste(event) {
      const paste = (event.clipboardData || window.clipboardData).getData('text')
      if (paste.match(/^\d+$/))
        this.code = paste.split('')
    },
  },
  watch: {
    code(value) {
      const code = value.join('')
      if (code.length === this.codeLength)
        this.$emit('input', code)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
