export interface ClockifyWorkspace {
  id: string;
  name: string;
  imageUrl: string | null;
  memberships?: unknown[];
}

export interface ClockifyTimeEntry {
  id: string;
  description: string;
  timeInterval: { start: string; end: string; duration: string };
  userId: string;
  workspaceId: string;
  projectId?: string;
  billable: boolean;
  hourlyRate?: { amount: number; currency: string };
  costRate?: { amount: number; currency: string };
  customFieldValues?: any[];
}
export interface ClockifyUser {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
}

export interface ClockifyProject {
  id: string;
  name: string;
  archived: boolean;
  billable: boolean;
  budgetEstimate: string | null;
  clientId: string;
  clientName: string;
  color?: string;
  costRate: number | null;
  duration: string;
  estimate: { estimate: string; type: string };
  estimateReset: any | null;
  hourlyRate: { amount: number; currency: string };
  memberships: Array<{
    userId: string;
    hourlyRate: number | null;
    costRate: number | null;
  }>;
  note: string;
  public: boolean;
  template: boolean;
  timeEstimate: {
    estimate: string;
    type: string;
    resetOption: any | null;
    active: boolean;
    includeNonBillable: boolean;
  };
}
