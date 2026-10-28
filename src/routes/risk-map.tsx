import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/risk-map")({
  head: () => ({ meta: [{ title: "Risk Map — LANDSAFE NER" }, { name: "description", content: "Risk Map (prototype demo)." }, { property: "og:title", content: "Risk Map — LANDSAFE NER" }, { property: "og:description", content: "Risk Map (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Risk Map" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
