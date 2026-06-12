export const donationContent = {
  badge: 'Seva',
  title: 'Serve with',
  titleAccent: 'Love',
  subtitle: 'Your generous contributions help us organize pooja materials, annadanam, and community feasts.',
  message:
    'Your generous donations help us organize pooja materials, annadanam, and community feasts — every offering becomes a prayer to Lord Ganesha.',
  impactStats: [
    { icon: '🎊', value: '18 Days', label: 'of Grand Celebrations' },
    { icon: '🍱', value: '5000+', label: 'Prasad Servings' },
    { icon: '🎭', value: '20+', label: 'Cultural Programs' },
    { icon: '🤝', label: 'Community Service', value: 'Year Round' },
  ],
  causes: [
    {
      icon: '🐘',
      title: 'Ganesh Idol & Decoration',
      description: 'Support the creation of our magnificent Lord Ganesha idol and beautiful pandal decorations.',
      amount: '₹500+',
    },
    {
      icon: '🍱',
      title: 'Prasad & Community Feast',
      description: 'Sponsor prasad distribution to thousands of devotees during the festival.',
      amount: '₹1000+',
    },
    {
      icon: '🎭',
      title: 'Cultural Programs',
      description: 'Support cultural performances, music, dance, and devotional events during Chaturthi.',
      amount: '₹2000+',
    },
    {
      icon: '📿',
      title: 'General Donation',
      description: 'Any amount contributed with devotion goes directly toward Lord Ganesha\'s celebrations.',
      amount: 'Any Amount',
    },
  ],
  bankDetails: {
    accountName: 'Round Ramalayam Youth Kovvur',
    accountNumber: 'XXXX XXXX XXXX XXXX',
    ifscCode: 'XXXX0XXXXXX',
    bankName: 'State Bank of India',
    branch: 'Kovvur Branch',
    upiId: import.meta.env.VITE_UPI_ID as string,
  },
  qrNote: 'Scan to pay via UPI',
  disclaimer: 'All donations go directly to Lord Ganesha\'s celebrations and community service. For receipts and queries, contact us at rryouthganeshakvr@gmail.com',
}
