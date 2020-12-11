<template>
  <v-row>
    <v-col cols="4">
      <v-autocomplete
        v-model="countryIdModel"
        v-on:change="emit"
        :items="items"
        item-text="code"
        item-value="id"
        :filter="search"
        :rules="[v => validateRequired(v)]"
        required>
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
      <IntegerField
        v-model="numberModel"
        v-on:change.native="emit"
        :rules="[
          v => validateRequired(v) || $t('formRules.phone.required'),
          v => validatePhone(v) || $t('formRules.phone.invalid'),
        ]"
        :label="$t('mobile')"
        required
        class="input-phone"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import IntegerField from '@/components/IntegerField'
import {
  validatePhone,
  validateRequired
} from '@/services/formValidator'

export default {
  props: {
    value: {
      code: String,
      number: String,
    },
  },
  components: {
    IntegerField,
  },
  data() {
    return {
      countryId: null,
      number: null,
    }
  },
  computed: {
    ...mapState({
      countries: state => state.country.countries
    }),
    ...mapGetters('country', [
      'userCountry',
    ]),
    numberModel: {
      get() {
        let number = this.number
        if (!number && this.value.number)
          number = this.value.number
        return number
      },
      set(value) {
        this.number = value
      }
    },
    countryIdModel: {
      get() {
        let countryId = this.countryId
        if (!countryId) {
          let country
          if (this.value.code)
            country = this.items.find(item => item.code === this.value.code)
          else if (this.userCountry)
            country = this.userCountry
          if (country)
            countryId = country.id
        }
        return countryId
      },
      set(value) {
        this.countryId = value
      }
    },
    code() {
      const country = this.items.find(item => item.id === this.countryIdModel)
      if (country)
        return country.code
      return null
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
    emit() {
      this.$emit('input', {
        code: this.code,
        number: this.number
      })
    },
  },
  created() {
    this.getCountries()
  },
}
</script>

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
