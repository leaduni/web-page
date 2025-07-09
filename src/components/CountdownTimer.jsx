import { useEffect, useState } from 'react';

const CountdownTimer = ({ fechaStr, grande = false }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const [dia, mes, anio] = fechaStr.split('/');
    const targetDate = new Date(`${anio}-${mes}-${dia}T00:00:00`);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown('¡Comenzó!');
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fechaStr]);

  return (
    <span
      className={`inline-block font-bold rounded-full ${
        grande
          ? 'bg-gradient-to-r from-pink-500 to-purple-700 text-white text-2xl px-6 py-3 shadow-xl'
          : 'bg-pink-600/80 text-white text-xs px-2 py-1'
      }`}
    >
      ⏳ {countdown}
    </span>
  );
};

export default CountdownTimer;
