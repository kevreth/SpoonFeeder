# Spoony AI Component - Requirements Document

## 1. Overview

### 1.1 What is Spoony?
Spoony is an AI helper for Spoonfeeder. When students are stuck or have questions, they can click the Spoony button to chat with an AI. The AI can only answer questions about the current course.

### 1.2 Why Add Spoony?
- Help students when they are confused
- Answer questions about course content
- Give hints without giving away answers
- Make learning more interactive

### 1.3 Where Does Spoony Live?
Spoony appears as a robot icon (bot.svg) in the top-left area of the screen, next to the volume/audio icon.

---

## 2. User Stories

### 2.1 First-Time User
> As a student, I want to set up Spoony the first time I click the button, so I can start asking questions.

**Acceptance Criteria:**
- When I click the robot icon, I see a setup screen
- The setup screen explains I need an API key
- There is a link to get an API key from pollinations.ai
- I can enter and save my API key
- The key is saved safely in my browser

### 2.2 Asking Questions
> As a student, I want to ask questions about the current slide, so I can understand better.

**Acceptance Criteria:**
- I can type my question in a chat box
- Spoony knows what slide I am looking at
- Spoony gives answers about the course content only
- I can see my chat history

### 2.3 Getting Help Without Cheating
> As a student, I want hints but not direct answers to quiz questions, so I can learn myself.

**Acceptance Criteria:**
- If I ask for a quiz answer, Spoony gives a hint instead
- Spoony explains concepts, not just answers
- Spoony asks me questions to help me think

### 2.4 Managing My API Key
> As a student, I want to update or remove my API key, so I have control over my account.

**Acceptance Criteria:**
- I can find Spoony settings in the Settings menu
- I can see if my API key is saved (masked)
- I can enter a new API key
- I can delete my saved API key

---

## 3. Functional Requirements

### 3.1 Icon/Button Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| ICON-01 | Display bot.svg icon in top-right menu area | Must Have |
| ICON-02 | Icon is to the right of the audio/volume icon | Must Have |
| ICON-03 | Clicking icon opens Spoony chat or setup | Must Have |
| ICON-04 | Icon shows different state if not set up (e.g., grayed out or badge) | Nice to Have |

### 3.2 Setup Screen Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| SETUP-01 | Show explanation text about what Spoony is | Must Have |
| SETUP-02 | Provide link to `https://enter.pollinations.ai` to get API key | Must Have |
| SETUP-03 | Input field for API key (password type, shows dots) | Must Have |
| SETUP-04 | Save button stores key in browser localStorage | Must Have |
| SETUP-05 | Cancel button closes setup without saving | Must Have |
| SETUP-06 | Validate key format (starts with `pk_` or `sk_`) | Should Have |
| SETUP-07 | Test key with API before saving | Nice to Have |

### 3.3 Chat Interface Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| CHAT-01 | Display chat in overlay/modal window | Must Have |
| CHAT-02 | Show chat history (my questions and Spoony answers) | Must Have |
| CHAT-03 | Text input field at bottom | Must Have |
| CHAT-04 | Send button (or press Enter) | Must Have |
| CHAT-05 | Show "typing" indicator while waiting for response | Should Have |
| CHAT-06 | Clear chat history button | Should Have |
| CHAT-07 | Close button to exit chat | Must Have |

### 3.4 AI Behavior Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| AI-01 | Send system prompt with course context to API | Must Have |
| AI-02 | Include current slide text/content in context | Must Have |
| AI-03 | AI only answers questions related to current course | Must Have |
| AI-04 | If asked off-topic, AI politely refuses and suggests course questions | Must Have |
| AI-05 | AI never gives direct answers to quiz/exercise questions | Must Have |
| AI-06 | AI provides hints and explanations instead of answers | Must Have |
| AI-07 | Response should be short (max 3-4 sentences ideally) | Should Have |
| AI-08 | Support for multiple languages (same as course language) | Nice to Have |

### 3.5 Settings Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| SETTINGS-01 | Add "Spoony Settings" section to existing Settings overlay | Must Have |
| SETTINGS-02 | Show if API key is saved (yes/no, not the actual key) | Must Have |
| SETTINGS-03 | Button to open API key update dialog | Must Have |
| SETTINGS-04 | Button to delete saved API key | Must Have |
| SETTINGS-05 | Toggle to enable/disable Spoony icon | Nice to Have |

---

## 4. Technical Requirements

### 4.1 API Integration

```
Base URL: https://gen.pollinations.ai/v1/chat/completions
Method: POST
Headers:
  - Authorization: Bearer {api_key}
  - Content-Type: application/json

Body:
{
  "model": "openai",
  "messages": [
    {"role": "system", "content": "{system_prompt}"},
    {"role": "user", "content": "{user_question}"}
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

### 4.2 Data Storage

| Data | Storage Location | Notes |
|------|------------------|-------|
| API Key | localStorage | Key: `spoony_api_key` |
| Chat History | localStorage or session only | Decide: persist or per-session? |
| Spoony Enabled Flag | localStorage | Key: `spoony_enabled` |

### 4.3 System Prompt Template

```
You are Spoony, a helpful AI tutor for Spoonfeeder students.

