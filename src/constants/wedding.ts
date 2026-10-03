export const WEDDING_CONFIG = {
  date: new Date('2026-11-24T19:00:00'),
  bride: {
    name: 'Divya',
    fullName: 'Divya Vashishtha',
    parents: 'D/o Mrs Madhu & Mr Yogendra Vashishtha',
    photo: '/assets/images/bride-circle.png?v=2',
    artwork: '/assets/images/bride-art.png',
  },
  groom: {
    name: 'Chayan',
    fullName: 'Chayan Shrang Raj',
    parents: 'S/o Mrs Anjali & Mr Sanjay Mishra',
    // ?v busts browser + Next image caches whenever the portrait is re-rendered
    photo: '/assets/images/groom-circle.png?v=2',
    artwork: '/assets/images/groom-art.png',
  },
  venue: {
    ceremony: {
      name: 'The Saffron',
      address: 'Karkarduma, New Delhi',
      time: '8:00 PM Onwards',
    },
    reception: {
      name: 'Hotel Novena Bone',
      address: 'Jl. Jend. Ahmad Yani No.25',
      time: '6:30 PM',
    },
  },
};
