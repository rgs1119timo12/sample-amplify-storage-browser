import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  isDefault: true,
  access: (allow) => [
    {
      path: 'public/*',
      allowedActions: [
        allow.guest.to(['read', 'write']),
        allow.authenticated.to(['read', 'write', 'delete']),
      ],
    },
  ],
});
