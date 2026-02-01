export type DashboardStat = {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
};

export type ChartDatum = {
  month: string;
  selfCare: number;
  intermediateCare: number;
  totalCare: number;
};

export type ViolationsTrendDatum = {
  dateRange: string;
  value: number;
};

export type RiskLevelDatum = {
  level: 'Low' | 'Medium' | 'High';
  value: number;
};

export type Appointment = {
  id: string;
  title: string;
  time: string;
  doctor: string;
  duration: string;
};

export type TestResult = {
  id: string;
  patient: string;
  test: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  date: string;
  time: string;
};

export type RecentViolation = {
  id: string;
  violation: string;
  branch: string;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Review' | 'Resolved';
  date: string;
  time: string;
};

export type DashboardData = {
  stats: DashboardStat[];
  chart: ChartDatum[];
  violationsTrend: ViolationsTrendDatum[];
  riskLevels: RiskLevelDatum[];
  appointments: Appointment[];
  recentViolations: RecentViolation[];
  tests: TestResult[];
};
