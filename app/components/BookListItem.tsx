import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { Document } from "~/api";
import arrowDownIcon from "~/assets/icons/arrow-down.svg";
import heartEmptyIcon from "~/assets/icons/heart-empty.svg";
import heartFilledIcon from "~/assets/icons/heart-filled.svg";
import defaultThumbnail from "~/assets/images/noImage.png";
import { Body2, Caption, Title3 } from "~/components/typo";
import { Button } from "~/components/ui/button";
import { LIKED_BOOKS_KEY } from "~/hooks/useGetLikedBooks";
import { formatPrice } from "~/lib/utils";
import useLikeBooksStore from "~/stores/likeBooksStore";
interface BookListItemProps {
  book: Document;
}

const BookListItem = ({ book }: BookListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();
  const { isLiked, addLikeBook, removeLikeBook } = useLikeBooksStore();
  const liked = isLiked(book);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      removeLikeBook(book);
    } else {
      addLikeBook(book);
    }
    queryClient.invalidateQueries({ queryKey: [LIKED_BOOKS_KEY] });
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    window.open(book.url, "_blank");
  };

  const thumbnailUrl = book.thumbnail || defaultThumbnail;

  return (
    <div
      className={`border-b border-[#D2D6DA] overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "h-[344px]" : "h-[100px]"}`}
    >
      {!isExpanded ? (
        // 닫힘 상태 - CompactView
        <div className="flex items-center w-full h-[100px] px-12 py-4 gap-6 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img
              src={thumbnailUrl}
              alt={book.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = defaultThumbnail;
              }}
              className="w-12 h-[68px] object-cover rounded"
            />

            <img
              src={liked ? heartFilledIcon : heartEmptyIcon}
              alt="like"
              className="absolute top-0 right-0 w-4 h-4 hover:scale-110 transition-transform"
            />
          </div>

          {/* 책 정보 */}
          <div className="flex items-center gap-4 flex-1">
            <Title3 className="text-[var(--color-typo-primary)]">
              {book.title}
            </Title3>
            <Body2 className="text-[var(--color-typo-secondary)]">
              {book.authors.join(", ")}
            </Body2>
          </div>

          {/* 가격 */}
          <Title3 className="text-[var(--color-typo-primary)] min-w-[100px]">
            {formatPrice(book.sale_price)}
          </Title3>

          {/* 버튼 그룹 */}
          <div className="flex gap-2">
            <Button
              onClick={handleBuyClick}
              className="w-[115px] h-12 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90"
            >
              구매하기
            </Button>
            <button
              onClick={() => setIsExpanded(true)}
              aria-label="상세 정보 보기"
              className="w-[115px] h-12 bg-[var(--color-light-gray)] text-[var(--color-typo-secondary)] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
            >
              <Caption>상세보기</Caption>
              <img src={arrowDownIcon} alt="toggle" className="w-[14px] h-2" />
            </button>
          </div>
        </div>
      ) : (
        // 펼침 상태 - ExpandedView (Flex 레이아웃)
        <div className="w-full h-[344px] bg-white px-12 py-6 transition-all duration-300 ease-in-out">
          <div className="flex gap-6 h-full">
            {/* 좌측: 책 이미지 + 좋아요 */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={thumbnailUrl}
                  alt={book.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = defaultThumbnail;
                  }}
                  className="w-[210px] h-[280px] object-cover rounded"
                />
                <button
                  onClick={handleLikeClick}
                  aria-label={liked ? "찜하기 취소" : "찜하기"}
                  className="absolute top-2 right-2 w-6 h-6 hover:scale-110 transition-transform"
                >
                  <img
                    src={liked ? heartFilledIcon : heartEmptyIcon}
                    alt="like"
                    className="w-full h-full"
                  />
                </button>
              </div>
            </div>

            {/* 중앙: 책 정보 + 책 소개 */}
            <div className="flex-1 flex flex-col gap-6">
              {/* 책 정보 */}
              <div className="flex items-center gap-4">
                <Title3 className="text-[var(--color-typo-primary)]">
                  {book.title}
                </Title3>
                <Caption className="text-[var(--color-typo-subtitle)]">
                  {book.authors.join(", ")}
                </Caption>
              </div>

              {/* 책 소개 */}
              <div className="flex-1">
                <Body2 className="text-[var(--color-typo-primary)] mb-2 font-bold text-sm">
                  책 소개
                </Body2>
                <Caption className="text-[var(--color-typo-primary)] h-[180px] overflow-hidden leading-relaxed text-[10px]">
                  {book.contents || "책 소개가 없습니다."}
                </Caption>
              </div>
            </div>

            {/* 우측: 버튼들 + 가격 정보 */}
            <div className="flex-shrink-0 w-[304px] flex flex-col">
              {/* 상단: 상세보기 버튼 (책 정보와 같은 높이) */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label="상세 정보 닫기"
                  className="w-[115px] h-12 bg-[var(--color-light-gray)] text-[var(--color-typo-secondary)] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
                >
                  <Caption>상세보기</Caption>
                  <img
                    src={arrowDownIcon}
                    alt="close"
                    className="w-[14px] h-2 rotate-180"
                  />
                </button>
              </div>

              {/* 중앙: 책 소개 영역과 맞춤 (flex-1로 공간 차지) */}
              <div className="flex-1"></div>

              {/* 하단: 가격 정보 + 구매하기 버튼 */}
              <div className="space-y-4">
                {/* 가격 정보 */}
                <div className="space-y-4">
                  {/* 원가 */}
                  <div className="flex items-center justify-end gap-2">
                    <Caption className="text-[var(--color-typo-subtitle)] w-[37px] text-right text-[10px]">
                      원가
                    </Caption>
                    <Body2 className="line-through text-[var(--color-typo-primary)] font-light text-lg">
                      {formatPrice(book.price)}
                    </Body2>
                  </div>
                  {/* 할인가 */}
                  <div className="flex items-center justify-end gap-2">
                    <Caption className="text-[var(--color-typo-subtitle)] w-[37px] text-right text-[10px]">
                      할인가
                    </Caption>
                    <Title3 className="text-[var(--color-typo-primary)]">
                      {formatPrice(book.sale_price)}
                    </Title3>
                  </div>
                </div>

                {/* 구매하기 버튼 */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleBuyClick}
                    className="w-[240px] h-12 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)]/90"
                  >
                    구매하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListItem;
