const CAMPAIGN_TEMPLATES = [
  {
    id: 'alumni-story',
    name: 'Alumni Story',
    description: 'Collect career journeys and campus memories from alumni.',
    category: 'Alumni in Spotlight',
    fields: [
      { label: 'Full name', type: 'text', required: true },
      { label: 'Current role', type: 'text', required: true },
      { label: 'Your PSG iTech story', type: 'textarea', required: true },
    ],
  },
]

export default CAMPAIGN_TEMPLATES
