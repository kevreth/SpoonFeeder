import { sendMessage, buildSystemPrompt } from './spoonyApi';

const context = {
  courseName: 'Test Course',
  unitName: 'Unit 1',
  lessonName: 'Lesson 1',
  slideText: 'This is a test slide about photosynthesis.',
};

console.log('--- Available models ---');
const modelsRes = await fetch('https://gen.pollinations.ai/v1/models', {
  headers: { 'Authorization': 'Bearer sk_uGuYn2sBv3yg0il8jiwJVPUB3dwuhBoz' }
});
console.log('models:', await modelsRes.text());

console.log('--- System prompt ---');
console.log(buildSystemPrompt(context));
console.log('--- Raw fetch test ---');
const testRes = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_uGuYn2sBv3yg0il8jiwJVPUB3dwuhBoz',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'openai',
    messages: [{ role: 'user', content: 'say hello' }],
    max_tokens: 50
  })
});
console.log('status:', testRes.status);
console.log('body:', await testRes.text());

console.log('--- Sending message ---');

const result = await sendMessage({
  apiKey: 'sk_uGuYn2sBv3yg0il8jiwJVPUB3dwuhBoz',
  model: 'openai',
  context,
  history: [],
  userMessage: 'What is this lesson about?',
});

console.log(result);
