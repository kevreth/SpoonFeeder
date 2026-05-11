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

  constructor(apiKey: string | null = null, enabled: boolean = true, model: string = '') {
    this.apiKey = apiKey
    this.enabled = enabled
    this.model = model
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

export async function getSpoonyData(): Promise<SpoonyData> {
  const [apiKey, enabled, model] = await Promise.all([
    SPOONY_API_KEY.get(),
    SPOONY_ENABLED.get(),
    SPOONY_MODEL.get(),
  ])
  return new SpoonyData(apiKey, enabled, model)
}
