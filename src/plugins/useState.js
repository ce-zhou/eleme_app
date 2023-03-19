import { useStore,mapState } from "vuex";
import { computed } from "vue";

export default function useState(mapper) {
    const store = useStore()
    const storeStsteFns = mapState(mapper)
    let storeState = {};
    Object.keys(storeStsteFns).forEach(item=> {
        const fn = storeStsteFns[item].bind({$store: store})
        storeState[item] = computed(fn)
    })
    return storeState
}