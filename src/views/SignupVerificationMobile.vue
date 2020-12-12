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
  </div>
</template>

<script>
import { sendRegister } from '@/api/verification'

export default {
  created() {
    const { mobile } = this.$route.query
    if (!mobile) {
      this.$router.push({ name: 'home' })
      return
    }
    sendRegister({
      mobile,
    })
  }
}
</script>
