import { ref } from 'vue';

const getSummary = () => {
  const question = ref('NUMBER OF QUESTIONS:')
  const correct = ref('NUMBER CORRECT:')
  const pctCorrect = ref('PERCENT CORRECT:')

  return { question, correct, pctCorrect }
} 

export default getSummary