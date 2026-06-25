'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Step5TimePickerProps {
  selectedDate: string;
  selectedTime: string | null;
  onSelectTime: (timeStr: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function Step5TimePicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  onConfirm,
  isSubmitting,
}: Step5TimePickerProps) {
  const getInitialTimeParts = () => {
    if (!selectedTime) {
      return { hour: '07', minute: '30', period: 'PM' };
    }
    const [h24, m] = selectedTime.split(':');
    const h24Num = parseInt(h24, 10);
    const period = h24Num >= 12 ? 'PM' : 'AM';
    let hourNum = h24Num % 12;
    if (hourNum === 0) hourNum = 12;
    const hour = String(hourNum).padStart(2, '0');
    return { hour, minute: m, period };
  };

  const parts = getInitialTimeParts();
  const [hour, setHour] = useState(parts.hour);
  const [minute, setMinute] = useState(parts.minute);
  const [period, setPeriod] = useState(parts.period);

  const hours = Array.from({ length: 12 }).map((_, i) => String(i + 1).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const updateParentTime = (newHour: string, newMinute: string, newPeriod: string) => {
    let h24 = parseInt(newHour, 10);
    if (newPeriod === 'PM' && h24 !== 12) h24 += 12;
    if (newPeriod === 'AM' && h24 === 12) h24 = 0;
    const h24Str = String(h24).padStart(2, '0');
    onSelectTime(`${h24Str}:${newMinute}`);
  };

  const handleHourSelect = (h: string) => {
    setHour(h);
    updateParentTime(h, minute, period);
  };

  const handleMinuteSelect = (m: string) => {
    setMinute(m);
    updateParentTime(hour, m, period);
  };

  const handlePeriodSelect = (p: string) => {
    setPeriod(p);
    updateParentTime(hour, minute, p);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 z-10 relative max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-heading mb-2">
          What time? ⏰
        </h2>
        <p className="font-sans text-base text-heading/70">
          When should I pick you up?
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-accent/5 border border-accent-light/30 w-full max-w-md mb-8">
        <div className="flex gap-4 items-start justify-center">
          {/* Hours */}
          <div className="flex flex-col items-center w-20">
            <span className="text-xs font-heading font-semibold text-heading/45 mb-2">HOUR</span>
            <div className="h-48 overflow-y-auto scrollbar-none snap-y w-full flex flex-col gap-2 rounded-2xl bg-accent-light/10 p-2">
              {hours.map((h) => (
                <button
                  key={`h-${h}`}
                  onClick={() => handleHourSelect(h)}
                  className={`snap-center flex-shrink-0 w-full py-3 text-lg font-heading font-bold rounded-xl transition-all cursor-pointer ${
                    hour === h ? 'bg-white text-accent shadow-sm' : 'text-heading/60 hover:bg-white/50'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="text-3xl font-bold text-accent/50 mt-10">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center w-20">
            <span className="text-xs font-heading font-semibold text-heading/45 mb-2">MINUTE</span>
            <div className="h-48 overflow-y-auto scrollbar-none snap-y w-full flex flex-col gap-2 rounded-2xl bg-accent-light/10 p-2">
              {minutes.map((m) => (
                <button
                  key={`m-${m}`}
                  onClick={() => handleMinuteSelect(m)}
                  className={`snap-center flex-shrink-0 w-full py-3 text-lg font-heading font-bold rounded-xl transition-all cursor-pointer ${
                    minute === m ? 'bg-white text-accent shadow-sm' : 'text-heading/60 hover:bg-white/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* AM/PM */}
          <div className="flex flex-col items-center w-24 ml-2">
            <span className="text-xs font-heading font-semibold text-heading/45 mb-2">PERIOD</span>
            <div className="flex flex-col gap-2 w-full">
              {(['AM', 'PM'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriodSelect(p)}
                  className={`w-full py-3.5 text-sm font-heading font-bold rounded-2xl transition-all cursor-pointer ${
                    period === p
                      ? 'bg-accent text-white shadow-sm'
                      : 'border border-accent-light/40 text-heading hover:bg-accent-light/20'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 w-full flex items-center justify-center">
        <motion.button
          disabled={isSubmitting}
          onClick={onConfirm}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          className="w-full px-10 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-semibold text-lg shadow-md shadow-accent/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving Date...
            </span>
          ) : (
            'Make it a date! 💕'
          )}
        </motion.button>
      </div>
    </div>
  );
}
