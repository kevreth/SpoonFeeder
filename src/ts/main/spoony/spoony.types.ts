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
  { id: 'openai',       label: 'OpenAI (default)' },
  { id: 'openai-large', label: 'OpenAI Large' },
  { id: 'mistral',      label: 'Mistral' },
  { id: 'claude-fast',  label: 'Claude Fast' },
]

export const SPOONY_DEFAULT_MODEL = 'openai'
