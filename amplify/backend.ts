import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { storage } from './storage/resource';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth
});

backend.addOutput({
  storage: {
    aws_region: 'ap-northeast-2', // 버킷이 있는 리전을 정확히 입력하세요 (예: 서울)
    bucket_name: 'unban-styleguide', // 연결할 기존 버킷 이름
  },
});


