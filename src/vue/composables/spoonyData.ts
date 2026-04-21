import type { SpoonyMessage } from '../../ts/main/spoony/spoony.types'
import {
  SPOONY_API_KEY,
  SPOONY_ENABLED,
  SPOONY_MODEL,
} from '../../ts/main/spoony/spoonyStorage'

export class SpoonyData {
  public apiKey: string | null
  public enabled: boolean
  public model: string
  public messages: SpoonyMessage[]

  constructor() {
    this.apiKey = SPOONY_API_KEY.get()
    this.enabled = SPOONY_ENABLED.get()
    this.model = SPOONY_MODEL.get()
    this.messages = []
  }

  public isConfigured(): boolean {
    return this.apiKey !== null && this.apiKey.length > 0
  }

  public clearMessages(): void {
    this.messages = []
  }

  public addMessage(msg: SpoonyMessage): void {
    this.messages.push(msg)
  }
}

export function getSpoonyData(): SpoonyData {
  return new SpoonyData()
}
