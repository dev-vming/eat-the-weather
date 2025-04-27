'use client';

  export default function LoadingBar() {

  const icons = [
    '/images/snow.png',
    '/images/cloud.png',
    '/images/sun.png',
    '/images/teru.png',
  ];
  
    return (
      <div className="relative overflow-hidden w-60 h-14 flex flex-col justify-center items-center">
        <FunkyLoadingText />
        <div className="flex w-max animate-slide-smooth">
          {Array.from({ length: 10 }).map((_, repeatIdx) =>
            icons.map((icon, idx) => (
              <img
                key={`${repeatIdx}-${idx}`}
                src={icon}
                alt={`icon-${idx}`}
                className={`w-6 h-6 mx-1 
                  ${idx % 2 === 0 ? 'animate-bounce-updown' : 'animate-bounce-downup'}`}
              />
            ))
          )}
        </div>
      </div>
    );
  }

function FunkyLoadingText() {
    const letters = 'loading ...'.split('');
    const rotations = [-5, 2, -3, 4, -2, 3, 0, -1, 2, -2, 1]; 
  
    return (
      <p className="font-semibold text-gray-300 flex space-x-2 mb-3">
        {letters.map((char, idx) => (
          <span
            key={idx}
            className="inline-block"
            style={{
              transform: `rotate(${rotations[idx % rotations.length]}deg)`,
              letterSpacing: '0.2em',
            }}
          >
            {char}
          </span>
        ))}
      </p>
    );
  }