// =============================================================
// Birthday Wish Config — Edit these values before sharing the link
// =============================================================

export const birthdayConfig = {
  // ── Recipient details ──
  recipientName: 'Sanskrtiti',
  termOfEndearment: 'bestie',

  // ── Site branding ──
  siteTitle: 'For Sanskrtiti 💗',
  siteDescription: 'A special birthday surprise for my favourite person!',

  // ── Gift options (exactly 5) ──
  gifts: [
    {
      id: 'flower_bouquet' as const,
      emoji: '💐',
      label: 'Flower Bouquet',
      description: 'A stunning bouquet of your favourites',
    },
    {
      id: 'drive' as const,
      emoji: '🚗',
      label: 'A Drive',
      description: 'A scenic drive to wherever you want',
    },
    {
      id: 'movie' as const,
      emoji: '🎬',
      label: 'A Movie',
      description: 'Your pick — any movie, any time',
    },
    {
      id: 'chocolate_hamper' as const,
      emoji: '🍫',
      label: 'Chocolate Hamper',
      description: 'A dreamy box of your fav chocolates',
    },
    {
      id: 'snacks_hamper' as const,
      emoji: '🍿',
      label: 'Snacks Hamper',
      description: 'All the snacks you could ever want',
    },
  ],

  // ── Media assets (place files in public/media/) ──
  video: {
    src: '/media/WhatsApp Video 2026-06-22 at 14.11.11.mp4',
    backMessage: 'This moment means everything to me 💕',
  },
  photos: [
    {
      src: '/media/1.png',
      backMessage: 'Best memories with you! 🥹',
      rotation: -5,
    },
    { src: '/media/2.png', backMessage: 'Can\'t stop laughing at this one 😂', rotation: 4 },
    { src: '/media/3.png', backMessage: 'My partner in crime 🤍', rotation: -3 },
    { src: '/media/4.png', backMessage: 'Forever grateful for you ✨', rotation: 6 },
  ],

  // Total photo slots around the video (excluding the video itself)
  totalPhotoSlots: 4,

  // ── Background music ──
  musicSrc: '/media/our-song.mp3',

  // ── Photo captions / messages ──
  greetingHeadline: 'Happy Birthday Sanskrtiti! 🎉',
  greetingSubtext: 'To the best friend anyone could ever ask for',
} as const;

export type GiftId = (typeof birthdayConfig.gifts)[number]['id'];
