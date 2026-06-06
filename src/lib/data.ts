import { ServiceItem, ProjectItem, AdvantageItem, ClientLogo } from '@/lib/types';

export const SERVICES_DATA: ServiceItem[] = [
    {
        id: 'ht-works',
        number: '01',
        title: 'HT Works',
        description: 'High-tension cable laying, 11KV/33KV/66KV substation erection, transformer installation, and HT switching station works for industrial and utility clients.',
        category: 'HT',
        iconName: 'Zap',
        exploreLink: '#ht-works'
    },
    {
        id: 'lt-works',
        number: '02',
        title: 'LT Works',
        description: 'Low-tension panel installations, LT cable networks, distribution boards, bus duct systems, and end-to-end power wiring for commercial and residential complexes.',
        category: 'LT',
        iconName: 'Plug',
        exploreLink: '#lt-works'
    },
    {
        id: 'electrical-infrastructure',
        number: '03',
        title: 'Electrical Infrastructure',
        description: 'Design, supply, and construction of large-scale electrical infrastructure including switchyards, overhead lines, underground networks, and grid connectivity for townships, SEZs, and airports.',
        category: 'infrastructure',
        iconName: 'Star',
        exploreLink: '#infrastructure'
    },
    {
        id: 'lighting-systems',
        number: '04',
        title: 'Lighting Systems',
        description: 'Smart LED lighting solutions, street & highway lighting, stadium floodlighting, architectural façade lighting, and automated DALI/SCADA-controlled lighting systems.',
        category: 'lighting',
        iconName: 'Lightbulb',
        exploreLink: '#lighting'
    },
    {
        id: 'testing-commissioning',
        number: '05',
        title: 'Testing & Commissioning',
        description: 'Comprehensive pre-commissioning tests, relay protection studies, power quality analysis, thermal imaging, earth resistance testing, and final commissioning of all electrical systems.',
        category: 'testing',
        iconName: 'ClipboardCheck',
        exploreLink: '#testing'
    },
    {
        id: 'scada-automation',
        number: '06',
        title: 'SCADA & Automation',
        description: 'Industrial automation, SCADA integration, PLC programming, remote monitoring panels, and energy management systems for smarter operational control.',
        category: 'automation',
        iconName: 'Cpu',
        exploreLink: '#automation'
    }
];

