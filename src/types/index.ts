export interface Property {
  id: string;
  address: string;
  community: string;
  planNumber: string;
  stage: 'pre-rock' | 'poly-test' | 'final' | 'complete';
  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'scheduled';
  closingDate?: string;
  siteContact: {
    name: string;
    phone: string;
  };
  notes?: string;
  photos: string[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Inspection {
  id: string;
  propertyId: string;
  type: 'pre-rock' | 'poly-test' | 'final' | 'follow-up';
  status: 'scheduled' | 'in-progress' | 'passed' | 'failed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  inspector: {
    name: string;
    phone: string;
    email: string;
  };
  notes?: string;
  photos: string[];
  reportUrl?: string;
  issues?: Issue[];
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  photos: string[];
  resolved: boolean;
  resolvedDate?: string;
  resolvedBy?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'report' | 'photo' | 'plan' | 'other';
  url: string;
  uploadDate: string;
  size: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'builder' | 'inspector' | 'admin';
  phone: string;
  avatar?: string;
}