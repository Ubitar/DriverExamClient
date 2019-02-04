import DivFlexRow from './DivFlexRow'
import DivFlexColumn from './DivFlexColumn'

export default {
  install(Vue) {
    Vue.component('div-flex-row', DivFlexRow)
    Vue.component('div-flex-column', DivFlexColumn)
  }
}
