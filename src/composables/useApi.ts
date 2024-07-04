import { ref, watchEffect, toValue } from 'vue'

export function useApi(url: string, params = {}) {
  const baseUrl = ref<string>('https://cinema-api-test.y-media.io/v1')

  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null

    fetch(toValue(`${baseUrl.value}${url}`), params)
      .then((res) => res.json())
      .then((json) => (data.value = json.data))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}