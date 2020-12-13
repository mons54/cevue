<template>
  <RegisterVerification
    type="email"
    :field="this.$route.query.email"
    :title="$t('pages.registerVerificationEmail.title')"
    :label="$t('pages.registerVerificationEmail.label')"
    :sentMessage="$t('pages.registerVerificationEmail.sentSuccess')"
    :errorMessage="$t('pages.registerVerificationEmail.error')"
  />
</template>

<script>
import RegisterVerification from '@/components/RegisterVerification'

export default {
  components: {
    RegisterVerification,
  },
}
</script>
