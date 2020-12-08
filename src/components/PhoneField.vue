<template>
  <v-row>
    <v-col cols="4">
      <v-autocomplete
        v-model="countryModel"
        :items="items"
        item-text="code"
        item-value="id"
        :filter="search">
        <template v-slot:item="{ item }">
          <div class="item">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="code">
              {{ item.code }}
            </div>
          </div>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="8">
      <v-text-field
        v-model="phone"
        type="number"
        pattern="[0-9]+"
        :rules="[
          v => validateRequired(v) || $t('formRules.phone.required'),
          v => validatePhone(v) || $t('formRules.phone.invalid'),
        ]"
        :label="$t('mobile')"
        required
        class="input-phone"/>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  validatePhone,
  validateRequired
} from '@/services/formValidator'

export default {
  props: {
    value: String,
  },
  data() {
    return {
      country: null,
      phone: null,
      searchInput: '',
    }
  },
  computed: {
    ...mapState({
      countries: state => state.country.countries
    }),
    ...mapGetters('country', [
      'userCountry',
    ]),
    countryModel: {
      get() {
        if (!this.country && this.userCountry)
          return this.userCountry.id
        return this.country
      },
      set(country) {
        this.country = country
      }
    },
    items () {
      return this.countries.map(country => {
        const code = `+${country.phone}`
        return {
          code,
          ...country,
        }
      })
    },
  },
  methods: {
    ...mapActions('country', [
      'getCountries',
    ]),
    validatePhone,
    validateRequired,
    search(value, query) {
      return value.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || value.code.indexOf(query) !== -1
    },
  },
  created() {
    this.getCountries()
  },
}
</script>

<style lang="scss">
.input-phone {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
}
</style>

<style lang="scss" scoped>
.item {
  display: flex;
  width: 308px;
  max-width: 100%;
  @media screen and (min-width: 600px) {
    max-width: 308px;
  }
  .name {
    flex: 1;
    overflow: hidden;
    height: 24px;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    white-space: nowrap;
  }
  .code {
    margin-left: auto;
  }
}
</style>
