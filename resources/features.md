# Spoonfeeder UX Enhancement Requirements

This document outlines high-level feature weaknesses from a user's perspective, identified through codebase analysis. These are not bugs or technical debt items, but opportunities to maximize user experience and engagement.

---

## 1. Onboarding & Tutorial System

**Current State**: First-time users are dropped directly into course content with no explanation of how the app works or how to use different exercise types.

**User Impact**: Users may not understand how to interact with drag-and-drop (sort), image maps (imap), or gap-fill exercises without trial and error.

**Requirements**:
- Add an interactive tutorial overlay for first-time users
- Demonstrate each exercise type (sort, imap, gap-fill, ma, mc, select)
- Include a "How to Use" option accessible from the menu
- Allow users to replay the tutorial at any time

---

## 2. Enhanced Gamification System

**Current State**: Despite claims of "recent advances in gamification," the system only offers basic audio feedback and a single award icon for 100% completion.

**Requirements**:
- **XP Points**: Award points for correct answers, completing lessons, and maintaining streaks
- **Streak Tracking**: Consecutive days studied with visual calendar display
- **Achievement Badges**: For milestones such as:
  - First course completed
  - Perfect score on an exercise
  - Speed runs (fast completion)
  - Consistent study habits
  - Mastering difficult topics
- **Visual Celebrations**: Animations for completing lessons, units, and courses
- **Leaderboards**: Optional anonymized comparison with other learners

---

## 3. Spaced Repetition / Review System

**Current State**: Learning is purely linear. Once a slide is "completed," users rarely see it again.

**User Impact**: Weak areas and forgotten material aren't reinforced, leading to poor long-term retention.

**Requirements**:
- Implement an SRS algorithm (similar to Anki) that resurfaces difficult questions
- Track user performance per question to identify weak areas
- Offer dedicated "Review" sessions separate from new content
- Prioritize questions the user previously got wrong
- Schedule reviews at optimal intervals (1 day, 3 days, 1 week, etc.)

---

## 4. Adaptive Learning & Personalization

**Current State**: Every user follows the identical path regardless of performance.

**Requirements**:
- **Adaptive Difficulty**: Adjust question difficulty based on accuracy
- **Smart Recommendations**: "You struggled with X, review before continuing"
- **Content Skipping**: Allow users to test out of mastered content
- **Custom Study Sessions**: Target specific topics or weak areas
- **Learning Path Suggestions**: Recommend next courses based on interests and performance

---

## 5. Expanded User Settings

**Current State**: Settings only include language switch (en/zh) and mute toggle.

**Requirements**:
- **Theme Options**: Dark/light mode, high-contrast mode
- **Accessibility**: Font size controls, dyslexia-friendly fonts, screen reader optimization
- **Randomization Toggle**: User-facing control for exercise/option randomization
- **Exercise Preferences**: Prioritize or deprioritize specific exercise types
- **Notification Settings**: Study reminders, daily goals
- **Study Session Limits**: Set maximum session duration for better pacing

---

## 6. Social Features

**Current State**: Learning is completely isolated with no social interaction.

**Requirements**:
- **Progress Sharing**: Share achievements on social media
- **Study Groups**: Collaborative learning spaces for specific courses
- **Discussion**: Comment on difficult questions to see explanations from others
- **Peer Comparisons**: Anonymous percentile rankings ("You scored higher than 75% of learners")

---

## 7. Enhanced Progress Visualization

**Current State**: The progress table is data-dense but not motivating or insightful.

**Requirements**:
- **Learning Path Map**: Visual journey showing progress through the course
- **Time Tracking**: Study time per day/week/month with charts
- **Skill Heatmaps**: Visual representation of strengths and weaknesses by topic
- **Completion Forecasts**: Estimated completion dates based on current pace
- **Progress Over Time**: Historical accuracy and completion trends

---

## 8. Search & Content Discovery

**Current State**: Users cannot search within courses or across the content library.

**Requirements**:
- **Full-Text Search**: Search within course content
- **Topic Index**: Browseable index of all concepts covered
- **Related Topics**: "You may also want to review..." suggestions
- **Quick Jump**: Navigate directly to specific lessons/modules

---

## 9. Note-Taking & Bookmarking

**Current State**: Users cannot save slides, bookmark important content, or add personal notes.

**Requirements**:
- **Bookmarks**: Save important slides for quick access
- **Personal Notes**: Add annotations to any slide
- **Flashcard Creation**: Convert any slide into a custom flashcard
- **Export Notes**: Download or print notes for offline study

---

## 10. Richer Content Experience

**Current State**: Content is primarily text-based with limited interactivity.

**Requirements**:
- **Embedded Media**: Support for video and audio content in slides
- **Interactive Simulations**: Hands-on exercises for complex concepts
- **Progressive Disclosure**: Reveal content step-by-step for better pacing
- **Hint System**: Offer progressive hints before revealing answers

---

## 11. Enhanced Feedback on Wrong Answers

**Current State**: When incorrect, users only see the correct answer and explanation.

**Requirements**:
- **Guided Discovery**: Progressive hints to help users reach the answer
- **Distractor Analysis**: Explain why other options were incorrect
- **Related Review**: Suggest related concepts to review
- **Immediate Retry**: Offer similar questions immediately after errors

---

## 12. Cross-Device Synchronization

**Current State**: Progress is stored in localStorage only, tied to a single device/browser.

**Requirements**:
- **Cloud Sync**: Synchronize progress across devices
- **User Accounts**: Optional account creation for sync and backup
- **Offline Support**: Continue learning without internet, sync when connected

---

## 13. Accessibility Improvements

**Current State**: No visible accessibility features.

**Requirements**:
- **Screen Reader Optimization**: Full ARIA support for all interactive elements
- **Keyboard Navigation**: Complete keyboard control without mouse
- **Visual Options**: High-contrast mode, color-blind friendly palettes
- **Text Options**: Adjustable font sizes, dyslexia-friendly fonts

---

## 14. Study Planning Tools

**Current State**: No way to set learning goals or schedules.

**Requirements**:
- **Goal Setting**: Daily/weekly study goals (questions answered, time spent, streak maintenance)
- **Study Calendar**: Plan and track study sessions
- **Push Notifications**: Reminders for scheduled study time
- **Pomodoro Timer**: Built-in focus timer with break reminders

---

## 15. Course Discovery Enhancements

**Current State**: The course selector is a simple list of 17 courses with no context.

**Requirements**:
- **Course Descriptions**: Overview of what each course covers
- **Difficulty Ratings**: Beginner/intermediate/advanced indicators
- **Estimated Duration**: Time to complete estimates
- **Prerequisites**: Recommended prior knowledge
- **Categories/Tags**: Group courses by topic (programming, history, languages, etc.)

---

## Priority Matrix

| Priority | Feature | User Impact | Implementation Effort |
|----------|---------|-------------|----------------------|
| **P0** | Onboarding Tutorial | High | Low |
| **P0** | Spaced Repetition | Very High | Medium |
| **P1** | Enhanced Progress Visualization | High | Low |
| **P1** | Streaks & Achievements | High | Low |
| **P1** | Expanded Settings | Medium | Low |
| **P2** | Search Functionality | High | Medium |
| **P2** | Note-Taking | High | Medium |
| **P2** | Adaptive Learning | Very High | High |
| **P3** | Social Features | Medium | High |
| **P3** | Cross-Device Sync | High | High |
