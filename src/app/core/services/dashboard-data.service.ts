import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { branchRiskData } from '../data/branches.data';
import { dashboardData } from '../data/dashboard.data';
import { complianceReportData } from '../data/reports.data';
import { usersData } from '../data/users.data';
import { violationDetails } from '../data/violations.data';
import type { BranchRiskDatum } from '../models/branches';
import type { DashboardData, RecentViolation } from '../models/dashboard';
import type { ComplianceReportDatum } from '../models/reports';
import type { UserRecord } from '../models/users';
import type { ViolationDetail } from '../models/violations';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  getDashboardData(): Observable<DashboardData> {
    return of(dashboardData);
  }

  getRecentViolations(): Observable<RecentViolation[]> {
    return of(dashboardData.recentViolations);
  }

  getViolationDetail(id: string): Observable<ViolationDetail | undefined> {
    return of(violationDetails[id]);
  }

  getBranchRiskData(): Observable<BranchRiskDatum[]> {
    return of(branchRiskData);
  }

  getComplianceReportData(): Observable<ComplianceReportDatum[]> {
    return of(complianceReportData);
  }

  getUsersData(): Observable<UserRecord[]> {
    return of(usersData);
  }
}
