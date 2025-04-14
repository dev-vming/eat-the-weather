// filepath: c:\Users\Min\Desktop\eat-the-weather\eslint.config.mjs

// path와 URL 처리를 위한 모듈 가져오기
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// 기존 ESLint 설정과의 호환성을 위한 FlatCompat 가져오기
import { FlatCompat } from '@eslint/eslintrc';

// 현재 파일의 디렉토리 경로를 계산
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat 초기화 (기본 디렉토리 설정)
const compat = new FlatCompat({
  baseDirectory: __dirname, // ESLint 설정의 기준 디렉토리
});

// ESLint 설정 정의
const eslintConfig = [
  // Next.js와 TypeScript 관련 ESLint 규칙 확장
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier 관련 설정 추가
  {
    plugins: ['prettier'], // Prettier 플러그인 추가
    extends: ['plugin:prettier/recommended'], // Prettier 권장 설정 사용
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙 위반 시 에러로 표시
    },
  },
];

// ESLint 설정 내보내기
export default eslintConfig;
