
import React, { useState } from 'react';

interface BoothExteriorProps {
  onEnter: () => void;
  isOpening: boolean;
  photoStrip?: string | null;
  state: string;
}

const BoothExterior: React.FC<BoothExteriorProps> = ({ onEnter, isOpening, photoStrip, state }) => {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    if (hasClicked || isOpening) return;
    setHasClicked(true);
    onEnter();
  };

  // Sample photo strip component for the exterior wall
  const SampleStrip = ({ className = "" }: { className?: string }) => (
    <div className={`w-7 sm:w-9 bg-white p-[1px] sm:p-[2px] shadow-md border-[0.5px] border-black/10 flex flex-col gap-[1px] sm:gap-[2px] ${className}`}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-full aspect-[4/3] bg-[#0a0a0a] overflow-hidden relative">
          {/* Subtle sheen to look like photo paper */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
        </div>
      ))}
      <div className="h-2 sm:h-3 flex items-center justify-center">
        <div className="w-1/2 h-[0.5px] bg-black/5"></div>
      </div>
    </div>
  );

  return (
    <div className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 transform ${state === 'READY' || state === 'COUNTDOWN' || state === 'SHUTTER' ? 'scale-[2.5] opacity-0 pointer-events-none' : 'scale-100'}`}>
      
      {/* Container to scale down the booth on mobile */}
      <div className="relative scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 flex flex-col items-center">
        
        {/* Top Light Box Sign */}
        <div className="relative w-[380px] sm:w-[420px] h-24 sm:h-28 bg-[#fff] border-4 border-[#333] shadow-[0_0_30px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center z-20 mb-6">
          <div className="elegant-font text-[#8b0000] text-5xl sm:text-6xl font-black tracking-[0.2em] uppercase leading-none">Photos</div>
          <div className="clean-font text-[8px] sm:text-[10px] text-[#333] font-bold tracking-[0.3em] mt-2 uppercase opacity-60">Electronic Lighting • High Definition</div>
          <div className="absolute -bottom-6 w-4 h-6 bg-[#333]"></div>
        </div>

        {/* Main Booth Structure */}
        <div className="relative w-[340px] sm:w-[500px] h-[500px] sm:h-[600px] bg-[#7a1b1b] border-x-[4px] sm:border-x-[6px] border-b-[4px] sm:border-b-[6px] border-[#4a1010] shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-sm flex overflow-hidden">
          
          {/* Left Cabinet Panel */}
          <div className="w-[40%] sm:w-[45%] h-full bg-[#8b1a1a] border-r-4 border-[#4a1010] relative p-3 sm:p-6 flex flex-col items-center">
            <div className="elegant-font text-white/90 italic text-lg sm:text-2xl text-center leading-tight mb-1 sm:mb-2">Take Your Photo</div>
            <div className="w-12 sm:w-16 h-[1px] sm:h-[2px] bg-white/30 mb-2 sm:mb-4"></div>
            
            <div className="flex flex-col items-center gap-1 opacity-80 scale-75 sm:scale-90 mb-4 sm:mb-8">
               <div className="elegant-font text-yellow-500 text-4xl sm:text-5xl font-bold">4</div>
               <div className="elegant-font text-white text-[10px] uppercase tracking-widest italic">Different Poses</div>
            </div>

            {/* DECORATIVE SAMPLE STRIPS */}
            <div className="relative w-full h-24 sm:h-32 mb-4">
              <SampleStrip className="absolute left-4 sm:left-8 top-0 -rotate-6 z-10" />
              <SampleStrip className="absolute right-4 sm:right-8 top-4 rotate-3 z-0" />
              
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full text-center">
                <span className="clean-font text-[7px] sm:text-[8px] text-white/40 tracking-[0.3em] uppercase italic">Analogue Strip</span>
              </div>
            </div>

            <div className="mt-auto mb-6 sm:mb-12 w-full flex flex-col items-center">
              {/* Authentic Dispensing Slot (Front Panel) */}
              <div className="relative w-24 sm:w-36 h-20 sm:h-28 bg-[#111] border-2 sm:border-4 border-[#d1d1d1] rounded-sm shadow-inner overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-1 bg-black/40 blur-sm"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
                 
                 {/* Dispensing Animation */}
                 {photoStrip && state === 'RESULT' && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 sm:w-28 animate-[dispense_3s_ease-out_forwards] z-50">
                     <img src={photoStrip} className="w-full h-auto shadow-2xl border-[2px] sm:border-[3px] border-white rotate-2" alt="Output" />
                  </div>
                )}
              </div>
              <div className="clean-font text-[8px] text-white/30 uppercase tracking-widest mt-2">Pick up here</div>
            </div>

            <div className="absolute top-1/4 right-[-2px] w-1 h-20 bg-[#d1d1d1] opacity-40"></div>
          </div>

          {/* Right Booth Entrance */}
          <div 
            className="flex-1 bg-[#080808] relative overflow-hidden cursor-pointer shadow-inner"
            onClick={handleClick}
          >
            {/* Main Booth Entrance Curtains */}
            <div className="absolute inset-0 z-10 flex">
              {/* Left Curtain */}
              <div 
                className={`w-1/2 h-full bg-[#111] border-r border-black/40 transition-transform duration-[1800ms] ease-in-out z-20 ${isOpening || hasClicked ? '-translate-x-[90%] skew-x-1' : 'translate-x-0'}`}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #111, #1a1a1a 15px, #111 30px)',
                  backgroundSize: '30px 100%'
                }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }}></div>
              </div>

              {/* Right Curtain */}
              <div 
                className={`w-1/2 h-full bg-[#111] border-l border-black/40 transition-transform duration-[1800ms] ease-in-out z-20 ${isOpening || hasClicked ? 'translate-x-[90%] -skew-x-1' : 'translate-x-0'}`}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #111, #1a1a1a 15px, #111 30px)',
                  backgroundSize: '30px 100%'
                }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }}></div>
              </div>
            </div>

            {/* Interior Visibility */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40">
               <div className="w-8 h-48 bg-black/40 blur-2xl"></div>
               {!hasClicked && (
                  <div className="z-30 bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 rounded-full animate-pulse whitespace-nowrap">
                    <span className="elegant-font italic text-white text-[10px] sm:text-sm tracking-widest uppercase">Enter Booth</span>
                  </div>
               )}
            </div>

            {/* Booth Floor */}
            <div className="absolute bottom-0 w-full h-8 sm:h-12 bg-[#333] z-0">
               <div className="w-full h-full opacity-20" style={{ backgroundImage: 'conic-gradient(#fff 90deg, #000 90deg 180deg, #fff 180deg 270deg, #000 270deg)', backgroundSize: '12px 12px' }} />
            </div>
          </div>
        </div>

        {/* Base / Wheels */}
        <div className="absolute bottom-[-15px] w-[380px] sm:w-[540px] h-4 sm:h-6 bg-[#333] rounded-full flex justify-between px-6 sm:px-10">
           <div className="w-6 sm:w-8 h-8 sm:h-10 bg-[#222] -mt-1 sm:-mt-2 rounded-sm border-t-2 border-white/10"></div>
           <div className="w-6 sm:w-8 h-8 sm:h-10 bg-[#222] -mt-1 sm:-mt-2 rounded-sm border-t-2 border-white/10"></div>
           <div className="w-6 sm:w-8 h-8 sm:h-10 bg-[#222] -mt-1 sm:-mt-2 rounded-sm border-t-2 border-white/10"></div>
        </div>
      </div>

      <style>{`
        @keyframes dispense {
          0% { transform: translate(-50%, -80px); opacity: 0; }
          20% { transform: translate(-50%, 0px); opacity: 1; }
          100% { transform: translate(-50%, 60px) rotate(4deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BoothExterior;
