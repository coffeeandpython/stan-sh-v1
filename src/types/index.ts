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

export interface Inspector {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  specialties: ('pre-rock' | 'poly-test' | 'final' | 'blower-door')[];
  serviceAreas: string[];
  currentWorkload: number;
  maxDailyInspections: number;
  completionRate: number;
  avgInspectionTime: number;
  rating: number;
  totalInspections: number;
  createdAt: string;
  updatedAt: string;
}

export interface Builder {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  domain: string;
  communities: string[];
  isActive: boolean;
  totalProperties: number;
  correctionRate: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminKPI {
  totalProperties: number;
  activeInspections: number;
  pendingActions: number;
  inspectorUtilization: number;
  monthlyRevenue: number;
  completedThisMonth: number;
  avgDaysPerStage: number;
  overdueInspections: number;
}

export interface ActivityFeed {
  id: string;
  type: 'inspection' | 'correction' | 'property' | 'builder' | 'system';
  title: string;
  description: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  propertyId?: string;
  userId?: string;
  status?: string;
}

export interface CorrectionRequest {
  id: string;
  propertyId: string;
  inspectionId: string;
  issueId: string;
  builderNotes?: string;
  photos: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'properties' | 'inspections' | 'builders' | 'revenue' | 'performance';
  description: string;
  filters: Record<string, any>;
  generatedDate: string;
  data: any[];
  format: 'pdf' | 'excel' | 'csv';
  url?: string;
}