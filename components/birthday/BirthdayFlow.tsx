'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import HeartBunting from './HeartBunting';
import MusicToggle from './MusicToggle';
import Step0Landing from './Step0Landing';
import Step1Collage from './Step1Collage';
import Step2GiftTeaser from './Step2GiftTeaser';
import Step3GiftPicker from './Step3GiftPicker';
import Step6Confirmation from './Step6Confirmation';
import BirthdayCard from './BirthdayCard';
import { birthdayConfig, GiftId } from '../../lib/birthday-config';

export default function BirthdayFlow() {
  const [step, setStep] = useState(0);
  const [giftChoice, setGiftChoice] = useState<GiftId | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleConfirmGift = async () => {
    if (!giftChoice) return;

    setIsSubmitting(true);

    // Advance to confirmation screen immediately — don't block on API
    // Fire-and-forget the submission in the background
    fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient_name: birthdayConfig.recipientName,
        wants_gift: true,
        gift_choice: giftChoice,
        treat_date: '2026-01-01',
        treat_time: '12:00',
      }),
    }).catch((e) => console.error('Submission error:', e));

    // Small delay so the spinner shows, then move on
    setTimeout(() => {
      setIsSubmitting(false);
      nextStep();
    }, 600);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step0Landing key="step0" onOpen={nextStep} />;
      case 1:
        return <Step1Collage key="step1" onNext={nextStep} />;
      case 2:
        return <Step2GiftTeaser key="step2" onYes={nextStep} />;
      case 3:
        return (
          <Step3GiftPicker
            key="step3"
            selectedGift={giftChoice}
            onSelectGift={setGiftChoice}
            onConfirm={handleConfirmGift}
            isSubmitting={isSubmitting}
          />
        );
      case 4:
        return (
          <BirthdayCard
            key="card"
            giftChoice={giftChoice || 'flower_bouquet'}
          />
        );
      default:
        return <Step0Landing key="step0" onOpen={nextStep} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-center">
      {/* Background Elements */}
      <FloatingHearts />
      <HeartBunting />
      <MusicToggle />

      {/* Main scrollytelling step containers */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
