import { Property, Inspection } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    address: '7125 Adderly Road',
    community: 'Meadow Park',
    planNumber: 'MP-2341',
    stage: 'poly-test',
    status: 'in-progress',
    closingDate: '2025-03-15',
    siteContact: {
      name: 'Mike Johnson',
      phone: '(555) 123-4567'
    },
    notes: 'Rush job - customer closing early',
    photos: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [
      {
        id: '1',
        name: 'Pre-Rock Certificate',
        type: 'certificate',
        url: '/documents/pre-rock-cert.pdf',
        uploadDate: '2024-01-15',
        size: 245760
      }
    ],
    createdAt: '2025-09-20',
    updatedAt: '2025-09-25'
  },
  {
    id: '2',
    address: '1408 Quasar Drive',
    community: 'Winding Creek',
    planNumber: 'WC-1892',
    stage: 'final',
    status: 'passed',
    closingDate: '2025-02-28',
    siteContact: {
      name: 'Sarah Wilson',
      phone: '(555) 987-6543'
    },
    photos: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [
      {
        id: '2',
        name: 'Final Inspection Report',
        type: 'report',
        url: '/documents/final-inspection.pdf',
        uploadDate: '2024-01-25',
        size: 512000
      },
      {
        id: '3',
        name: 'Energy Certificate',
        type: 'certificate',
        url: '/documents/energy-cert.pdf',
        uploadDate: '2024-01-25',
        size: 156000
      }
    ],
    createdAt: '2025-09-18',
    updatedAt: '2025-09-28'
  },
  {
    id: '3',
    address: '7612 Spicebush Drive',
    community: 'Stone Haven',
    planNumber: 'SH-4456',
    stage: 'pre-rock',
    status: 'failed',
    closingDate: '2025-04-10',
    siteContact: {
      name: 'Tom Bradley',
      phone: '(555) 456-7890'
    },
    notes: 'Needs electrical corrections before poly test',
    photos: [
      'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [],
    createdAt: '2025-09-22',
    updatedAt: '2025-09-30'
  },
  {
    id: '4',
    address: '4521 Maple Grove Lane',
    community: 'Meadow Park',
    planNumber: 'MP-2387',
    stage: 'complete',
    status: 'passed',
    closingDate: '2025-01-30',
    siteContact: {
      name: 'Jennifer Lee',
      phone: '(555) 321-9876'
    },
    photos: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [
      {
        id: '4',
        name: 'Certificate of Completion',
        type: 'certificate',
        url: '/documents/completion-cert.pdf',
        uploadDate: '2024-01-30',
        size: 198000
      }
    ],
    createdAt: '2025-09-15',
    updatedAt: '2025-10-05'
  },
  {
    id: '5',
    address: '8934 Timber Ridge Court',
    community: 'Oak Ridge',
    planNumber: 'OR-3421',
    stage: 'pre-rock',
    status: 'pending',
    closingDate: '2025-05-20',
    siteContact: {
      name: 'Robert Martinez',
      phone: '(555) 654-3210'
    },
    photos: [
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [],
    createdAt: '2025-09-25',
    updatedAt: '2025-09-25'
  },
  {
    id: '6',
    address: '2156 Sunset Hills Drive',
    community: 'Sunset Hills',
    planNumber: 'SH-5678',
    stage: 'poly-test',
    status: 'scheduled',
    closingDate: '2025-04-15',
    siteContact: {
      name: 'Amanda Chen',
      phone: '(555) 789-0123'
    },
    photos: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [],
    createdAt: '2025-09-28',
    updatedAt: '2025-10-02'
  },
  {
    id: '7',
    address: '5432 Pine Valley Lane',
    community: 'Pine Valley',
    planNumber: 'PV-9876',
    stage: 'final',
    status: 'in-progress',
    closingDate: '2025-03-30',
    siteContact: {
      name: 'Kevin Thompson',
      phone: '(555) 456-7891'
    },
    photos: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [
      {
        id: '5',
        name: 'Pre-Rock Certificate',
        type: 'certificate',
        url: '/documents/pre-rock-cert-pv.pdf',
        uploadDate: '2025-09-30',
        size: 198000
      }
    ],
    createdAt: '2025-09-16',
    updatedAt: '2025-10-01'
  },
  {
    id: '8',
    address: '7890 Heritage Oak Street',
    community: 'Meadow Park',
    planNumber: 'MP-4567',
    stage: 'pre-rock',
    status: 'failed',
    closingDate: '2025-06-10',
    siteContact: {
      name: 'Lisa Rodriguez',
      phone: '(555) 234-5678'
    },
    notes: 'HVAC rough-in needs corrections',
    photos: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    documents: [],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-03'
  }
];

export const mockInspections: Inspection[] = [
  {
    id: '1',
    propertyId: '1',
    type: 'pre-rock',
    status: 'passed',
    scheduledDate: '2025-09-25T09:00:00Z',
    completedDate: '2025-09-25T10:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'All electrical and plumbing rough-in approved',
    photos: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reportUrl: '/reports/pre-rock-1.pdf',
    createdAt: '2025-09-20',
    updatedAt: '2025-09-25'
  },
  {
    id: '2',
    propertyId: '1',
    type: 'poly-test',
    status: 'in-progress',
    scheduledDate: '2025-10-05T14:00:00Z',
    inspector: {
      name: 'Lisa Rodriguez',
      phone: '(555) 333-4444',
      email: 'lisa.rodriguez@systemhause.com'
    },
    notes: 'Scheduled for this afternoon',
    photos: [],
    createdAt: '2025-10-02',
    updatedAt: '2025-10-02'
  },
  {
    id: '3',
    propertyId: '2',
    type: 'final',
    status: 'passed',
    scheduledDate: '2025-09-28T11:00:00Z',
    completedDate: '2025-09-28T12:45:00Z',
    inspector: {
      name: 'Mark Thompson',
      phone: '(555) 555-6666',
      email: 'mark.thompson@systemhause.com'
    },
    notes: 'All systems operational, certificate issued',
    photos: [
      'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reportUrl: '/reports/final-2.pdf',
    createdAt: '2025-09-25',
    updatedAt: '2025-09-28'
  },
  {
    id: '4',
    propertyId: '3',
    type: 'pre-rock',
    status: 'failed',
    scheduledDate: '2025-09-30T10:00:00Z',
    completedDate: '2025-09-30T11:15:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Electrical panel needs corrections - see attached photos',
    photos: [
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reportUrl: '/reports/pre-rock-3.pdf',
    issues: [
      {
        id: '1',
        description: 'Electrical panel wiring not to code',
        severity: 'high',
        location: 'Basement electrical room',
        photos: [
          'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        resolved: false
      }
    ],
    createdAt: '2025-09-28',
    updatedAt: '2025-09-30'
  },
  {
    id: '5',
    propertyId: '5',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-10-08T09:30:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 777-8888',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Initial pre-rock inspection scheduled',
    photos: [],
    createdAt: '2025-09-25',
    updatedAt: '2025-09-25'
  },
  {
    id: '6',
    propertyId: '6',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-10-06T13:00:00Z',
    inspector: {
      name: 'Michael Davis',
      phone: '(555) 999-0000',
      email: 'michael.davis@systemhause.com'
    },
    notes: 'Poly test scheduled for afternoon',
    photos: [],
    createdAt: '2025-09-28',
    updatedAt: '2025-10-02'
  },
  {
    id: '7',
    propertyId: '7',
    type: 'final',
    status: 'in-progress',
    scheduledDate: '2025-10-04T10:00:00Z',
    inspector: {
      name: 'Jennifer Walsh',
      phone: '(555) 111-2222',
      email: 'jennifer.walsh@systemhause.com'
    },
    notes: 'Final inspection in progress',
    photos: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    createdAt: '2025-09-16',
    updatedAt: '2025-10-04'
  },
  {
    id: '8',
    propertyId: '8',
    type: 'pre-rock',
    status: 'failed',
    scheduledDate: '2025-10-03T11:00:00Z',
    completedDate: '2025-10-03T12:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'HVAC rough-in failed inspection - corrections needed',
    photos: [
      'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reportUrl: '/reports/pre-rock-8.pdf',
    issues: [
      {
        id: '2',
        description: 'HVAC ductwork not properly secured',
        severity: 'medium',
        location: 'Basement mechanical room',
        photos: [
          'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        resolved: false
      }
    ],
    createdAt: '2025-09-20',
    updatedAt: '2025-10-03'
  },
  // Additional inspections for better calendar display
  {
    id: '9',
    propertyId: '3',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-01-20T09:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Initial pre-rock inspection',
    photos: [],
    createdAt: '2025-01-18',
    updatedAt: '2025-01-18'
  },
  {
    id: '10',
    propertyId: '4',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-01-20T14:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Poly test scheduled',
    photos: [],
    createdAt: '2025-01-18',
    updatedAt: '2025-01-18'
  },
  {
    id: '11',
    propertyId: '5',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-01-21T10:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final inspection',
    photos: [],
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19'
  },
  {
    id: '12',
    propertyId: '6',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-01-21T15:30:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Blower door test',
    photos: [],
    createdAt: '2025-01-19',
    updatedAt: '2025-01-19'
  },
  {
    id: '13',
    propertyId: '2',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-01-22T09:00:00Z',
    inspector: {
      name: 'Jennifer Walsh',
      phone: '(555) 777-8888',
      email: 'jennifer.walsh@systemhause.com'
    },
    notes: 'Follow-up pre-rock inspection',
    photos: [],
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20'
  },
  {
    id: '14',
    propertyId: '7',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-01-22T11:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Poly test - second attempt',
    photos: [],
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20'
  },
  {
    id: '15',
    propertyId: '8',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-01-22T16:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Final inspection for certification',
    photos: [],
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20'
  },
  {
    id: '16',
    propertyId: '1',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-01-23T08:30:00Z',
    inspector: {
      name: 'Jennifer Walsh',
      phone: '(555) 777-8888',
      email: 'jennifer.walsh@systemhause.com'
    },
    notes: 'Blower door test for energy efficiency',
    photos: [],
    createdAt: '2025-01-21',
    updatedAt: '2025-01-21'
  },
  {
    id: '17',
    propertyId: '3',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-01-23T13:15:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final walkthrough and certification',
    photos: [],
    createdAt: '2025-01-21',
    updatedAt: '2025-01-21'
  },

  // September 2025 Events
  {
    id: '18',
    propertyId: '1',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-05T08:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Pre-rock inspection - new construction',
    photos: [],
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01'
  },
  {
    id: '19',
    propertyId: '2',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-09-05T14:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Poly test inspection',
    photos: [],
    createdAt: '2025-09-01',
    updatedAt: '2025-09-01'
  },
  {
    id: '20',
    propertyId: '3',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-09-10T10:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final inspection before certification',
    photos: [],
    createdAt: '2025-09-05',
    updatedAt: '2025-09-05'
  },
  {
    id: '21',
    propertyId: '4',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-12T09:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Initial pre-rock inspection',
    photos: [],
    createdAt: '2025-09-08',
    updatedAt: '2025-09-08'
  },
  {
    id: '22',
    propertyId: '5',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-09-15T11:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Blower door test for energy efficiency',
    photos: [],
    createdAt: '2025-09-10',
    updatedAt: '2025-09-10'
  },
  {
    id: '23',
    propertyId: '6',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-09-18T15:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Polymer test inspection',
    photos: [],
    createdAt: '2025-09-12',
    updatedAt: '2025-09-12'
  },
  {
    id: '24',
    propertyId: '7',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-09-22T13:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final walkthrough inspection',
    photos: [],
    createdAt: '2025-09-18',
    updatedAt: '2025-09-18'
  },
  {
    id: '25',
    propertyId: '8',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-25T08:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Pre-rock inspection for new build',
    photos: [],
    createdAt: '2025-09-20',
    updatedAt: '2025-09-20'
  },
  {
    id: '26',
    propertyId: '1',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-09-28T14:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Energy efficiency testing',
    photos: [],
    createdAt: '2025-09-24',
    updatedAt: '2025-09-24'
  },

  // Current Date Events (Today and next few days for demo)
  {
    id: '27',
    propertyId: '1',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-19T08:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Morning pre-rock inspection - priority job',
    photos: [],
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-18T10:00:00Z'
  },
  {
    id: '28',
    propertyId: '2',
    type: 'poly-test',
    status: 'in-progress',
    scheduledDate: '2025-09-19T14:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Poly test - follow up from yesterday',
    photos: ['https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=400'],
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },
  {
    id: '29',
    propertyId: '3',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-09-19T16:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final inspection before certification',
    photos: [],
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-18T10:00:00Z'
  },
  {
    id: '30',
    propertyId: '4',
    type: 'blower-door',
    status: 'passed',
    scheduledDate: '2025-09-19T09:00:00Z',
    completedDate: '2025-09-19T09:30:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Blower door test completed successfully - excellent results',
    photos: [
      'https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    reportUrl: '/reports/blower-door-4.pdf',
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-19T09:30:00Z'
  },
  {
    id: '31',
    propertyId: '5',
    type: 'pre-rock',
    status: 'failed',
    scheduledDate: '2025-09-19T11:00:00Z',
    completedDate: '2025-09-19T11:45:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'HVAC rough-in failed - needs corrections before re-inspection',
    photos: ['https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'],
    reportUrl: '/reports/pre-rock-5-failed.pdf',
    issues: [
      {
        id: '3',
        description: 'HVAC ductwork not properly secured - safety concern',
        severity: 'high',
        location: 'Basement mechanical room',
        photos: ['https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'],
        resolved: false
      }
    ],
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-19T11:45:00Z'
  },

  // Tomorrow's events
  {
    id: '32',
    propertyId: '6',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-20T08:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Tomorrow morning - first inspection of the day',
    photos: [],
    createdAt: '2025-09-19T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },
  {
    id: '33',
    propertyId: '7',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-09-20T10:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Poly test for new construction',
    photos: [],
    createdAt: '2025-09-19T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },
  {
    id: '34',
    propertyId: '8',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-09-20T14:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Final walkthrough - ready for certification',
    photos: [],
    createdAt: '2025-09-19T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },

  // Day after tomorrow events
  {
    id: '35',
    propertyId: '1',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-09-21T09:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Energy efficiency testing',
    photos: [],
    createdAt: '2025-09-19T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },
  {
    id: '36',
    propertyId: '2',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-09-21T11:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Follow-up pre-rock inspection',
    photos: [],
    createdAt: '2025-09-19T10:00:00Z',
    updatedAt: '2025-09-19T10:00:00Z'
  },

  // October 2025 Events (keeping some original ones)
  {
    id: '37',
    propertyId: '3',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-10-02T09:30:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Pre-rock inspection - electrical phase',
    photos: [],
    createdAt: '2025-09-28',
    updatedAt: '2025-09-28'
  },
  {
    id: '38',
    propertyId: '4',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-10-05T11:00:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Poly test - quality check',
    photos: [],
    createdAt: '2025-10-01',
    updatedAt: '2025-10-01'
  },
  {
    id: '39',
    propertyId: '5',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-10-08T16:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Final certification inspection',
    photos: [],
    createdAt: '2025-10-04',
    updatedAt: '2025-10-04'
  },
  {
    id: '40',
    propertyId: '6',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-10-12T08:45:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Pre-rock inspection - plumbing rough-in',
    photos: [],
    createdAt: '2025-10-08',
    updatedAt: '2025-10-08'
  },
  {
    id: '41',
    propertyId: '7',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-10-15T13:30:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Blower door test - air leakage',
    photos: [],
    createdAt: '2025-10-10',
    updatedAt: '2025-10-10'
  },
  {
    id: '42',
    propertyId: '8',
    type: 'poly-test',
    status: 'scheduled',
    scheduledDate: '2025-10-18T10:15:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Polymer system testing',
    photos: [],
    createdAt: '2025-10-14',
    updatedAt: '2025-10-14'
  },
  {
    id: '43',
    propertyId: '1',
    type: 'final',
    status: 'scheduled',
    scheduledDate: '2025-10-22T15:45:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Final inspection and documentation',
    photos: [],
    createdAt: '2025-10-18',
    updatedAt: '2025-10-18'
  },
  {
    id: '44',
    propertyId: '2',
    type: 'pre-rock',
    status: 'scheduled',
    scheduledDate: '2025-10-25T09:15:00Z',
    inspector: {
      name: 'David Chen',
      phone: '(555) 111-2222',
      email: 'david.chen@systemhause.com'
    },
    notes: 'Pre-rock follow-up inspection',
    photos: [],
    createdAt: '2025-10-20',
    updatedAt: '2025-10-20'
  },
  {
    id: '45',
    propertyId: '3',
    type: 'blower-door',
    status: 'scheduled',
    scheduledDate: '2025-10-28T12:00:00Z',
    inspector: {
      name: 'Sarah Mitchell',
      phone: '(555) 333-4444',
      email: 'sarah.mitchell@systemhause.com'
    },
    notes: 'Energy efficiency compliance test',
    photos: [],
    createdAt: '2025-10-24',
    updatedAt: '2025-10-24'
  }
];