<template>
  <div style="position:relative">
    <input :id="id" type="radio" v-model="model" :value="label" @change="check">
    <label :for="id"></label>
    <div class="radio-button" :class="[size,{'radio-button-selected':isSelected},{'radio-button-disabled':isDisabled}]">
      <div class="selector" :class="{'selector-selected':isSelected}">
        <transition name="fade">
          <img src="./selected.png" v-if="isSelected"/>
        </transition>
      </div>
      <span>
    <slot></slot>
    </span>
    </div>
    <div class="cover" v-if="isDisabled">
    </div>
  </div>
</template>

<script>
  import Dispatch from "../../../utils/Dispatch"
  import UUIDUtil from "../../../utils/UUIDUtil"

  export default {
    name: "RadioButton",
    mixins: [Dispatch],
    data() {
      return {
        id: 0,
        model: this.value
      }
    },
    inject: {
      RadioButtonGroup: {
        default: ""
      }
    },
    props: {
      size: {
        type: String,
        default: "medium"
      },
      disabled: {
        type: String,
        default: "false"
      },
      label: [String, Number, Boolean],
      value: Boolean,
    },
    methods: {
      check: function (e) {
        this.model=true;
        this.$emit("input",true)
        this.$emit("change",true)
        if (this.RadioButtonGroup)
          this.dispatch('radio-button-group', 'handleChange', [this.label]);
      },
    },
    computed: {
      isSelected() {
        if (this.RadioButtonGroup) {
          if (this.RadioButtonGroup.label == this.label) return true;
          return false;
        } else return this.model;
      },
      isDisabled() {
        if (this.disabled == 'false') return false;
        else return true;
      },
    },
    created() {
      this.id = UUIDUtil.guid();
    }
  }
</script>

<style scoped>
  .cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    cursor: not-allowed;
    z-index: 2;
  }

  label {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    cursor: pointer;
  }

  input {
    display: none;
  }

  .radio-button {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    color: #444444;
    box-sizing: border-box;
    /*border: 1px solid #d6d6d6;*/
    border: 1px solid transparent;
    transition: .3s all;
    border-radius: 4px;
  }

  .radio-button:hover {
    border: 1px solid #409eff;
    color: #409eff;
  }

  .radio-button-disabled {
    color: #aaaaaa;
  }

  .radio-button-selected {
    border: 1px solid #409eff;
    color: #409eff;
  }

  .selector {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d6d6d6;
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
    border-radius: 1000px;
    box-sizing: border-box;
    background: white;
    margin: 0 10px 0 0;
    transition: .3s all;
  }

  .selector:hover {
    border: 2px solid #409eff;
  }

  .selector img {
    width: 100%;
    height: 100%;
  }

  .selector-selected {
    border: 0;
  }

  .text-selected {
    color: #409eff;
  }

  .mini {
    padding: 6px;
    font-size: 10px;
  }

  .small {
    padding: 8px;
    font-size: 12px;
  }

  .medium {
    padding: 10px;
    font-size: 14px;
  }

  .big {
    padding: 12px;
    font-size: 15px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
