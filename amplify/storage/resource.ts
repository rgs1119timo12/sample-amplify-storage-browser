import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  cfnResources: {
    bucket: {
      arn: "arn:aws:s3:::unban-styleguide"
    }
  },
  isDefault: true,
   access: (allow) => ({
    'public/*': [
        allow.guest.to(['read', 'write']),
        allow.authenticated.to(['read', 'write', 'delete']),
    ]
   })
});
