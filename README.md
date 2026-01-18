# Interview Bot

A chatbot that answers questions about your professional experience and background. Users type questions, Claude AI generates responses, and ElevenLabs speaks the responses in your cloned voice.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark/light mode)
- **AI**: Claude API (Anthropic)
- **Text-to-Speech**: ElevenLabs API

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required variables:
- `ANTHROPIC_API_KEY` - Get from [console.anthropic.com](https://console.anthropic.com)
- `ELEVENLABS_API_KEY` - Get from [elevenlabs.io](https://elevenlabs.io)
- `ELEVENLABS_VOICE_ID` - Your cloned voice ID from ElevenLabs

### 3. Add Your Context Files

Add your personal/professional information to the `context/` folder. These files are loaded automatically and used as context for the AI.

#### Supported Formats

- `.md` - Markdown files
- `.json` - JSON files
- `.txt` - Plain text files

#### Suggested Files

**resume.md** - Your professional resume:
```markdown
# Your Name

## Summary
Brief professional intro...

## Work Experience
### Job Title
**Company** | Date - Date
- Accomplishment 1
- Accomplishment 2

## Skills
- Skill 1
- Skill 2
```

**projects.md** - Notable projects:
```markdown
# Projects

## Project Name
**Technologies:** React, Node.js

Description of the project and your contributions...
```

**about.json** - Personal attributes:
```json
{
  "workPhilosophy": "Your approach to work...",
  "strengths": ["Strength 1", "Strength 2"],
  "interests": ["Interest 1", "Interest 2"]
}
```

> **Note:** Files in `context/` are gitignored to protect your personal information.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the chatbot.

## Features

- Dark/light mode toggle (defaults to dark, persists preference)
- Text input for questions
- AI responses as "you" based on your context files
- Voice responses using your cloned voice (auto-plays)
- Replay button on messages
- Suggested questions for quick start

## Deploying to Vercel

### Option A: Deploy from Local (Recommended)

Deploy directly from your local machine, which includes your context files:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time will prompt for setup)
vercel

# For production
vercel --prod
```

Set your environment variables in the Vercel dashboard (Settings → Environment Variables):
- `ANTHROPIC_API_KEY`
- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

### Option B: Deploy via Git

If deploying via GitHub, context files are gitignored. You can either:

1. **Use an environment variable**: Add `CONTEXT_DATA` in Vercel with your full context as plain text
2. **Private repo**: Remove the context gitignore and commit your files:
   ```bash
   # Remove these lines from .gitignore:
   /context/*
   !/context/.gitkeep
   ```

## Project Structure

```
├── context/              # Your personal context files (gitignored)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/     # Claude API endpoint
│   │   │   └── speech/   # ElevenLabs TTS endpoint
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ChatBot.tsx
│   │   ├── Message.tsx
│   │   ├── SuggestedQuestions.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── anthropic.ts
│   │   ├── elevenlabs.ts
│   │   └── knowledge-base.ts
│   └── types/
│       └── index.ts
├── .env.example
└── .env.local            # Your API keys (gitignored)
```
