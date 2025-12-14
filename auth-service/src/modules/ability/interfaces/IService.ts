// use class as token
export abstract class AbilityServiceToken {
  abstract resourceActionsPermission(
    userId: string,
    resourcePermissionsObject: {
      organizationId: string;
      resources?: { resource: any; resourceId?: string }[];
    },
  ): Promise<any>;
}
