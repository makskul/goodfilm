import { useApi } from './useApi'
import { ref } from 'vue'
import type { fetchParamsType } from '@/types'

export function useMovies () {
  const state = ref<any>(null)

  async function load (params: fetchParamsType | null)  {
    let str = ''
    let url = '/movies'

    if (params) {
      str = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&')
      url = `${url}?${str}`
    }

    const { data } = await useApi(url)
    state.value = data as any
  }
  load(null)

  return {
    state,
    load
  }
}