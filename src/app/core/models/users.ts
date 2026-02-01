export type UserRole =
  | 'Compliance Officer'
  | 'Risk Analyst'
  | 'Branch Manager'
  | 'Audit Lead'
  | 'Quality Reviewer';

export type UserStatus = 'Active' | 'On Leave' | 'Pending';

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  branch: string;
  role: UserRole;
  openCases: number;
  lastActive: string;
  status: UserStatus;
};
