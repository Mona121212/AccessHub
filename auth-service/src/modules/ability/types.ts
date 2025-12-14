export interface ResourcePermissionQueryObject {
  organizationId: string;
}

export interface UserPermissions {
  isAdmin: boolean;
  isBuilder: boolean;
  isEndUser: boolean;

  appCreate: boolean;
  appDelete: boolean;

  workflowCreate: boolean;
  workflowDelete: boolean;

  folderCRUD: boolean;
  orgConstantCRUD: boolean;

  dataSourceCreate: boolean;
  dataSourceDelete: boolean;

  appPromote: boolean;
  appRelease: boolean;
}

export const DEFAULT_USER_PERMISSIONS: UserPermissions = {
  isAdmin: false,
  isBuilder: false,
  isEndUser: false,

  appCreate: false,
  appDelete: false,

  workflowCreate: false,
  workflowDelete: false,

  folderCRUD: false,
  orgConstantCRUD: false,

  dataSourceCreate: false,
  dataSourceDelete: false,

  appPromote: false,
  appRelease: false,
};
