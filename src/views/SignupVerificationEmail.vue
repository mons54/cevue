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
import { sendRegister } from '@/api/verification'
import Snackbar from '@/components/Snackbar'

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      snack: false,
      snackColor: null,
      snackMessage: null,
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

  }
}
</script>
