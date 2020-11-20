<template>
  <v-app>
    <NavBar
      v-if="showNav && $vuetify.breakpoint.smAndUp"/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    showNav() {
      return this.$route.name !== 'NotFound'
    }
  },
};
</script>
