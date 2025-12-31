
import React from 'react';

interface CurtainProps {
  isOpen: boolean;
  onTransitionEnd?: () => void;
}

const Curtain: React.FC<CurtainProps> = ({ isOpen, onTransitionEnd }) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex">
      {/* Left Curtain */}
      <div 
        onTransitionEnd={onTransitionEnd}
        className={`w-1/2 h-full bg-[#4a1a1a] border-r-4 border-black transition-transform duration-[1500ms] ease-in-out relative ${
          isOpen ? '-translate-x-[95%]' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(0,0,0,0.3) 100%), repeating-linear-gradient(90deg, #4a1a1a 0px, #3a1515 20px, #4a1a1a 40px)'
        }}
      >
        <div className="absolute top-0 right-0 h-full w-2 bg-black/20 opacity-50" />
        {/* Fabric folds effect */}
        {!isOpen && <div className="absolute inset-0 opacity-10 animate-jitter" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }} />}
      </div>

      {/* Right Curtain */}
      <div 
        className={`w-1/2 h-full bg-[#4a1a1a] border-l-4 border-black transition-transform duration-[1500ms] ease-in-out relative ${
          isOpen ? 'translate-x-[95%]' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: 'linear-gradient(-90deg, transparent 95%, rgba(0,0,0,0.3) 100%), repeating-linear-gradient(90deg, #4a1a1a 0px, #3a1515 20px, #4a1a1a 40px)'
        }}
      >
        <div className="absolute top-0 left-0 h-full w-2 bg-black/20 opacity-50" />
        {!isOpen && <div className="absolute inset-0 opacity-10 animate-jitter" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }} />}
      </div>
    </div>
  );
};

export default Curtain;
