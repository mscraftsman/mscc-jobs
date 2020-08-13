<template>
  <div
    :class="['input__block', {'full': full}, {'error': errors.has(name) }, {'error': message !== null }]"
  >
    <label v-if="label">{{label}}</label>
    <input class="input__text hidden" @keyup="input()" type="text" :name="name" v-model="local">
    <vue-editor
      @text-change="input()"
      @blur="input()"
      id="editor"
      v-model="local"
      :editorToolbar="customToolbar"
    ></vue-editor>
    <div>
      <div v-show="message !== null" class="error">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
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
      local,
      customToolbar: [
        ["bold", "italic", "underline"],
        ["link", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        [{ header: [1, 2, 3, false] }]
      ]
    };
  },
  methods: {
    input() {
      // console.log(this.local);
      this.$emit("input", this.local);
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
  },
  watch: {
    value: {
      handler(val) {
        this.local = val;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
