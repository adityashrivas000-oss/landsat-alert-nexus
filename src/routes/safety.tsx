import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/safety")({
  head: () => ({ meta: [{ title: "Safety — LANDSAFE NER" }, { name: "description", content: "Safety (prototype demo)." }, { property: "og:title", content: "Safety — LANDSAFE NER" }, { property: "og:description", content: "Safety (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Safety" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
