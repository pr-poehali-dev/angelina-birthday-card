import React, { useState, useEffect } from "react";
import BirthdayCard from "@/components/BirthdayCard";
import ConfettiEffect from "@/components/ConfettiEffect";
import { Moon, Sun, Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Initialize audio on client-side only
  useEffect(() => {
    const audioElement = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioElement.loop = true;
    setAudio(audioElement);
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };
  
  const toggleMusic = () => {
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.error("Не удалось воспроизвести аудио:", error);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-purple-50"}`}>
      <div className="container mx-auto py-10 px-4">
        {/* Header with controls */}
        <div className="flex justify-end mb-6 gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleMusic} 
            className="rounded-full"
            aria-label={isMusicPlaying ? "Выключить музыку" : "Включить музыку"}
          >
            {isMusicPlaying ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
            aria-label={theme === "light" ? "Включить темную тему" : "Включить светлую тему"}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col items-center justify-center relative">
          <ConfettiEffect />
          <div className="w-full max-w-2xl mx-auto">
            <BirthdayCard />
          </div>
          
          <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            С любовью для Ангелины ❤️ {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
