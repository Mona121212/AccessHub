import { SetMetadata } from '@nestjs/common';

export const InitFeature = (featureId: string) =>
  SetMetadata('tjFeatureId', featureId);
