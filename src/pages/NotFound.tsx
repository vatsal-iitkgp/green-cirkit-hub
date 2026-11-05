import { Page } from "@/components/site/Chrome";
import { Btn } from "@/components/site/motion";

const NotFound = () => (
  <Page>
    <section className="min-h-[80vh] container max-w-6xl flex flex-col items-center justify-center text-center pt-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Error 404</p>
      <h1 className="mt-6 text-[clamp(4rem,14vw,11rem)] font-medium leading-[0.85] tracking-[-0.06em]">
        Lost in the <span className="serif italic text-primary">loop.</span>
      </h1>
      <p className="mt-6 text-muted-foreground">This page got recycled. Let's get you back.</p>
      <div className="mt-10"><Btn to="/">Back home</Btn></div>
    </section>
  </Page>
);

export default NotFound;
