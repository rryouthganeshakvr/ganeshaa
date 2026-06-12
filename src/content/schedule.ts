export const scheduleContent = {
  // Set enabled: false to hide the schedule section completely
  enabled: true,
  badge: 'Festival Programme',
  title: 'Daily',
  titleAccent: 'Schedule',
  subtitle: 'Join us for 10 days of divine celebrations at Round Ramalayam, Kovvur',
  // Edit the days array below to update the schedule each year
  days: [
    {
      day: 'Day 1',
      date: 'Sep 14, 2026',
      label: 'Sthapana',
      highlight: true, // gold border highlight for special days
      events: [
        { time: '6:00 AM',  title: 'Prabhat Pooja',             icon: '🌅' },
        { time: '10:00 AM', title: 'Ganapati Sthapana',         icon: '🙏' },
        { time: '12:00 PM', title: 'Maha Prasad',               icon: '🍚' },
        { time: '6:30 PM',  title: 'Evening Aarti & Bhajans',   icon: '🪔' },
        // { time: '8:00 PM',  title: 'Cultural Programme',         icon: '🎭' },
      ],
    },
    {
      day: 'Days 2–9',
      date: 'Sep 15 – Sep 22, 2026',
      label: 'Utsav',
      highlight: false,
      events: [
        { time: '6:00 AM',  title: 'Prabhat Pooja',             icon: '🌅' },
        { time: '12:00 PM', title: 'Madhyana Aarti',            icon: '🙏' },
        { time: '6:30 PM',  title: 'Evening Bhajans',           icon: '🎵' },
        // { time: '8:00 PM',  title: 'Nightly Cultural Programme', icon: '🎭' },
      ],
    },
    {
      day: 'Day 10',
      date: 'Sep 23, 2026',
      label: 'Nimajjanam',
      highlight: true,
      events: [
        { time: '6:00 AM',  title: 'Final Pooja & Aarti',        icon: '🪔' },
        { time: '10:00 AM', title: 'Maha Prasad',                icon: '🍚' },
        { time: '4:00 PM',  title: 'Shobha Yatra (Procession)',  icon: '🥁' },
        { time: '7:00 PM',  title: 'Nimajjanam (Visarjan)',      icon: '💧' },
      ],
    },
    
  ],
}
