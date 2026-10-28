import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "History — LANDSAFE NER" }, { name: "description", content: "History (prototype demo)." }, { property: "og:title", content: "History — LANDSAFE NER" }, { property: "og:description", content: "History (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="History" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
