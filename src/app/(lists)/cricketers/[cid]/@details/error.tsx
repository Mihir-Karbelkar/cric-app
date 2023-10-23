'use client'; // Error components must be Client Components

import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const triedAgain = useRef<boolean>(false);
  useEffect(() => {
    // Log the error to an error reporting service
    if (!isPending && triedAgain.current) {
      triedAgain.current = false;

      reset();
    }
  }, [isPending, reset]);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => {
          triedAgain.current = true;
          startTransition(() => router.refresh());
        }}
      >
        Try again
      </button>
    </div>
  );
}
