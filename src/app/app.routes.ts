export const appRoutes = [
    {
      path: '',
      redirectTo: 'workspace',
      pathMatch: 'full'
    },
    {
        path: 'workspace',
        loadChildren:'./workspace/workspace.module#WorkspaceModule'
    }
]