<template>
  <div
    :class="['input__block', 'multi__select', {'full': full}, {'error': errors.has(name) || message !== null }]"
  >
    <label v-if="label">{{label}}</label>
    <input class="input__text hidden" @keyup="input()" type="text" :name="name" v-model="local">
    <div>
      <template v-if="values && values.length">
        <multi-list-select
          :list="values"
          option-value="text"
          option-text="text"
          id="MultiSelect"
          class="multi__select"
          :name="name"
          :selected-items="items"
          placeholder="Search technologies"
          @select="onSelect"
        ></multi-list-select>
        <small>{{helpText}}</small>
      </template>
      <div v-show="message !== null" class="error">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { MultiSelect, MultiListSelect } from "vue-search-select";

export default {
  components: {
    MultiSelect,
    MultiListSelect
  },
  props: {
    name: {
      type: String,
      value: null
    },
    optionValue: {
      type: String,
      value: null
    },
    optionText: {
      type: String,
      value: null
    },
    placeholderText: {
      type: String,
      value: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    full: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: () => {
        return [];
      }
    },
    message: {
      type: String,
      default: null
    },
    helpText: {
      type: String,
      default: null
    }
  },
  data() {
    let local = this.value;

    return {
      local,
      items: [],
      lastSelectItem: {}
    };
  },
  mounted() {
    // console.log(this.values);
  },
  methods: {
    input() {
      // console.log(this.local);
      this.$emit("input", this.local);
    },
    onSelect(items, lastSelectItem) {
      this.items = items;
      this.lastSelectItem = lastSelectItem;
    },
    reset() {
      this.items = []; // reset
    }
  },
  watch: {
    local(val) {
      this.input();
    },
    value: {
      handler(val) {
        this.local = val;
      },
      deep: true,
      immediate: true
    },
    items: {
      handler(val) {
        this.local = this.items;
        this.input();
      },
      deep: true,
      immediate: true
    }
  },
  $_veeValidate: {
    // value getter
    value() {
      return this.$el.value;
    },
    // name getter
    name() {
      return this.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
