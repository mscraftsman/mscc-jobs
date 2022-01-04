<template>
  <div
    :class="[
      'input__block',
      { full: full },
      { error: errors.has(name) || message !== null }
    ]"
  >
    <label v-if="label">{{ label }}</label>
    <input
      class="input__text hidden"
      @keyup="input()"
      type="text"
      :name="name"
      v-model="local"
    />
    <div>
      <template v-if="values && values.length">
        <model-list-select
          :list="values"
          v-model="local"
          :option-value="optionValue"
          :option-text="optionText"
          :placeholder="placeholderText"
        />
        <small>{{ helpText }}</small>
      </template>
      <div v-show="message !== null" class="error">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { ModelListSelect } from "vue-search-select";

export default {
  components: {
    ModelListSelect
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
      type: String,
      default: null
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
      local
    };
  },
  mounted() {
    // console.log(this.values);
  },
  methods: {
    input() {
      // console.log(this.local);
      this.$emit("input", this.local);
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
