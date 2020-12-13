<template>
  <RegisterVerification
    type="mobile"
    :field="this.$route.query.mobile"
    :title="$t('pages.registerVerificationMobile.title')"
    :label="$t('pages.registerVerificationMobile.label')"
    :sentMessage="$t('pages.registerVerificationMobile.sentSuccess')"
    :errorMessage="$t('pages.registerVerificationMobile.error')"
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
