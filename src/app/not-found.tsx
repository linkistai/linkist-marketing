import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { START_URL } from '@/lib/site';

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display-1 mt-5">That page is not here.</h1>
        <p className="lede mx-auto mt-5">The address may be wrong or the page may have moved. Everything on the site is one link away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Home</Button>
          <Button href="/how-it-works" variant="secondary">
            How Linkist works
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          Looking for the app?{' '}
          <a href={START_URL} className="underline">
            Sign in
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
