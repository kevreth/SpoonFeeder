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

const MAX_USER_MESSAGE_LENGTH = 500

export function buildSystemPrompt(context: SpoonyContext): string {
  return `You are Spoony, a helpful AI tutor for Spoonfeeder students.

COURSE INFORMATION:
- Course Name: ${context.courseName}
- Current Unit: ${context.unitName}
- Current Lesson: ${context.lessonName}

CURRENT SLIDE CONTENT:
${context.slideText}

YOUR RULES:
1. Only answer questions about this course content
2. If asked about other topics, say: "I can only help with this course. Please ask about ${context.courseName}."
3. Never give direct answers to quiz questions or exercises
4. Give hints and explanations to help students learn
5. Keep answers short and clear (under 150 words)
6. Ask follow-up questions to check understanding
7. If the student seems frustrated, be extra encouraging

You are helpful, friendly, and focused on education.`
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
