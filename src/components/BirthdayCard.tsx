import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Cake, Gift, Heart } from "lucide-react";

const BirthdayCard: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const today = new Date();
  const birthdayDate = new Date(2025, 3, 29); // 29 апреля 2025
  
  const daysUntilBirthday = () => {
    const diffTime = birthdayDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const isBirthdayToday = daysUntilBirthday() === 0;
  
  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/30 border-2 border-purple-200 dark:border-purple-700 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 animate-sparkle delay-300">
          <Sparkles size={20} className="text-yellow-400" />
        </div>
        <div className="absolute top-20 right-20 animate-sparkle delay-500">
          <Sparkles size={16} className="text-pink-400" />
        </div>
        <div className="absolute bottom-10 left-20 animate-sparkle delay-700">
          <Sparkles size={18} className="text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 animate-sparkle">
          <Sparkles size={22} className="text-purple-400" />
        </div>
      </div>
      
      <CardContent className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="animate-float">
            <img 
              src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000&auto=format&fit=crop" 
              alt="Аниме" 
              className="w-44 h-44 object-cover rounded-full border-4 border-purple-300 dark:border-purple-500 shadow-lg"
            />
          </div>
        </div>
        
        <h1 className={`text-4xl font-bold mb-3 transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-gradient">С Днем Рождения, Ангелина!</span>
        </h1>
        
        <div className={`flex justify-center mb-4 transition-opacity duration-1000 delay-200 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <Heart className="text-secondary mx-1" fill="currentColor" />
          <Cake className="text-primary mx-1" />
          <Heart className="text-secondary mx-1" fill="currentColor" />
        </div>
        
        <p className={`text-lg mb-6 transition-opacity duration-1000 delay-300 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          {isBirthdayToday ? (
            <span>Сегодня тебе исполняется 15 лет! 🎉</span>
          ) : (
            <span>29 апреля тебе исполнится 15 лет! {daysUntilBirthday() > 0 ? `Осталось всего ${daysUntilBirthday()} дней!` : "Твой день рождения уже прошёл, но поздравления всё равно для тебя!"}</span>
          )}
        </p>
        
        <div className={`text-center mb-6 bg-white/50 dark:bg-black/20 p-4 rounded-lg shadow-inner transition-opacity duration-1000 delay-400 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <p className="italic text-gray-700 dark:text-gray-300 mb-2">
            "Пусть этот день будет наполнен радостью, улыбками и всем, что ты любишь! Твоя любовь к аниме делает тебя особенной."
          </p>
          <p className="font-semibold">Твой друг ❤️</p>
        </div>
        
        <div className={`flex justify-center items-center gap-2 transition-opacity duration-1000 delay-500 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <Gift className="text-secondary" />
          <span className="text-sm">Желаем тебе много аниме и счастья!</span>
          <Gift className="text-secondary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthdayCard;
