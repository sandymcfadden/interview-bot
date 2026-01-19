import { ChatBot } from '@/components/ChatBot';
import { ThemeToggle } from '@/components/ThemeToggle';

const firstName = process.env.NEXT_PUBLIC_FIRST_NAME || 'Your';
const lastName = process.env.NEXT_PUBLIC_LAST_NAME || 'Name';
const fullName = `${firstName} ${lastName}`;

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {fullName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interview Bot
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Welcome! I&apos;m an AI assistant that can answer questions about {firstName}&apos;s
            professional experience and background. Ask me anything, and I&apos;ll
            respond with both text and voice.
          </p>
        </div>

        <ChatBot />
      </main>

      <footer className="max-w-2xl mx-auto mt-8 text-center text-sm text-gray-500 dark:text-gray-400 space-y-3">
        <p>
          Powered by{' '}
          <a href="https://claude.ai/" className="underline hover:text-gray-700 dark:hover:text-gray-200">
            Claude AI
          </a>{' '}
          and{' '}
          <a href="https://elevenlabs.io/" className="underline hover:text-gray-700 dark:hover:text-gray-200">
            ElevenLabs
          </a>
        </p>
        <p>
          Made by{' '}
          <a href="https://sandym.ca" className="font-semibold underline hover:text-gray-700 dark:hover:text-gray-200">
            {fullName}
          </a>
        </p>
        <a
          href="https://github.com/sandymcfadden/interview-bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="View source code on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
}
