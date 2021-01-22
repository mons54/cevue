<template>
  <v-app :style="styleApp">
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
import { mapMutations } from 'vuex'
import { getMe } from '@/api/user'
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
    styleApp() {
      return this.isMobileNav ? { paddingBottom: '56px' } : null
    },
  },
  methods: {
    ...mapMutations('user', [
      'setUser',
    ]),
  },
  async created() {
    getMe().then(({ data }) => {
      this.setUser(data)
    })
  }
}
</script>
