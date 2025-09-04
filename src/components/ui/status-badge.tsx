import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StatusBadgeProps {
  status: 'verified' | 'develop' | 'testing' | 'deprecated';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const url = '/docs/openapi/getting-started#api-status';
  if (status === 'verified') {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-green-500 bg-green-300 px-2 text-green-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            <p>사용 가능</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <p className="text-sm">
              모든 개발이 완료된 기능입니다. 모든 개발과 테스트 과정이 전부
              완료되었으며, 프로덕션 환경에서 사용하실 수 있는 api입니다.
            </p>
            <a href={url} className="text-muted-foreground text-xs">
              자세한 정보 확인하기
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (status === 'develop') {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-blue-500 bg-blue-300 px-2 text-blue-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            <p>개발 중</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <p className="text-sm">
              개발 중인 기능입니다. 작동 방식이 언제든지 변경될 수 있고, 서버에
              패치가 되지 않은 기능입니다. 사용이 불가능하며 추후 지원을 시작할
              예정입니다.
            </p>
            <a href={url} className="text-muted-foreground text-xs">
              자세한 정보 확인하기
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (status === 'testing') {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-yellow-500 bg-yellow-200 px-3 text-yellow-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>

            <p>테스트 중</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <p className="text-sm">
              테스트 중인 기능입니다. 개발 및 업데이트가 전부 완료되었기는 하나,
              안정성이 다소 떨어질 수 있습니다. 프로덕션에서의 활용을 권장하지
              않습니다.
            </p>
            <a href={url} className="text-muted-foreground text-xs">
              자세한 정보 확인하기
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (status === 'deprecated') {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center gap-1 rounded-md border-2 border-red-400 bg-red-300 px-3 text-red-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>

            <p>사용 중단됨</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <p className="text-sm">
              사용이 중단된 api입니다. 이 기능은 디버거즈가 제공하는 웹사이트를
              포함한 모든 서비스들에서 사용이 중단되었으며, 더 이상의 기술
              지원이 이뤄지지 않습니다. 일부는 기술적으로나마 사용이 가능하나,
              프로덕션에서의 사용은 절대 삼가해 주시는 것을 권장합니다.
            </p>
            <a href={url} className="text-muted-foreground text-xs">
              자세한 정보 확인하기
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return null;
}
