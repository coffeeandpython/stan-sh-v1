import { Inspector, Builder, AdminKPI, ActivityFeed, CorrectionRequest, Report } from '../types';

export const mockInspectors: Inspector[] = [
  {
    id: 'inspector-1',
    name: 'David Chen',
    email: 'david.chen@systemhause.com',
    phone: '(555) 111-2222',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    specialties: ['pre-rock', 'poly-test', 'final'],
    serviceAreas: ['Meadow Park', 'Stone Haven', 'Oak Ridge'],
    currentWorkload: 8,
    maxDailyInspections: 12,
    completionRate: 94.5,
    avgInspectionTime: 87,
    rating: 4.8,
    totalInspections: 1247,
    createdAt: '2023-01-15',
    updatedAt: '2025-10-05'
  },
  {
    id: 'inspector-2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@systemhause.com',
    phone: '(555) 333-4444',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: true,
    specialties: ['pre-rock', 'final', 'blower-door'],
    serviceAreas: ['Winding Creek', 'Sunset Hills', 'Pine Valley'],
    currentWorkload: 6,
    maxDailyInspections: 10,
    completionRate: 97.2,
    avgInspectionTime: 76,
    rating: 4.9,
    totalInspections: 892,
    createdAt: '2023-03-22',
    updatedAt: '2025-10-05'
  },
  {
    id: 'inspector-4',
    name: 'Jennifer Walsh',
    email: 'jennifer.walsh@systemhause.com',
    phone: '(555) 777-8888',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isActive: false,
    specialties: ['pre-rock', 'poly-test'],
    serviceAreas: ['Stone Haven', 'Winding Creek'],
    currentWorkload: 0,
    maxDailyInspections: 8,
    completionRate: 89.3,
    avgInspectionTime: 102,
    rating: 4.5,
    totalInspections: 634,
    createdAt: '2024-02-14',
    updatedAt: '2025-09-20'
  }
];

export const mockBuilders: Builder[] = [
  {
    id: 'builder-1',
    companyName: 'MI Homes',
    contactName: 'John Davis',
    email: 'john.davis@mihomes.com',
    phone: '(555) 200-3000',
    domain: 'mihomes.com',
    communities: ['Meadow Park', 'Stone Haven', 'Heritage Hills'],
    isActive: true,
    totalProperties: 847,
    correctionRate: 2.4,
    notes: 'Premium builder - priority scheduling',
    createdAt: '2022-08-15',
    updatedAt: '2025-10-05'
  },
  {
    id: 'builder-2',
    companyName: 'Windsor Homes',
    contactName: 'Lisa Thompson',
    email: 'lisa.thompson@windsorhomes.com',
    phone: '(555) 300-4000',
    domain: 'windsorhomes.com',
    communities: ['Winding Creek', 'Sunset Hills', 'Oak Ridge'],
    isActive: true,
    totalProperties: 623,
    correctionRate: 3.1,
    createdAt: '2023-01-20',
    updatedAt: '2025-10-04'
  },
  {
    id: 'builder-3',
    companyName: 'HL Homes',
    contactName: 'Mark Rodriguez',
    email: 'mark@hlhomes.com',
    phone: '(555) 400-5000',
    domain: 'hlhomes.com',
    communities: ['Pine Valley', 'Heritage Hills'],
    isActive: true,
    totalProperties: 234,
    correctionRate: 1.8,
    createdAt: '2023-06-10',
    updatedAt: '2025-10-03'
  },
  {
    id: 'builder-4',
    companyName: 'Sunrise Builders',
    contactName: 'Amanda Chen',
    email: 'amanda@sunrisebuilders.com',
    phone: '(555) 500-6000',
    domain: 'sunrisebuilders.com',
    communities: ['Sunset Hills', 'Meadow Park'],
    isActive: true,
    totalProperties: 156,
    correctionRate: 2.3,
    createdAt: '2024-03-05',
    updatedAt: '2025-10-02'
  },
  {
    id: 'builder-5',
    companyName: 'Elite Homes',
    contactName: 'Robert Martinez',
    email: 'robert@elitehomes.com',
    phone: '(555) 600-7000',
    domain: 'elitehomes.com',
    communities: ['Stone Haven', 'Oak Ridge'],
    isActive: false,
    totalProperties: 89,
    correctionRate: 5.1,
    notes: 'Specialized in luxury custom homes - currently on project hiatus',
    createdAt: '2023-09-12',
    updatedAt: '2025-08-15'
  }
];

export const mockAdminKPI: AdminKPI = {
  totalProperties: 3247,
  activeInspections: 187,
  pendingActions: 23,
  inspectorUtilization: 78.5,
  monthlyRevenue: 487500,
  completedThisMonth: 156,
  avgDaysPerStage: 8.7,
  overdueInspections: 12
};

