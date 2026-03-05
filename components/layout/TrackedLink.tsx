'use client';

import Link from 'next/link';
import { trackCTA } from '@/lib/track';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof Link> & {
  trackLabel: string;
};

export default function TrackedLink({ trackLabel, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCTA(trackLabel, String(props.href));
        onClick?.(e);
      }}
    />
  );
}
