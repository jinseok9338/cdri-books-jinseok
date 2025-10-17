import { useQueryClient } from "@tanstack/react-query";

import { Body2 } from "~/components/typo";
import { LIKED_BOOKS_KEY, useGetLikedBooks } from "~/hooks/useGetLikedBooks";

const LikedBooksTitleArea = () => {
  const { data } = useGetLikedBooks();
  const totalCount = data?.pages?.[0]?.meta?.total_count || 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[var(--color-typo-primary)] font-bold text-22px leading-32px">
        내가 찜한 책
      </h2>
      <div className="flex items-center gap-4">
        <Body2 className="text-[var(--color-typo-primary)] font-medium text-base leading-6">
          찜한책
        </Body2>
        <Body2 className="text-[var(--color-typo-primary)] font-normal text-base leading-6">
          총 <span className="text-[var(--color-primary)]">{totalCount}</span>건
        </Body2>
      </div>
    </div>
  );
};

export default LikedBooksTitleArea;
