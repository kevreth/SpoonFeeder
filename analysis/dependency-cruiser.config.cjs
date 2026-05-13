/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-direct-webstorage',
      comment:
        'All localStorage/sessionStorage access must go through StorageAdapter. ' +
        'Import from infrastructure/storage instead.',
      severity: 'error',
      from: {
        path: '^src/ts',
        pathNot: '^src/ts/main/infrastructure/storage',
      },
      to: {
        path: '^src/ts/main/dataaccess/persistence/webPersistence',
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: './tsconfig.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};
