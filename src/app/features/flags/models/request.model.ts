export interface CreateSegmentRuleRequest {
  featureFlagId: string;
  property: string;
  operator: string;
  value: string;
  rolloutPercentage?: number;
  order?: number;
}
