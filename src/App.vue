<template>
  <v-app :style="isMobileNav ? 'padding-bottom: 56px' : null">
    <AppBar
      v-if="showNav"/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <BottomNav
      v-if="isMobileNav"/>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import BottomNav from '@/components/BottomNav'

export default {
  name: 'App',
  components: {
    AppBar,
    BottomNav,
  },
  computed: {
    showNav() {
      return this.$route.name !== 'NotFound'
    },
    isMobileNav() {
      return this.showNav && this.$vuetify.breakpoint.smAndDown
    },
  },
}
</script>
