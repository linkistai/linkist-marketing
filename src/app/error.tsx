'use client';

import { Button } from '@/components/Button';
import { Section } from '@/components/Section';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow justify-center">500</p>
        <h1 className="display-1 mt-5">Something went wrong on our side.</h1>
        <p className="lede mx-auto mt-5">Nothing you did caused it. Try again, or go back to the home page.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
      </div>
    </Section>
  );
}
