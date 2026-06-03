export const SITE_CONFIG = {
  company: {
    name: 'Skyline Electronetworks',
    tagline: 'Engineering Electrical Excellence from Concept to Commissioning',
    description: 'A premier electrical contracting company delivering reliable, safe, and innovative power infrastructure solutions.',
  },

  address: {
    street: 'MALLIKA PLAZA NO 3B, SITE NO 415/36, SECOND FLOOR, SHOP NO.7',
    area: '2nd PHASE, KIDB MAIN ROAD, PEENYA INDUSTRIAL AREA, PEENYA 1st STAGE',
    city: 'BANGALORE',
    state: 'KARNATAKA',
    pincode: '560058',
    country: 'INDIA',
    full: 'MALLIKA PLAZA NO 3B SITE NO 415/36 SECOND FLOOR SHOP NO .7 2nd PHASE KIDB MAIN ROAD, PEENYA INDUSTRIAL AREA PEENYA 1st STAGE BANGALORE-560058 KARNATAKA, INDIA.',
    short: 'Peenya Industrial Area, Bangalore - 560058',
  },

  contact: {
    phone: '+91 9620082858',
    email: 'projects@skylineelectronetworks.com',
    website: 'www.skylineelectronetworks.com',
  },

  hours: {
    weekdays: 'Mon–Sat: 9:30 AM – 6:30 PM',
    sunday: 'Sunday: Closed',
  },

  legal: {
    gstin: '29BGMPK4628K1ZT',
    shopEstablishment: '24/YH-/CE/0106/2020',
    electricalLicense: '2CL139631BNG',
    msme: 'UDYAM-KR-03-000605',
  },

  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Quality & Safety', href: '/quality-safety' },
    { name: 'Clients', href: '/clients' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],

  socialLinks: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
} as const;
