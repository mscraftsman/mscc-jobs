<template>
  <div
    :class="['input__block', {'full': full}, {'error': errors.has(name) }, {'error': message !== null }]"
  >
    <label v-if="label">{{label}}</label>
    <textarea
      class="input__textarea"
      rows="5"
      v-validate="'required'"
      @keyup="input()"
      type="text"
      :name="name"
      v-model="local"
    ></textarea>
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
      console.log(this.local);
      this.$emit("input", this.local);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
