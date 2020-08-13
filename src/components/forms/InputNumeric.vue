<template>
  <div :class="['input__block', {'full': full}, {'error': errors.has(name) || message !== null }]">
    <label v-if="label">{{label}}</label>
    <input class="input__text" @keyup="input()" type="number" :name="name" v-model="local">
    <div>
      <div v-show="message !== null" class="error">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
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
    message: {
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
  methods: {
    input() {
      // console.log(this.local);
      this.$emit("input", this.local);
    }
  },
  watch: {
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
</style>
