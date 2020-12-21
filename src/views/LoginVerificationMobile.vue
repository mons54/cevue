<template>
  <UserAccess>
    <template v-slot:title>Vérification de sécurité</template>
    <template>
      <v-form
        autocomplete="off"
        class="mt-12">
        <v-label>Code de vérification par téléphone</v-label>
        <CodeField/>
      </v-form>
      <v-btn
        @click="sendCode"
        type="button"
        :disabled="disabled"
        class="ml-auto"
        width="100%">
        Envoyer le code
        <span
          v-if="second > 0"
          class="ml-1">
          ({{ second }})
        </span>
      </v-btn>
    </template>
  </UserAccess>
</template>

<script>
import { sendLogin } from '@/api/verification'
import CodeField from '@/components/CodeField'
import UserAccess from '@/components/UserAccess'

export default {
  data() {
    return {
      expire: null,
    }
  },
  components: {
    CodeField,
    UserAccess,
  },
  computed: {
    disabled() {
      return this.expire > 1
    },
    second() {
      return Math.floor(this.expire / 1000)
    }
  },
  methods: {
    sendCode() {
      console.log('sendCode')
    }
  },
  async created() {

    try {
      const { data } = await sendLogin()
      this.expire = data.expire
    } catch(e) {
      console.error(e)
    }

    setInterval(() => {
      if (this.expire)
        this.expire -= 1000
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
</style>
