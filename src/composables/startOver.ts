import { ref } from 'vue'

const getStartOver = () => {
  const clear = ref(localStorage.clear());
  const reload = ref(location.reload());

  return { clear, reload };
}
export default getStartOver;