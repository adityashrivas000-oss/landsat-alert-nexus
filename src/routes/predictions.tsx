import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/predictions")({
  head: () => ({ meta: [{ title: "Predictions — LANDSAFE NER" }, { name: "description", content: "Predictions (prototype demo)." }, { property: "og:title", content: "Predictions — LANDSAFE NER" }, { property: "og:description", content: "Predictions (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Predictions" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
