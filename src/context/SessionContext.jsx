import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('monster_buddy_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [monster, setMonster] = useState(() => {
    const saved = localStorage.getItem('monster_buddy_monster');
    return saved ? JSON.parse(saved) : {
      name: '',
      type: 'Broccoli Beast',
      level: 1,
      evolution: 'Tiny Sprout',
      energy: 650,
      maxEnergy: 1000,
      evolutionProgress: 65,
      lastFed: new Date().toISOString(),
      stats: {
        proteins: 0.5,
        carbs: 25,
        fats: 0.3
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('monster_buddy_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('monster_buddy_monster', JSON.stringify(monster));
  }, [monster]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  const updateMonster = (updates) => {
    setMonster(prev => {
      const updated = { ...prev, ...updates };
      
      // Evolution Logic
      if (updated.evolutionProgress >= 100) {
        updated.level += 1;
        updated.evolutionProgress = 0;
        
        // Change type/evolution stage based on level
        if (updated.level === 5) {
          updated.evolution = 'Sprouty Buddy';
        } else if (updated.level === 15) {
          updated.evolution = 'Forest Guardian';
          updated.type = 'Ancient Grove';
        }
      }
      
      return updated;
    });
  };

  const feedMonster = (food) => {
    const energyGain = Math.round((food.carbs + food.proteins * 2) * 2);
    const progressGain = food.fiber === 'high' ? 8 : 4;
    
    updateMonster({
      energy: Math.min(monster.maxEnergy, monster.energy + energyGain),
      evolutionProgress: monster.evolutionProgress + progressGain,
      stats: {
        proteins: monster.stats.proteins + (food.proteins / 100),
        carbs: monster.stats.carbs + (food.carbs / 100),
        fats: monster.stats.fats + (food.fats / 100)
      },
      lastFed: new Date().toISOString()
    });
  };

  return (
    <SessionContext.Provider value={{ 
      user, 
      monster, 
      login, 
      logout, 
      updateMonster,
      feedMonster
    }}>
      {children}
    </SessionContext.Provider>
  );
};
