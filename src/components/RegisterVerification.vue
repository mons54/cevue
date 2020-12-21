<template>
  <UserAccess>
    <template v-slot:title>{{ title }}</template>
    <template>
      <v-form
        autocomplete="off"
        class="mt-12">
        <v-label>{{ label }}</v-label>
        <CodeField
          v-model="code"
          :disabled="loading"
        />
      </v-form>
    </template>
    <Snackbar
      v-model="snack"
      :color="snackColor">
      <v-icon>mdi-close-octagon</v-icon>
      {{ snackMessage }}
    </Snackbar>
  </UserAccess>
</template>

<script>
import { mapMutations } from 'vuex'
import { register, sendRegister } from '@/api/verification'
import CodeField from '@/components/CodeField'
import Snackbar from '@/components/Snackbar'
import UserAccess from '@/components/UserAccess'

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
    CodeField,
    Snackbar,
    UserAccess,
  },
  data() {
    return {
      code: '',
      loading: false,
      snack: false,
      snackColor: null,
      snackMessage: null,
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
  watch: {
    async code(code) {

      if (code) {

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
          if (status === 401) {
            this.snackMessage = this.errorMessage
          } else {
            const { data } = e.response
            this.snackMessage = data.error
          }
          this.loading = false
        }
      }
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
}
</script>
