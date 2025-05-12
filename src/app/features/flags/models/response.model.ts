export interface FeatureFlag {
  id?: string;
  name: string;
  key: string;
  description?: string;
  isEnabled: boolean;
  OrganizationId?: string;
}

export interface GetFeatureFlag {
  id: string;
  name: string;
  key: string;
  description?: string;
  isEnabled: boolean;
  createdAt: string;
  featureSegments: SegmentRuleDto[];
}

export interface SegmentRuleDto {
  id: string;
  property: string;
  operator: string;
  value: string;
  rolloutPercentage: number;
  order: number;
}