export const mockActivityFeed: ActivityFeed[] = [
  {
    id: 'activity-1',
    type: 'inspection',
    title: 'Pre-rock inspection failed',
    description: '7612 Spicebush Drive - Electrical panel wiring issues',
    timestamp: '2025-10-05T10:30:00Z',
    priority: 'high',
    propertyId: '3',
    status: 'failed'
  },
  {
    id: 'activity-2',
    type: 'correction',
    title: 'Correction photos submitted',
    description: '7890 Heritage Oak Street - HVAC corrections uploaded by Lisa Rodriguez',
    timestamp: '2025-10-05T09:15:00Z',
    priority: 'medium',
    propertyId: '8',
    status: 'pending'
  },
  {
    id: 'activity-3',
    type: 'inspection',
    title: 'Final inspection completed',
    description: '5432 Pine Valley Lane - Passed with certificate issued',
    timestamp: '2025-10-05T08:45:00Z',
    priority: 'low',
    propertyId: '7',
    status: 'passed'
  },
  {
    id: 'activity-4',
    type: 'property',
    title: 'New property added',
    description: '9876 Sunset Ridge Court - MI Homes, Meadow Park',
    timestamp: '2025-10-05T07:20:00Z',
    priority: 'low',
    propertyId: '9',
    status: 'pending'
  },
  {
    id: 'activity-5',
    type: 'system',
    title: 'Inspector schedule updated',
    description: 'David Chen assigned 3 new inspections for Oct 6th',
    timestamp: '2025-10-04T16:30:00Z',
    priority: 'low',
    userId: 'inspector-1',
    status: 'scheduled'
  },
  {
    id: 'activity-6',
    type: 'builder',
    title: 'New builder registered',
    description: 'Highland Construction - New builder account activated',
    timestamp: '2025-10-04T14:00:00Z',
    priority: 'low',
    userId: 'builder-3',
    status: 'active'
  },
  {
    id: 'activity-7',
    type: 'inspection',
    title: 'Poly test scheduled',
    description: '2156 Sunset Hills Drive - Michael Rodriguez assigned',
    timestamp: '2025-10-04T11:15:00Z',
    priority: 'low',
    propertyId: '6',
    status: 'scheduled'
  },
  {
    id: 'activity-8',
    type: 'correction',
    title: 'Correction approved',
    description: '4521 Maple Grove Lane - Electrical fixes approved by Sarah Mitchell',
    timestamp: '2025-10-04T09:30:00Z',
    priority: 'low',
    propertyId: '4',
    status: 'approved'
  }
];

export const mockCorrectionRequests: CorrectionRequest[] = [
  {
    id: 'correction-1',
    propertyId: '3',
    inspectionId: '4',
    issueId: '1',
    builderNotes: 'Electrical panel has been rewired according to code. Licensed electrician completed work.',
    photos: [
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
      'imgs/a1.jpg'
    ],
    status: 'pending',
    submittedDate: '2025-10-04T14:30:00Z'
  },
  {
    id: 'correction-2',
    propertyId: '8',
    inspectionId: '8',
    issueId: '2',
    builderNotes: 'HVAC ductwork has been properly secured with additional supports as required.',
    photos: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'pending',
    submittedDate: '2025-10-05T09:15:00Z'
  },
  {
    id: 'correction-3',
    propertyId: '1',
    inspectionId: '1',
    issueId: '3',
    builderNotes: 'Plumbing connections tightened and pressure tested.',
    photos: [
      'https://images.pexels.com/photos/4246606/pexels-photo-4246606.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'approved',
    submittedDate: '2025-10-03T11:00:00Z',
    reviewedDate: '2025-10-03T15:30:00Z',
    reviewedBy: 'David Chen',
    reviewNotes: 'Corrections look good. Approved for next stage.'
  }
];

export const mockReports: Report[] = [
  {
    id: 'report-1',
    name: 'Monthly Properties Report - September 2025',
    type: 'properties',
    description: 'Summary of all property inspections completed in September',
    filters: { month: '2025-09', status: 'all' },
    generatedDate: '2025-10-01T09:00:00Z',
    data: [],
    format: 'pdf',
    url: '/reports/monthly-properties-sep-2025.pdf'
  },
  {
    id: 'report-2',
    name: 'Builder Performance Q3 2025',
    type: 'builders',
    description: 'Quarterly performance metrics for all active builders',
    filters: { quarter: '2025-Q3', builders: 'all' },
    generatedDate: '2025-10-02T10:30:00Z',
    data: [],
    format: 'excel',
    url: '/reports/builder-performance-q3-2025.xlsx'
  },
  {
    id: 'report-3',
    name: 'Inspector Productivity Analysis',
    type: 'performance',
    description: 'Individual inspector performance and workload analysis',
    filters: { dateRange: '2025-07-01:2025-09-30', inspectors: 'all' },
    generatedDate: '2025-10-03T14:15:00Z',
    data: [],
    format: 'pdf',
    url: '/reports/inspector-productivity-q3-2025.pdf'
  },
  {
    id: 'report-4',
    name: 'Revenue Analysis - YTD 2025',
    type: 'revenue',
    description: 'Year-to-date revenue breakdown by builder and community',
    filters: { year: '2025', breakdown: 'builder-community' },
    generatedDate: '2025-10-04T08:00:00Z',
    data: [],
    format: 'excel',
    url: '/reports/revenue-analysis-ytd-2025.xlsx'
  }
];

export const communities = [
  'Meadow Park',
  'Stone Haven',
  'Winding Creek',
  'Sunset Hills',
  'Oak Ridge',
  'Pine Valley',
  'Heritage Hills'
];

export const municipalities = [
  'Allen', 'Plano', 'Frisco', 'McKinney', 'Richardson', 'Garland', 'Irving',
  'Grand Prairie', 'Mesquite', 'Carrollton', 'Lewisville', 'Flower Mound',
  'Coppell', 'Farmers Branch', 'Addison', 'University Park', 'Highland Park',
  'Southlake', 'Colleyville', 'Grapevine', 'Euless', 'Bedford', 'Hurst',
  'North Richland Hills', 'Keller', 'Trophy Club', 'Roanoke', 'Westlake',
  'Double Oak', 'Bartonville', 'Copper Canyon', 'Highland Village'
];