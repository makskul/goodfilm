<script setup lang="ts">
  import { ref } from 'vue'
  import { useApi } from '@/composables/useApi'
  const props = defineProps(['id'])

  const dates = ref()
  const selectedDate = ref()
  const places = ref()
  const isOpen = ref(false)
  const saveData = ref({
    date: '', time: '', row: '', place: ''
  })
  const bookResponse = ref()
  const booked = ref(false)

  async function toggleDropdown () {
    if (dates.value) {
      isOpen.value = true
      return;
    }
    const { data } = await useApi(`/movieShows?movie_id=${props.id}`)
    dates.value = data
    isOpen.value = true
  }

  async function selectDate (date: string, time:string) {
    saveData.value.date = date
    saveData.value.time = time
    selectedDate.value = `Places for ${date} - ${time}`
    isOpen.value = false

    const { data } = await useApi(`/showPlaces?movie_id=${props.id}&daytime=${time}&showdate=${date}`)
    places.value = data
  }

  async function bookPlace(placeRow: string, placeNum: string) {
    saveData.value.place = placeNum
    saveData.value.row = placeRow
    const { data } = await useApi('/bookPlace', {
      method: 'POST',
      body: JSON.stringify({
        movie_id: props.id,
        row: saveData.value.row,
        seat: saveData.value.place,
        showdate: saveData.value.date,
        daytime: saveData.value.time
      }),
    })
    bookResponse.value = data
    places.value = null
    booked.value = true
  }
</script>
<template>
  <div class="mt-4 relative text-left">
    <div>
      <button @click="toggleDropdown" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
        {{ selectedDate || 'Select Date' }}
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02l3.72 3.8 3.72-3.8a.75.75 0 011.08 1.04l-4.25 4.35a.75.75 0 01-1.08 0l-4.25-4.35a.75.75 0 01-.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div v-if="isOpen" class="origin-top-right right-0 mt-2 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
      <div v-if="dates.value" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div v-for="date in dates.value[props.id]" :key="date" class="block px-4 py-2 text-sm text-gray-700" role="menuitem">
          <span class="font-black">{{ date.showdate }}</span><br/>
          <button class="mx-1.5 my-1.5 cursor-pointer bg-sky-500 hover:bg-sky-700 px-3 py-2 text-sm leading-5 rounded-full font-semibold text-white h-10 ml-2" @click="selectDate(date.showdate, time)" v-for="time in date.daytime.split(';')">Check places {{ time }}</button>
        </div>
      </div>
    </div>
    <div v-if="places && !booked">
      <div v-for="d in places.value">
        <div v-if="Array.isArray(d)">
          <span class="font-black">Row - {{ d[0].row }}</span><br/>
          <template v-for="place in d[1]">
            <button class="mx-1.5 my-1.5 cursor-pointer bg-sky-500 hover:bg-sky-700 px-3 py-2 text-sm leading-5 rounded-full font-semibold text-white h-10 ml-2"
                v-if="place.is_free" @click="bookPlace(d[0].row, place.seat)"
            >
              Book places {{ place.seat }}
            </button>
          </template>
        </div>
      </div>
    </div>
    <div v-if="bookResponse && bookResponse.value.ticketkey">
      You have the book places for this film on {{ saveData.date }} - {{ saveData.time }}, Row {{ saveData.row }} place {{ saveData.place }}
    </div>
  </div>
</template>