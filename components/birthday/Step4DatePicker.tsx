'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Step4DatePickerProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  onNext: () => void;
}

export default function Step4DatePicker({
  selectedDate,
  onSelectDate,
  onNext,
}: Step4DatePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const isPastDate = (date: Date) => {
    const tempToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < tempToday;
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = generateDays();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 z-10 relative max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-heading mb-2">
          When are we going? 📅
        </h2>
        <p className="font-sans text-base text-heading/70">
          Pick a day for your surprise!
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-accent/5 border border-accent-light/30 w-full max-w-sm mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevMonth} className="p-2 text-heading hover:bg-accent-light/20 rounded-full cursor-pointer transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-heading font-bold text-xl text-heading">
            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button onClick={nextMonth} className="p-2 text-heading hover:bg-accent-light/20 rounded-full cursor-pointer transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {daysOfWeek.map(d => (
            <div key={d} className="text-xs font-heading font-semibold text-heading/50 py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} className="aspect-square" />;
            
            const dateStr = formatDateString(date.getFullYear(), date.getMonth(), date.getDate());
            const isSelected = selectedDate === dateStr;
            const isPast = isPastDate(date);
            const isToday = 
              date.getDate() === today.getDate() && 
              date.getMonth() === today.getMonth() && 
              date.getFullYear() === today.getFullYear();

            return (
              <button
                key={dateStr}
                disabled={isPast}
                onClick={() => onSelectDate(dateStr)}
                className={`py-2 text-sm font-semibold rounded-full flex items-center justify-center aspect-square transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-accent text-white shadow-sm scale-105'
                    : isPast
                    ? 'text-heading/20 cursor-not-allowed line-through'
                    : isToday
                    ? 'bg-accent-light/30 border border-accent text-heading'
                    : 'text-heading hover:bg-accent-light/20'
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-16 flex items-center justify-center">
        {selectedDate && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-full font-heading font-semibold text-base shadow-md shadow-accent/20 cursor-pointer transition-all duration-300"
          >
            Select Time 🕒
          </motion.button>
        )}
      </div>
    </div>
  );
}
