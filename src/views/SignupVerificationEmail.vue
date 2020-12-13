<template>
  <div class="signup-verification">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          offset-md="3"
          offset-lg="4">
          <h1>{{ $t('pages.signupVerification.title') }}</h1>
          <v-form
            ref="form"
            autocomplete="off"
            class="mt-12">
            <v-label>{{ $t('pages.signupVerification.labelCode') }}</v-label>
            <div class="d-flex">
              <IntegerField
                v-for="n in 6"
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

    const { email } = this.$route.query

    if (!email) {
      this.$router.push({ name: 'home' })
      return
    }

    try {
      await sendRegister({
        email,
      })
      this.snack = true
      this.snackColor = 'success'
      this.snackMessage = this.$t('pages.signupVerification.sentSuccess')
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
      if (code.length === 6) {
        this.loading = true
        const { email } = this.$route.query
        try {
          const { data } = await register({
            email,
            code,
          })
          this.setJwt(data.jwt)
          this.setUser(data.user)
          this.$router.push({ name: 'home' })
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
}
</script>
