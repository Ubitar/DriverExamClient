import CheckBox from './Checkbox'
import CheckboxGroup from './CheckboxGroup'

export default {
  install(Vue) {
    Vue.component('check-box', CheckBox)
    Vue.component('check-box-group', CheckboxGroup)
  }
}
