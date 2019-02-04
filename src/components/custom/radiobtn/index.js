import RadioButtonGroup from './RadioButtonGroup'
import RadioButton from './RadioButton'

export default {
  install(Vue) {
    Vue.component('radio-button-group', RadioButtonGroup)
    Vue.component('radio-button', RadioButton)
  }
}
