import { WebStorageVariable } from '../dataaccess/persistence/webPersistence'
import { SPOONY_DEFAULT_MODEL } from './spoony.types'

const _apiKey = new WebStorageVariable('spoony_api_key', localStorage)
const _enabled = new WebStorageVariable('spoony_enabled', localStorage)
const _model = new WebStorageVariable('spoony_model', localStorage)

export const SPOONY_API_KEY = {
  get(): string | null {
    return _apiKey.get()
  },
  set(val: string) {
    _apiKey.set(val)
  },
  remove() {
    _apiKey.remove()
  },
}

export const SPOONY_ENABLED = {
  get(): boolean {
    const val = _enabled.get()
    if (val === null) return true
    return val === 'true'
  },
  set(val: boolean) {
    _enabled.set(String(val))
  },
  is(): boolean {
    return this.get()
  },
  remove() {
    _enabled.remove()
  },
}

export const SPOONY_MODEL = {
  get(): string {
    return _model.get() ?? SPOONY_DEFAULT_MODEL
  },
  set(val: string) {
    _model.set(val)
  },
  remove() {
    _model.remove()
  },
}
