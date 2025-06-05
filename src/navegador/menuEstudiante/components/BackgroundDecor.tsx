// menuEstudiante/components/BackgroundDecor.tsx
import React from 'react'; // Make sure React is imported

const BackgroundDecor = () => (
  <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
    <div className="absolute text-6xl animate-bounce-slow-alt left-5 top-10 opacity-40 text-yellow-700">
      ⭐
    </div>
    <div className="absolute text-5xl animate-float right-10 top-20 opacity-30 text-yellow-400">
      ☁️
    </div>
    <div className="absolute text-7xl animate-pulse left-1/2 top-1/3 opacity-20 text-yellow-800">
      ✨
    </div>
    <div className="absolute text-5xl animate-float-slow right-1/4 bottom-20 opacity-30 text-yellow-500">
      📚
    </div>
    <div className="absolute text-6xl animate-bounce-fast left-1/4 bottom-10 opacity-30 text-yellow-900">
      🎉
    </div>
  </div>
);

export default BackgroundDecor;