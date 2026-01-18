import Anthropic from '@anthropic-ai/sdk';
import { getSystemPrompt } from './knowledge-base';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: userMessage },
  ];

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    system: getSystemPrompt(),
    messages,
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude');
  }

  return textBlock.text;
}