export const PROJECTS_DATA: ProjectItem[] = [
    {
        id: 'mumbai-metro-line-3',
        title: 'Mumbai Metro Line 3 — Traction Power Supply',
        location: 'Colaba–SEEPZ, Mumbai',
        category: 'HT INFRASTRUCTURE',
        sector: 'Infrastructure',
        status: 'COMPLETED',
        value: '₹420 Cr',
        year: 2023,
        imageUrl: '/projects/1.webp',
        mobileImageUrl: '/projects-mobile/1.webp',
        description: 'Design, installation, testing, and commissioning of the 25KV AC overhead electrification traction system, auxiliary substations, and cable distribution networks for the fully underground line.',
        specs: ['25KV AC Traction OHE', '14 Underground Stations', 'SCADA Integration']
    },
    {
        id: 'pune-sez-substation',
        title: 'Pune SEZ — 66KV Grid Substation',
        location: 'Hinjewadi, Pune',
        category: 'SUBSTATION WORKS',
        sector: 'IT Buildings',
        status: 'COMPLETED',
        value: '₹85 Cr',
        year: 2022,
        imageUrl: '/projects/2.webp',
        mobileImageUrl: '/projects-mobile/2.webp',
        description: 'Gas insulated substation integrated with local renewable solar farm arrays to provide uninterrupted 30MVA capacity to the SEZ IT-park.',
        specs: ['66KV GIS Bay', '30MVA Transformers', 'Smart Grid Sync']
    },
    {
        id: 'nh48-highway-lighting',
        title: 'NH-48 Smart Highway Lighting — 48 km',
        location: 'Delhi–Gurugram, Haryana',
        category: 'LIGHTING SYSTEMS',
        sector: 'Infrastructure',
        status: 'COMPLETED',
        value: '₹62 Cr',
        year: 2022,
        imageUrl: '/projects/3.webp',
        mobileImageUrl: '/projects-mobile/3.webp',
        description: 'High-mast intelligent street lighting with automatic photocell ambient dimming and cloud-based failure reporting across a 48km corridor.',
        specs: ['Smart LED Luminaires', 'IoT Telemetry Nodes', '42% Energy Savings']
    },
    {
        id: 'navi-mumbai-airport',
        title: 'Navi Mumbai International Airport — Phase 1',
        location: 'Navi Mumbai, Maharashtra',
        category: 'LT & HT WORKS',
        sector: 'Infrastructure',
        status: 'ONGOING',
        value: '₹310 Cr',
        year: 2024,
        imageUrl: '/projects/4.webp',
        mobileImageUrl: '/projects-mobile/4.webp',
        description: 'Primary airport electrical works: high-tension power feeds, backup generator sync, airfield lighting, and comprehensive low-tension terminal networks.',
        specs: ['11KV Distribution Ring', '6MW Diesel Backup', 'Terminal LED Lighting']
    },
    {
        id: 'dlf-cyber-city-substation',
        title: 'DLF CyberCity — 132KV Receiving Substation',
        location: 'Gurugram, Haryana',
        category: 'SUBSTATION WORKS',
        sector: 'IT Buildings',
        status: 'COMPLETED',
        value: '₹145 Cr',
        year: 2021,
        imageUrl: '/projects/5.webp',
        mobileImageUrl: '/projects-mobile/5.webp',
        description: '132KV indoor gas-insulated substation feeding the entire DLF CyberCity commercial campus with N+1 redundancy and automated SCADA-controlled switching.',
        specs: ['132KV GIS Indoor', 'N+1 Redundancy', 'SCADA Controlled']
    },
    {
        id: 'godrej-residential-township',
        title: 'Godrej Reserve — 22-Acre Township Electrification',
        location: 'Kandivali East, Mumbai',
        category: 'LT & HT WORKS',
        sector: 'Residential',
        status: 'COMPLETED',
        value: '₹38 Cr',
        year: 2022,
        imageUrl: '/projects/6.webp',
        mobileImageUrl: '/projects-mobile/6.webp',
        description: 'Complete LT & HT electrification of a 22-acre gated residential township including underground HT cabling, transformer rooms, LT panels, and landscape lighting.',
        specs: ['22-Acre UG Network', '6 Transformer Rooms', 'Smart Metering']
    },
    {
        id: 'wipro-sec-campus',
        title: 'Wipro SEZ Campus Expansion — Bengaluru',
        location: 'Electronic City, Bengaluru',
        category: 'LT & HT WORKS',
        sector: 'IT Buildings',
        status: 'UPCOMING',
        value: '₹92 Cr',
        year: 2025,
        imageUrl: '/projects/7.webp',
        mobileImageUrl: '/projects-mobile/7.webp',
        description: 'New electrical infrastructure for a 500,000 sqft SEZ campus expansion: 33KV intake substation, UPS systems, data center power, and EV charging bays.',
        specs: ['33KV Intake Sub', '2MW UPS Systems', 'EV Charging Bays']
    },
    {
        id: 'jw-marriott-aerocity',
        title: 'JW Marriott Hotel — 5-Star Luxury',
        location: 'Aerocity, New Delhi',
        category: 'LT & HT WORKS',
        sector: 'Hotels',
        status: 'COMPLETED',
        value: '₹55 Cr',
        year: 2020,
        imageUrl: '/projects/8.webp',
        mobileImageUrl: '/projects-mobile/8.webp',
        description: 'Full MEP electrical works for a 5-star luxury hotel: HT intake, LT distribution, guest room wiring, ballroom mood lighting, pool lighting, and emergency systems.',
        specs: ['Full HT/LT MEP', 'DALI Mood Lighting', 'Emergency Systems']
    },
    {
        id: 'hcl-tech-park-noida',
        title: 'HCL Tech Park Phase 2 — IT Campus',
        location: 'Sector 126, Noida',
        category: 'LT & HT WORKS',
        sector: 'IT Buildings',
        status: 'COMPLETED',
        value: '₹78 Cr',
        year: 2021,
        imageUrl: '/projects/9.webp',
        mobileImageUrl: '/projects-mobile/9.webp',
        description: 'Phase 2 electrical fit-out of HCL Tech Park including 33KV substation, UPS critical power, data centre power distribution, and façade architectural lighting.',
        specs: ['33KV Substation', 'Critical Power UPS', 'Façade Lighting']
    },
    {
        id: 'naman-midtown-tower',
        title: 'Naman Midtown — Mixed-Use Supertall',
        location: 'Lower Parel, Mumbai',
        category: 'HT INFRASTRUCTURE',
        sector: 'High-Rise',
        status: 'ONGOING',
        value: '₹195 Cr',
        year: 2024,
        imageUrl: '/projects/10.webp',
        mobileImageUrl: '/projects-mobile/10.webp',
        description: 'HT/LT works for a 60-storey mixed-use supertall including 33KV primary intake, riser systems, tenant metering, retail podium power, and intelligent BMS integration.',
        specs: ['33KV Intake', '60 Floors Riser', 'BMS Integration']
    },
    {
        id: 'oberoi-skyz-worli',
        title: 'Oberoi Skyz — 60-Storey Commercial',
        location: 'Worli, Mumbai',
        category: 'HT INFRASTRUCTURE',
        sector: 'High-Rise',
        status: 'COMPLETED',
        value: '₹168 Cr',
        year: 2022,
        imageUrl: '/projects/11.webp',
        mobileImageUrl: '/projects-mobile/11.webp',
        description: 'Complete electrical works for a 60-storey premium commercial tower: dual-source 33KV supply, rising mains, floor-wise LT panels, and emergency diesel backup.',
        specs: ['Dual 33KV Source', 'Rising Main System', 'DG Backup 2×1MW']
    },
    {
        id: 'one-bkc-tower',
        title: 'One BKC Tower — 42-Storey Commercial',
        location: 'Bandra Kurla Complex, Mumbai',
        category: 'HT INFRASTRUCTURE',
        sector: 'High-Rise',
        status: 'COMPLETED',
        value: '₹130 Cr',
        year: 2021,
        imageUrl: '/projects/12.webp',
        mobileImageUrl: '/projects-mobile/12.webp',
        description: 'Turnkey HT/LT electrical works for a Grade-A commercial tower including 33KV substation, bus duct rising mains, floor distribution, and intelligent façade lighting control.',
        specs: ['33KV Substation', 'Bus Duct Rising Mains', 'Intelligent Façade']
    },
    {
        id: 'dlf-the-crest-gurgaon',
        title: 'DLF The Crest — Premium Gated Community',
        location: 'Sector 54, Gurugram',
        category: 'LT & HT WORKS',
        sector: 'Residential',
        status: 'COMPLETED',
        value: '₹44 Cr',
        year: 2020,
        imageUrl: '/projects/1.webp',
        mobileImageUrl: '/projects-mobile/13.webp',
        description: 'LT & HT electrical infrastructure for DLF The Crest, a premium high-rise residential community — including HV intake, underground distribution, landscape and podium lighting.',
        specs: ['HV Underground Network', 'Landscape Lighting', 'EV Ready Parking']
    },
    {
        id: 'lodha-world-one',
        title: 'Lodha World One — 117-Storey Tower',
        location: 'Lower Parel, Mumbai',
        category: 'HT INFRASTRUCTURE',
        sector: 'High-Rise',
        status: 'COMPLETED',
        value: '₹280 Cr',
        year: 2023,
        imageUrl: '/projects/2.webp',
        mobileImageUrl: '/projects-mobile/14.webp',
        description: 'Electrical systems for one of India\'s tallest towers: 33KV dual-feed substation, 117-floor riser infrastructure, apartment wiring, sky lobby systems, and building automation integration.',
        specs: ['33KV Dual Feed', '117-Floor Riser', 'Sky Lobby Systems']
    },
    {
        id: 'hyatt-regency-chennai',
        title: 'Hyatt Regency — International Hotel',
        location: 'Anna Salai, Chennai',
        category: 'LT & HT WORKS',
        sector: 'Hotels',
        status: 'COMPLETED',
        value: '₹48 Cr',
        year: 2019,
        imageUrl: '/projects/3.webp',
        mobileImageUrl: '/projects-mobile/15.webp',
        description: 'Complete HT/LT electrical fit-out for a 5-star international hotel including 11KV intake, DALI lighting scenes, ballroom control, kitchen power, and full emergency systems.',
        specs: ['11KV Intake Sub', 'DALI Scene Control', 'Full Emergency Sys.']
    },
    {
        id: 'cochin-shipyard-lighting',
        title: 'Cochin Shipyard — Industrial Lighting Upgrade',
        location: 'Cochin, Kerala',
        category: 'LIGHTING SYSTEMS',
        sector: 'Infrastructure',
        status: 'COMPLETED',
        value: '₹22 Cr',
        year: 2021,
        imageUrl: '/projects/4.webp',
        mobileImageUrl: '/projects-mobile/16.webp',
        description: 'High-bay and floodlighting retrofit at Cochin Shipyard replacing legacy HPSV luminaires with 2700 LED high-bays and 40 high-mast towers with remote monitoring.',
        specs: ['2,700 LED High-Bays', '40 High-Mast Towers', 'Remote Monitoring']
    },
    {
        id: 'bangalore-metro-green-line',
        title: 'Bangalore Metro — Green Line Traction Sub',
        location: 'Silk Board–Bommasandra, Bengaluru',
        category: 'HT INFRASTRUCTURE',
        sector: 'Infrastructure',
        status: 'ONGOING',
        value: '₹380 Cr',
        year: 2025,
        imageUrl: '/projects/5.webp',
        mobileImageUrl: '/projects-mobile/1.webp',
        description: '25KV AC traction substations, return current systems, OHE stagger wiring, and HT auxiliary substations for the new Green Line metro extension.',
        specs: ['25KV Traction', 'OHE Stagger Wiring', 'Aux. Substations']
    },
    {
        id: 'prestige-shantiniketan',
        title: 'Prestige Shantiniketan — Integrated Township',
        location: 'Whitefield, Bengaluru',
        category: 'LT & HT WORKS',
        sector: 'Residential',
        status: 'COMPLETED',
        value: '₹67 Cr',
        year: 2020,
        imageUrl: '/projects/6.webp',
        mobileImageUrl: '/projects-mobile/2.webp',
        description: 'Complete township electrification: HT ring main network, 12 transformer zones, LT distribution, street lighting, and clubhouse DALI lighting scenes.',
        specs: ['HT Ring Main', '12 Transformer Zones', 'DALI Clubhouse']
    }
];

