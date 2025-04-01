import React, { useRef, useCallback } from 'react';
import { useGetCommentsQuery } from '../api/commentsAPI';
import useVirtualList from '@/shared/lib/hooks/useVirtualList';

import { CommentItem } from '../../Comment/ui/CommentItem';
import { Error } from '@/shared/UI/Error';
import { Skeleton } from '@/shared/UI/Skeleton';

const itemHeight = 180;
const containerHeight = 500;

export const Comments: React.FC = () => {
  const { data: comments = [], error, isLoading } = useGetCommentsQuery();

  const scrollElementRef = useRef(null);

  const { virtualItems, totalHeight, measureElement } = useVirtualList({
    estimateItemHeight: useCallback(() => itemHeight, []),
    itemsCount: comments.length,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
    getItemKey: useCallback((index) => comments[index].id, [comments]),
  });

  if (error) {
    return <Error>{'Ошибка загрузки комментариев'}</Error>;
  }

  return (
    <div className="comments">
      <div
        className="container-items"
        ref={scrollElementRef}
        style={{
          height: containerHeight,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {isLoading && <Skeleton count={4} />}
        <div style={{ height: totalHeight }}>
          {virtualItems.map((virtualItem) => {
            const item = comments[virtualItem.index];

            return (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                  width: '100%',
                }}
                key={item.id}
                data-index={virtualItem.index}
                ref={measureElement}
              >
                <CommentItem {...item} key={item.id} isReplyComment={false} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
