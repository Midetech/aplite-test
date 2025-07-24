export type Vendor = {
    id: string;
    companyName: string;
    industry: string;
    location: string;
    verificationStatus: 'verified' | 'pending';
    dateAdded: string;
    logoUrl?: string;
}
