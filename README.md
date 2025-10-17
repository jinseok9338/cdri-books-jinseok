# Certici Books

카카오 도서 검색 API를 활용한 도서 검색 및 찜하기 웹 애플리케이션입니다.

## 📖 프로젝트 개요

Certici Books는 사용자가 도서를 검색하고, 관심 있는 도서를 찜하여 관리할 수 있는 웹 애플리케이션입니다. 카카오 도서 검색 API를 활용하여 실시간 도서 정보를 제공하며, 무한 스크롤과 영속성 있는 상태 관리를 통해 뛰어난 사용자 경험을 제공합니다.

### 주요 기능

- 🔍 **도서 검색**: 제목, ISBN, 출판사, 저자별 검색 지원
- ❤️ **찜하기 기능**: 관심 있는 도서를 찜하여 관리
- 📜 **무한 스크롤**: 고성능 무한 스크롤로 대량의 검색 결과 처리
- 📚 **최근 검색 기록**: 사용자의 검색 기록을 자동으로 저장 및 관리
- 🔄 **상태 동기화**: URL 쿼리 파라미터와 상태 동기화로 브라우저 뒤로가기 지원

## 🛠 기술 스택

### Frontend

- **React Router 7**: 파일 기반 라우팅 시스템
- **TypeScript**: 타입 안정성 보장
- **Tailwind CSS v4**: 유틸리티 기반 스타일링
- **Vite**: 빠른 빌드 및 개발 서버

### 상태 관리 & 데이터 페칭

- **nuqs (커스텀 포크)**: URL 쿼리 상태 관리 (스크롤 유지 버그 수정)
- **TanStack Query (React Query)**: 서버 상태 관리 및 무한 스크롤
- **Zustand**: 클라이언트 상태 관리 (찜하기, 검색 기록)

### HTTP & UI

- **ky**: 경량 HTTP 클라이언트 (브라우저 전용, 전역 hooks 지원)
- **react-infinite-scroller**: 고성능 무한 스크롤 UI
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트

## ✨ 강조하고 싶은 기능

### 1. nuqs를 이용한 URL 쿼리 상태 관리

검색어, 정렬 옵션, 검색 대상을 URL에 동기화하여 브라우저 뒤로가기/앞으로가기를 지원합니다.

**특별한 점**: nuqs 라이브러리를 커스텀 포크하여 React Router 7 환경에서 라우터 변경 시 스크롤 유지 이슈를 해결했습니다.

```typescript
// app/constants/index.ts
export const BOOK_SEARCH_QUERY = {
  key: "bsq",
  schema: z.object({
    query: z.string().default(""),
    sort: z.enum(["accuracy", "latest"]).default("accuracy"),
    target: z.enum(["title", "isbn", "publisher", "person"]).default("title"),
  }),
};
```

### 2. 고성능 무한 스크롤

TanStack Query의 `useInfiniteQuery`와 `react-infinite-scroller`를 결합하여 페이지네이션을 자동 관리합니다. 리스트가 많아져도 성능 저하가 없도록 최적화되었습니다.

```typescript
// app/hooks/api/useGetBooks.ts
export const useGetInfiniteBooks = (searchQuery) => {
  return useInfiniteQuery({
    queryKey: [GET_BOOKS_KEY, searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      searchBooks({ ...searchQuery, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.meta.is_end ? undefined : pages.length + 1,
    initialPageParam: 1,
    enabled: !!searchQuery.query,
  });
};
```

### 3. Zustand + localStorage를 통한 영속성

찜한 책 관리와 최근 검색 기록을 localStorage와 동기화하여 브라우저를 재실행해도 데이터가 유지됩니다.

```typescript
// app/stores/likeBooksStore.ts
const useLikeBooksStore = create<LikeBooksStore>()(
  persist(
    (set, get) => ({
      likedBooks: new Map(),
      addLikeBook: (book) => {
        /* Map 구조로 중복 방지 */
      },
      removeLikeBook: (book) => {
        /* 찜하기 취소 */
      },
    }),
    {
      name: "like-books-storage",
      storage: {
        // Map을 localStorage에 저장하기 위한 커스텀 변환 로직
        getItem: (name) => {
          /* Map <-> Array 변환 */
        },
        setItem: (name, value) => {
          /* Array <-> Map 변환 */
        },
      },
    }
  )
);
```

