export const mockStats = [
  { label: 'Active Briefs', value: '12', change: '+2', trend: 'up' },
  { label: 'Scheduled Today', value: '4', change: '0', trend: 'neutral' },
  { label: 'Published (24h)', value: '28', change: '+5', trend: 'up' },
  { label: 'Social Score', value: '94%', change: '+1.2%', trend: 'up' }
];

export const pipelineData = [
  {
    id: 'draft',
    title: 'Idea / Draft',
    count: 5,
    items: [
      { id: 1, title: 'Global Tech Summit 2026', author: 'Alex Reed', priority: 'High' },
      { id: 2, title: 'Renewable Energy Shifts', author: 'Sarah Chen', priority: 'Medium' }
    ]
  },
  {
    id: 'fact-check',
    title: 'Fact Check',
    count: 3,
    items: [
      { id: 3, title: 'Local Election Polls', author: 'James Wilson', priority: 'High' }
    ]
  },
  {
    id: 'review',
    title: 'Editor Review',
    count: 2,
    items: [
      { id: 4, title: 'Modern Architecture Trends', author: 'Elena Rose', priority: 'Low' }
    ]
  },
  {
    id: 'ready',
    title: 'Ready to Post',
    count: 2,
    items: [
      { id: 5, title: 'Sustainable Living Guide', author: 'Michael Scott', priority: 'Medium' }
    ]
  }
];

export const feedActions = [
  { id: 1, user: 'Elena Rose', action: 'submitted', target: 'Modern Architecture Trends', time: '12m ago' },
  { id: 2, user: 'James Wilson', action: 'updated', target: 'Local Election Polls', time: '25m ago' },
  { id: 3, user: 'System', action: 'alert', target: 'Server load high in AP-South', time: '40m ago' },
  { id: 4, user: 'Alex Reed', action: 'started', target: 'Global Tech Summit 2026', time: '1h ago' }
];

export const rundownItems = [
  { id: 1, time: '14:30', title: 'Daily Brief: Afternoon Edition', type: 'Newsletter' },
  { id: 2, time: '16:00', title: 'Tech Pulse Video Update', type: 'Social' },
  { id: 3, time: '18:00', title: 'The Big Read: Green Energy', type: 'Article' }
];