export const ADVANTAGES_DATA: AdvantageItem[] = [
    {
        id: 'safety-first',
        title: 'Safety First Culture',
        description: 'Zero lost-time incident record for 8 consecutive years across all national project sites.',
        iconName: 'Shield'
    },
    {
        id: 'on-time',
        title: 'On-Time Delivery',
        description: '98.2% on-schedule project completion rate, backed by agile engineering management workflows.',
        iconName: 'Clock'
    },
    {
        id: 'certified-quality',
        title: 'Certified Quality',
        description: 'ISO 9001:2015 and ISO 45001:2018 registered processes with rigorous audit traceability.',
        iconName: 'Award'
    },
    {
        id: 'expert-workforce',
        title: 'Expert Workforce',
        description: 'Over 120+ licensed electrical engineers and 450+ certified technicians with rigorous safety training.',
        iconName: 'Users'
    },
    {
        id: 'competitive-pricing',
        title: 'Competitive Pricing',
        description: 'Value-engineered solutions that optimize resource cost without sacrificing premium design or component safety.',
        iconName: 'TrendingUp'
    },
    {
        id: 'pan-india',
        title: 'Pan-India Presence',
        description: 'Active nationwide operations spanning 18 states with strategically placed regional deployment teams.',
        iconName: 'Map'
    }
];

export const CLIENTS_DATA: ClientLogo[] = [
    { name: 'L&T', role: 'Engineering' },
    { name: 'TATA', role: 'Projects' },
    { name: 'NHAI', role: 'Highways' },
    { name: 'MMRDA', role: 'Metro Rail' },
    { name: 'AECOM', role: 'Infrastructure' },
    { name: 'GMR', role: 'Airports' }
];
