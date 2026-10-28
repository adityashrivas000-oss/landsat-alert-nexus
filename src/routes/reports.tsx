import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — LANDSAFE NER" }, { name: "description", content: "Reports (prototype demo)." }, { property: "og:title", content: "Reports — LANDSAFE NER" }, { property: "og:description", content: "Reports (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Reports" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
