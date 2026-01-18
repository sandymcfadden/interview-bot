import { ChatBot } from '@/components/ChatBot';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4">
      <header className="max-w-2xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sandy McFadden
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
            Welcome! I&apos;m an AI assistant that can answer questions about Sandy&apos;s
            professional experience and background. Ask me anything, and I&apos;ll
            respond with both text and voice.
          </p>
        </div>

        <ChatBot />
      </main>

      <footer className="max-w-2xl mx-auto mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Powered by Claude AI and ElevenLabs
        </p>
      </footer>
    </div>
  );
}
