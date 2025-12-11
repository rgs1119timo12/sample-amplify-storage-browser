import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { storage } from './storage/resource';
import * as iam from 'aws-cdk-lib/aws-iam';
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


const s3BucketPolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'], // 필요한 권한 나열
  resources: [
    'arn:aws:s3:::unban-styleguide',      // 버킷 자체
    'arn:aws:s3:::unban-styleguide/*'     // 버킷 내의 모든 객체
  ],
});

// 로그인한 사용자(Authenticated)에게 권한 부여
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(s3Policy);

