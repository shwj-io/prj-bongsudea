/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import {
  farFromMe,
  eventLocation,
  card,
  locationContainer,
  mainData,
  eventTextData,
  title,
  explain,
  eventImage,
  bottom,
  updateDate,
  howManySaw,
  shareButton,
} from './style.css.ts';
import useIntersectionObserver from '@/hooks/useIntersectionObserver.ts';
// css

type IssueCardProps = {
  event: any;
  isLastEvent: boolean;
  onFetchMore: () => void;
};

export default function IssueCard({
  event,
  isLastEvent,
  onFetchMore,
}: IssueCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    if (isLastEvent && isIntersecting) {
      onFetchMore();
    }
  }, [isLastEvent, isIntersecting]);

  return (
    <div className={card} ref={ref}>
      <div className={locationContainer}>
        <div className={farFromMe}>내 위치랑 얼마나 먼지</div>
        <div>|</div>
        <div className={eventLocation}>사건 위치</div>
      </div>
      <div className={mainData}>
        <div className={eventTextData}>
          <div className={title}>{event.issue_title}</div>
          <div className={explain}>{event.issue_contents}</div>
        </div>
        <img src={event.image} className={eventImage} alt="" />
      </div>
      <div className={bottom}>
        <div className={updateDate}>{event.updated_at}</div>
        <div className={locationContainer}>
          <div className={howManySaw}>몇명봤는지</div>
          <button className={shareButton} type="button">
            공유
          </button>
        </div>
      </div>
    </div>
  );
}
