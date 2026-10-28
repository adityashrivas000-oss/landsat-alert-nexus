import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/authority")({
  head: () => ({ meta: [{ title: "Authority Dashboard — LANDSAFE NER" }, { name: "description", content: "Authority Dashboard (prototype demo)." }, { property: "og:title", content: "Authority Dashboard — LANDSAFE NER" }, { property: "og:description", content: "Authority Dashboard (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Authority Dashboard" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