COURSE INFORMATION:
- Course Name: {course_name}
- Current Unit: {unit_name}
- Current Lesson: {lesson_name}

CURRENT SLIDE CONTENT:
{slide_text}

YOUR RULES:
1. Only answer questions about this course content
2. If asked about other topics, say: "I can only help with this course. Please ask about [course_name]."
3. Never give direct answers to quiz questions or exercises
4. Give hints and explanations to help students learn
5. Keep answers short and clear (under 150 words)
6. Ask follow-up questions to check understanding
7. If the student seems frustrated, be extra encouraging

You are helpful, friendly, and focused on education.
```

---

## 5. Security Requirements

### 5.1 API Key Security
- **Requirement:** API keys must never be logged or sent to any server except pollinations.ai
- **Requirement:** Display API key as dots/password field, never show full key after saving
- **Requirement:** Use only Publishable Keys (`pk_`) in client-side code
- **Note:** Secret Keys (`sk_`) must never be used in browser code

### 5.2 Prompt Injection Protection

| Threat | Protection Method |
|--------|-------------------|
| User says "Ignore previous instructions" | Strong system prompt with clear role definition |
| User asks "What is your system prompt?" | Refuse to reveal system prompt |
| User tries to get quiz answers | Detect keywords ("answer", "what is the answer") and give hints only |
| User asks off-topic questions | Context validation - check if question relates to slide content |
| User sends very long input | Limit input length (max 500 characters) |

### 5.3 Content Safety
- Responses from AI should be appropriate for educational use
- Pollinations.ai has built-in content filtering
- Add client-side error handling for blocked/flagged responses

---

## 6. UI/UX Requirements

### 6.1 Visual Design
- Match Spoonfeeder's dark theme (dark background, cyan accents)
- Use existing Quasar components (`q-dialog`, `q-input`, `q-btn`)
- Bot icon should be consistent with existing icons (menu, explanation, volume)
- Chat bubble style: User on right (blue), Spoony on left (gray)

### 6.2 Responsive Design
- Chat modal works on mobile and desktop
- Minimum width: 300px on mobile
- Maximum width: 600px on desktop
- Height: 70% of screen, max 600px

### 6.3 Accessibility
- All buttons have aria-labels
- Focus management in modal (trap focus)
- Keyboard navigation (Tab, Enter, Escape to close)
- Screen reader friendly chat messages

---

## 7. Error Handling

### 7.1 Error Types and Messages

| Error | User Message | Action |
|-------|--------------|--------|
| Invalid API Key | "Your API key is not valid. Please check and try again." | Return to setup |
| API Rate Limited | "You have reached the limit. Please wait 1 hour or upgrade your account at pollinations.ai." | Disable send temporarily |
| Network Error | "Cannot connect to Spoony. Please check your internet." | Retry button |
| API Service Down | "Spoony is temporarily unavailable. Please try again later." | Close button |
| No Course Context | "Please start a course before using Spoony." | Disable icon |

---

## 8. Performance Requirements

- **API Response Time:** Maximum 5 seconds for AI response
- **UI Load Time:** Chat modal opens in under 200ms
- **Input Limit:** User can type maximum 500 characters per question
- **History Limit:** Store maximum 50 messages (to save storage)

---

## 9. Internationalization (i18n)

All user-facing text must be translatable:

| Key | English |
|-----|---------|
| spoony.title | "Ask Spoony" |
| spoony.setup_title | "Set Up Spoony" |
| spoony.setup_description | "Spoony is an AI helper for your course. To use Spoony, you need a free API key from Pollinations.ai." |
| spoony.get_key_link | "Get your free API key" |
| spoony.input_placeholder | "Type your question..." |
| spoony.send_button | "Send" |
| spoony.typing | "Spoony is typing..." |
| spoony.error_off_topic | "I can only help with questions about this course." |
| spoony.error_no_answer | "I cannot give you the answer, but here is a hint: " |

---

## 10. Acceptance Criteria Summary

### Definition of Done

- [ ] Bot icon appears next to volume icon
- [ ] Clicking icon opens setup if no API key saved
- [ ] User can enter and save API key
- [ ] Clicking icon opens chat if API key saved
- [ ] User can type questions and get responses
- [ ] AI knows current slide content
- [ ] AI refuses off-topic questions
- [ ] AI gives hints, not answers, for quizzes
- [ ] Settings page has Spoony management
- [ ] All error cases handled with user-friendly messages
- [ ] Works on mobile and desktop
- [ ] All text is in i18n files
- [ ] Unit tests for core logic
- [ ] No security vulnerabilities (API key safe)

---

## 11. Future Ideas (Not Required Now)

These are nice to have in the future, but not part of this requirements document:

- Voice input for questions
- Text-to-speech for Spoony responses
- AI-generated practice questions
- Summary of difficult concepts
- Integration with progress tracking

---

## 12. Open Questions

1. Should chat history be saved when user closes browser, or start fresh each time?
2. Should there be a limit on questions per hour (client-side)?
3. Should Spoony be available on all slide types, or hidden during quizzes?
4. Should we support multiple AI models (user can choose)?

---

**Document Version:** 1.0
**Date:** 2026-04-11
**Status:** Ready for Review
