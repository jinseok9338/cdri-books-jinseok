import React from "react";

interface BookListSkeletonProps {
  count?: number;
}

const BookListSkeleton = ({ count = 5 }: BookListSkeletonProps) => {
  return (
    <div className="w-full max-w-[960px]">
      <div className="space-y-0">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="border-b border-[#D2D6DA] overflow-hidden h-[100px]"
          >
            <div className="flex items-center w-full h-[100px] px-12 py-4 gap-6">
              {/* 책 이미지 스켈레톤 */}
              <div className="flex-shrink-0">
                <div className="w-12 h-[68px] bg-gray-200 animate-pulse rounded"></div>
              </div>

              {/* 책 정보 스켈레톤 */}
              <div className="flex items-center gap-4 flex-1">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-48"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
              </div>

              {/* 가격 스켈레톤 */}
              <div className="flex-shrink-0">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-20 min-w-[100px]"></div>
              </div>

              {/* 버튼 그룹 스켈레톤 */}
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-[115px] h-12 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="w-[115px] h-12 bg-gray-200 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListSkeleton;