### 4. React Router 7 파일 기반 라우팅

`app/routes/` 디렉토리의 파일 구조가 그대로 라우팅 구조가 되어 직관적인 관리가 가능합니다.

```
app/routes/
├── _main._index.tsx          # / (메인 검색 페이지)
├── _main.likedbooks._index.tsx # /likedbooks (찜한 책 페이지)
└── _main.tsx                 # 공통 레이아웃
```

## 🚀 실행 방법

### 환경 설정

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
# .env 파일 생성 후 아래 내용 추가
VITE_KAKAO_API_KEY=your_kakao_api_key_here
```

### 개발 서버 실행

```bash
pnpm dev
```

애플리케이션이 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 📁 폴더 구조

```
app/
├── api/                      # API 함수 및 타입 정의
├── assets/                   # 정적 리소스 (아이콘, 이미지)
├── components/               # 재사용 가능한 컴포넌트
│   ├── BookListItem.tsx      # 도서 아이템 (축소/확장 뷰)
│   ├── BookListSkeleton.tsx  # 로딩 스켈레톤
│   ├── layout/               # 레이아웃 컴포넌트
│   ├── typo/                 # 타이포그래피 컴포넌트
│   └── ui/                   # shadcn/ui 기반 UI 컴포넌트
├── constants/                # 상수 정의 (쿼리 키, 스키마 등)
├── hooks/                    # 커스텀 훅
│   ├── api/                  # API 관련 훅
│   └── useGetLikedBooks.ts   # 찜한 책 조회 훅
├── lib/                      # 유틸리티 및 라이브러리 설정
│   ├── nuqs/                 # 커스텀 포크한 nuqs 라이브러리
│   ├── ky.ts                 # HTTP 클라이언트 설정
│   └── query-client.ts       # React Query 설정
├── pages/                    # 페이지별 컴포넌트
│   ├── main/                 # 메인 검색 페이지
│   └── likedbooks/           # 찜한 책 페이지
├── routes/                   # React Router 7 라우트 정의
├── stores/                   # Zustand 스토어
│   ├── likeBooksStore.ts     # 찜하기 상태 관리
│   └── searchQueryStore.ts   # 검색 기록 상태 관리
└── root.tsx                  # 루트 컴포넌트
```

## 🔧 주요 코드 설명

### nuqs 커스텀 포크

`app/lib/nuqs/` 디렉토리에 nuqs 라이브러리의 커스텀 버전이 포함되어 있습니다. React Router 환경에서 라우터 변경 시 스크롤 위치가 초기화되는 버그를 수정했습니다.

핵심 수정 파일:

- `useQueryState.ts`: 쿼리 상태 관리 로직
- `update-queue.ts`: URL 업데이트 큐 관리

### ky HTTP 클라이언트 설정

```typescript
// app/lib/ky.ts
const API = ky.create({
  prefixUrl: "https://dapi.kakao.com/v3",
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set("Authorization", `KakaoAK ${KAKAO_API_KEY}`);
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (import.meta.env.DEV && response.ok) {
          const responseData = await response.json();
          console.log(JSON.stringify(responseData, null, 2));
        }
      },
    ],
  },
});
```

## 🎯 라이브러리 선택 이유

### ky - 경량 HTTP 클라이언트

- **axios 대비 장점**: axios는 Node.js 환경까지 지원하여 상대적으로 무거움
- **ky의 장점**: 브라우저 환경만 타겟팅하여 번들 사이즈가 작음
- **전역 hooks 지원**: 인증 헤더 등을 일괄 처리 가능

### nuqs 커스텀 포크

- **실무 경험**: React Router와 nuqs 사용 시 라우터 변경 시 스크롤 유지 안되는 이슈 발견
- **해결 방법**: nuqs 소스코드를 포크하여 해당 버그 수정
- **결과**: `app/lib/nuqs/` 디렉토리에 커스텀 버전 포함

### TanStack Query + react-infinite-scroller

- **useInfiniteQuery**: 페이지네이션 자동 관리
- **react-infinite-scroller**: 스크롤 이벤트 감지 및 자동 로딩
- **캐싱과 백그라운드 업데이트**: 뛰어난 UX 제공
