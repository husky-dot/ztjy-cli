import { InjectionKey } from 'vue'
import { store as adminStore } from '@ztjy/antd-vue-admin'
import { RootState as AdminRootState } from '@ztjy/antd-vue-admin/es/store'
import { Store, createStore, useStore as baseUseStore } from 'vuex'

export interface RootState extends AdminRootState {}

export const key: InjectionKey<Store<RootState>> = adminStore.key

export function useStore() {
  return baseUseStore(key)
}

const store = createStore<RootState>({
  modules: {
    ...adminStore.modules,
  },
})
console.log('adminStore', adminStore)
export default store
