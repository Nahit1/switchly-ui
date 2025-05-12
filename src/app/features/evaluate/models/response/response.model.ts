export interface EvaluateResult {
  flagKey: string;
}

interface userContextModel {
  userId: string;
  role: string;
  country: string;
  traits: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}
