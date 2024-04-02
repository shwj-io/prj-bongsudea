This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# prj-bongsudea

## 개요

## 기술 스택

- nextjs
- postgreSQL
- vanilla-extract
- tanstack-query
- zustand

## 플로우 차트

## git commit convention

- Feat 새로운 기능을 추가
- Fix 버그 수정
- Design CSS 등 사용자 UI 디자인 변경
- !BREAKING CHANGE 커다란 API 변경의 경우
- !HOTFIX 급하게 치명적인 버그를 고쳐야하는 경우
- Style 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- Refactor 프로덕션 코드 리팩토링
- Comment 필요한 주석 추가 및 변경
- Docs 문서 수정
- Test 테스트 코드, 리펙토링 테스트 코드 추가, Production Code-(실제로 사용하는 코드) 변경 없음
- Chore 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음
- Rename 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- Remove 파일을 삭제하는 작업만 수행한 경우
