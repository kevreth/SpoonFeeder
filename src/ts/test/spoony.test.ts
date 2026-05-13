import { describe, expect, it } from 'vitest'
import { buildSystemPrompt } from '../main/spoony/spoonyApi'
import { SPOONY_DEFAULT_MODEL, SPOONY_MODELS } from '../main/spoony/spoony.types'
import { SPOONY_API_KEY } from '../main/spoony/spoonyStorage'
import { SpoonyData } from '../../vue/composables/spoonyData'

describe('buildSystemPrompt', () => {
  it('includes course name in prompt', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Algebra 1',
      unitName: 'Unit 1',
      lessonName: 'Lesson 1',
      moduleName: 'Module 1',
      slideText: 'This is slide content',
      infoSlides: [],
    })
    expect(prompt).toContain('Algebra 1')
  })
  it('includes slide text in prompt', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Test',
      unitName: '',
      lessonName: '',
      moduleName: '',
      slideText: 'unique slide content here',
      infoSlides: [],
    })
    expect(prompt).toContain('unique slide content here')
  })
  it('includes all rules', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Test',
      unitName: '',
      lessonName: '',
      moduleName: '',
      slideText: '',
      infoSlides: [],
    })
    expect(prompt).toContain('Never give direct answers')
    expect(prompt).toContain('Only answer questions about this course')
  })
  it('includes module name in prompt', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Test',
      unitName: '',
      lessonName: '',
      moduleName: 'Algebra Basics',
      slideText: '',
      infoSlides: [],
    })
    expect(prompt).toContain('Algebra Basics')
  })
  it('includes info slides background when present', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Test',
      unitName: '',
      lessonName: '',
      moduleName: '',
      slideText: '',
      infoSlides: ['First info slide', 'Second info slide'],
    })
    expect(prompt).toContain('Course Background (from info slides):')
    expect(prompt).toContain('- First info slide')
    expect(prompt).toContain('- Second info slide')
  })
  it('omits background section when no info slides', () => {
    const prompt = buildSystemPrompt({
      courseName: 'Test',
      unitName: '',
      lessonName: '',
      moduleName: '',
      slideText: '',
      infoSlides: [],
    })
    expect(prompt).not.toContain('Course Background')
  })
})

describe('SPOONY_MODELS', () => {
  it('has at least one model', () => {
    expect(SPOONY_MODELS.length).toBeGreaterThan(0)
  })
  it('default model exists in model list', () => {
    const ids = SPOONY_MODELS.map((m) => m.id)
    expect(ids).toContain(SPOONY_DEFAULT_MODEL)
  })
  it('each model has id and label', () => {
    SPOONY_MODELS.forEach((m) => {
      expect(m.id).toBeTruthy()
      expect(m.label).toBeTruthy()
    })
  })
})

describe('SpoonyData', () => {
  it('isConfigured returns false when no key', () => {
    SPOONY_API_KEY.remove()
    const fresh = new SpoonyData()
    expect(fresh.isConfigured()).toBe(false)
  })
  it('messages starts empty', () => {
    const data = new SpoonyData()
    expect(data.messages).toHaveLength(0)
  })
  it('addMessage adds to messages array', () => {
    const data = new SpoonyData()
    data.addMessage({ role: 'user', content: 'hello', timestamp: Date.now() })
    expect(data.messages).toHaveLength(1)
  })
  it('clearMessages empties the array', () => {
    const data = new SpoonyData()
    data.addMessage({ role: 'user', content: 'hello', timestamp: Date.now() })
    data.clearMessages()
    expect(data.messages).toHaveLength(0)
  })
})
