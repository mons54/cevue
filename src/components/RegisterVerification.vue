<template>
  <div class="register-verification">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          offset-md="3"
          offset-lg="4">
          <h1>{{ title }}</h1>
          <v-form
            ref="form"
            autocomplete="none"
            class="mt-12">
            <v-label>{{ label }}</v-label>
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
                :disabled="loading"
              />
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <Snackbar
      v-model="snack"
      :color="snackColor">
      <v-icon>mdi-close-octagon</v-icon>
      {{ snackMessage }}
    </Snackbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { register, sendRegister } from '@/api/verification'
import IntegerField from '@/components/IntegerField'
import Snackbar from '@/components/Snackbar'

export default {
  props: {
    type: String,
    field: String,
    title: String,
    label: String,
    sentMessage: String,
    errorMessage: String,
  },
  components: {
    IntegerField,
    Snackbar,
  },
  data() {
    return {
      code: [],
      back: false,
      loading: false,
      snack: false,
      snackColor: null,
      snackMessage: null,
      codeLength: 6,
    }
  },
  methods: {
    ...mapMutations('user', [
      'setJwt',
      'setUser',
    ]),
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
    }
  },
  async mounted() {

    if (!this.field) {
      this.$router.push({ name: 'home' })
      return
    }

    const params = {}

    if (this.type === 'email') {
      params.email = this.field
    } else {
      params.mobile = this.field
    }

    try {
      await sendRegister(params)
      this.snack = true
      this.snackColor = 'success'
      this.snackMessage = this.sentMessage
    } catch(e) {
      const { data } = e.response
      this.snack = true
      this.snackColor = 'error'
      this.snackMessage = data.error
    }
  },
  watch: {
    async code(value) {
      const code = value.join('')
      if (code.length === this.codeLength) {

        const params = { code }

        if (this.type === 'email') {
          params.email = this.field
        } else {
          params.mobile = this.field
        }

        try {
          this.loading = true
          const { data } = await register(params)
          this.setJwt(data.jwt)
          this.setUser(data.user)
          this.$router.push({ name: 'home' })
        } catch(e) {
          this.snack = true
          this.snackColor = 'error'
          const { status } = e.response
          if (status === 406) {
            this.snackMessage = this.errorMessage
          } else {
            const { data } = e.response
            this.snackMessage = data.error
          }
          this.loading = false
        }
      }
    }
  }
}
</script>
