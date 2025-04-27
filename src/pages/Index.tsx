import { useState, useEffect } from "react";
import BirthdayCard from "@/components/BirthdayCard";
import ConfettiEffect from "@/components/ConfettiEffect";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Music, MusicOff } from "lucide-react";

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showConfetti, setShowConfetti] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  const [audio] = useState(new Audio('https://pixabay.com/sound-effects/happy-birthday-music-box-111659/'));
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    
    // Start confetti after a delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 1000);
    
    audio.loop = true;
    
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [audio]);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  const toggleMusic = () => {
    if (playingMusic) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.log("Автовоспроизведение предотвращено:", error);
      });
    }
    setPlayingMusic(!playingMusic);
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 transition-colors duration-300">
      <ConfettiEffect active={showConfetti} />
      
      <div className="fixed top-4 right-4 flex gap-2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme}
          className="bg-white/80 dark:bg-gray-800/80 hover:bg-white hover:dark:bg-gray-800"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMusic}
          className="bg-white/80 dark:bg-gray-800/80 hover:bg-white hover:dark:bg-gray-800"
        >
          {playingMusic ? <MusicOff size={18} /> : <Music size={18} />}
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient">
            Особенная открытка для Ангелины 🎂
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Для прекрасной девушки, любящей аниме</p>
        </div>
        
        <BirthdayCard />
        
        <div className="mt-12 text-center max-w-md">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ангелина, ты замечательная! Желаем тебе самого лучшего дня рождения!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
