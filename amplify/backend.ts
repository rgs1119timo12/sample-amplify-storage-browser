import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { storage, secondaryStorage } from './storage/resource';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  storage, 
  secondaryStorage
});


// 1. 기존 버킷 이름과 리전 설정
const S3_BUCKET_NAME = 'unban-styleguide';
const S3_REGION = 'ap-northeast-2'; // 예: 서울 리전

// 2. 인증된 사용자(로그인한 유저)에게 기존 버킷 접근 권한 부여
const authRole = backend.auth.resources.authenticatedUserIamRole;
authRole.addToPrincipalPolicy(
  new iam.PolicyStatement({
    actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
    resources: [
      `arn:aws:s3:::${S3_BUCKET_NAME}`,       // 버킷 자체 (List 권한용)
      `arn:aws:s3:::${S3_BUCKET_NAME}/*`      // 버킷 내 파일들
    ],
  })
);

// 3. 프론트엔드에서 이 버킷을 쓰도록 설정 출력 추가
backend.addOutput({
  storage: {
    aws_region: S3_REGION,
    bucket_name: S3_BUCKET_NAME,
  },
});
