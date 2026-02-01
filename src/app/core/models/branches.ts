export type BranchRiskDatum = {
  id: string;
  branch: string;
  region: string;
  manager: string;
  riskScore: number;
  complianceRate: number;
  openViolations: number;
  lastAudit: string;
  status: 'Stable' | 'Watch' | 'Critical';
};
