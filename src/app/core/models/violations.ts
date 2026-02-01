export type ViolationEvidence = {
  id: string;
  label: string;
  type: 'Photo' | 'Document' | 'Log' | 'Video';
  status: 'Verified' | 'Pending' | 'Missing';
  date: string;
};

export type ViolationTimelineEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  actor: string;
};

export type ViolationDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  regulation: string;
  assignedTo: string;
  lastUpdated: string;
  location: string;
  impact: string;
  nextReview: string;
  evidence: ViolationEvidence[];
  timeline: ViolationTimelineEvent[];
};
