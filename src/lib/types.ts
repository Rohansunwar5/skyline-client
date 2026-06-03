export interface ServiceItem {
    id: string;
    number: string;
    title: string;
    description: string;
    category: 'HT' | 'LT' | 'infrastructure' | 'lighting' | 'testing' | 'automation';
    iconName: string;
    exploreLink: string;
}

export interface ProjectItem {
    id: string;
    title: string;
    location: string;
    category: string;
    sector: string;
    imageUrl: string;
    description: string;
    specs: string[];
    status: 'COMPLETED' | 'ONGOING' | 'UPCOMING';
    value?: string;
    year?: number;
}

export interface AdvantageItem {
    id: string;
    title: string;
    description: string;
    iconName: string;
}

export interface ClientLogo {
    name: string;
    role: string;
}

export interface QuoteRequest {
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    projectType: string;
    budgetRange: string;
    message: string;
}

export interface ContactMessage {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}
