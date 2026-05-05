import type { SpoonyMessage } from './spoony.types'

export interface SpoonyContext {
  courseName: string
  unitName: string
  lessonName: string
  slideText: string
}

export interface SendMessageParams {
  apiKey: string
  model: string
  context: SpoonyContext
  history: SpoonyMessage[]
  userMessage: string
}

export enum SpoonyErrorType {
  INVALID_KEY = 'invalid_key',
  RATE_LIMITED = 'rate_limited',
  NETWORK_ERROR = 'network_error',
  UNAVAILABLE = 'unavailable',
}

export type SpoonyApiResult =
  | { success: true; content: string }
  | { success: false; error: SpoonyErrorType }

import systemPromptTemplate from './systemPrompt.md?raw'

const MAX_USER_MESSAGE_LENGTH = 500

export function buildSystemPrompt(context: SpoonyContext): string {
  return systemPromptTemplate
    .replace(/{{courseName}}/g, context.courseName)
    .replace(/{{unitName}}/g, context.unitName)
    .replace(/{{lessonName}}/g, context.lessonName)
    .replace(/{{slideText}}/g, context.slideText)
}

export async function sendMessage(
  params: SendMessageParams
): Promise<SpoonyApiResult> {
  const userMessage =
    params.userMessage.length > MAX_USER_MESSAGE_LENGTH
      ? params.userMessage.slice(0, MAX_USER_MESSAGE_LENGTH)
      : params.userMessage

  const messages = [
    { role: 'system', content: buildSystemPrompt(params.context) },
    ...params.history.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  let response: Response
  try {
    response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: params.model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, error: SpoonyErrorType.UNAVAILABLE }
    }
    return { success: false, error: SpoonyErrorType.NETWORK_ERROR }
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    if (response.status === 401) {
      return { success: false, error: SpoonyErrorType.INVALID_KEY }
    }
    if (response.status === 429) {
      return { success: false, error: SpoonyErrorType.RATE_LIMITED }
    }
    return { success: false, error: SpoonyErrorType.UNAVAILABLE }
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[]
  }
  return { success: true, content: data.choices[0].message.content }
}
