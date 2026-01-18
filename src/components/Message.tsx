'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message as MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
  autoPlay?: boolean;
}

export function Message({ message, autoPlay = false }: MessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPlayedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    if (!message.audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(message.audioUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    audio.play().catch(console.error);
  }, [message.audioUrl]);

  useEffect(() => {
    if (message.audioUrl && autoPlay && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      playAudio();
    }
  }, [message.audioUrl, autoPlay, playAudio]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        {message.isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed">{message.content}</p>
            {!isUser && message.audioUrl && (
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Stop
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Replay
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
