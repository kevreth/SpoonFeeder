export interface SpoonyMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface SpoonyModel {
  id: string
  label: string
}

export const SPOONY_MODELS: SpoonyModel[] = [
  { id: 'openai',  label: 'OpenAI (default)' },
  { id: 'mistral', label: 'Mistral' },
  { id: 'llama',   label: 'Llama' },
]

export const SPOONY_DEFAULT_MODEL = 'openai'
