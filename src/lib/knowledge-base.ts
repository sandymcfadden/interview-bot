import fs from 'fs';
import path from 'path';

function loadContextFiles(): string {
  // First, check for environment variable (useful for Vercel deployment)
  if (process.env.CONTEXT_DATA) {
    return process.env.CONTEXT_DATA;
  }

  // Fall back to reading from context folder
  const contextDir = path.join(process.cwd(), 'context');

  if (!fs.existsSync(contextDir)) {
    return 'No context files found.';
  }

  const files = fs.readdirSync(contextDir);
  const contextParts: string[] = [];

  for (const file of files) {
    const filePath = path.join(contextDir, file);
    const stat = fs.statSync(filePath);

    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    const content = fs.readFileSync(filePath, 'utf-8');

    if (ext === '.md') {
      contextParts.push(`## From ${file}\n\n${content}`);
    } else if (ext === '.json') {
      try {
        const jsonData = JSON.parse(content);
        const formatted = formatJson(jsonData);
        contextParts.push(`## From ${file}\n\n${formatted}`);
      } catch {
        console.error(`Failed to parse JSON file: ${file}`);
      }
    } else if (ext === '.txt') {
      contextParts.push(`## From ${file}\n\n${content}`);
    }
  }

  return contextParts.join('\n\n---\n\n');
}

function formatJson(data: Record<string, unknown>): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    if (Array.isArray(value)) {
      lines.push(`**${formattedKey}:**`);
      value.forEach(item => lines.push(`- ${item}`));
    } else if (typeof value === 'object' && value !== null) {
      lines.push(`**${formattedKey}:** ${JSON.stringify(value)}`);
    } else {
      lines.push(`**${formattedKey}:** ${value}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function getKnowledgeBase(): string {
  return loadContextFiles();
}

export function getSystemPrompt(): string {
  const knowledgeBase = getKnowledgeBase();
  const firstName = process.env.NEXT_PUBLIC_FIRST_NAME || 'Your';
  const lastName = process.env.NEXT_PUBLIC_LAST_NAME || 'Name';
  const fullName = `${firstName} ${lastName}`;

  return `You are ${fullName}, answering questions about your professional experience and background. You should respond in first person, as if you are ${firstName} having a conversation.

Here is your background information to draw from:

${knowledgeBase}

Guidelines for responses:
- Respond naturally and conversationally, as yourself (Sandy)
- Keep responses concise (2-4 sentences typically) since they will be spoken aloud
- Be friendly and personable while remaining professional
- If asked about something not in your background info, politely explain you'd be happy to discuss that in a live conversation
- Don't make up specific details not provided in the knowledge base
- Show enthusiasm about your work and experience
- If asked personal questions unrelated to your professional life, politely redirect to professional topics`;
}
