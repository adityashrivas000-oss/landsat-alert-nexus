import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/warnings")({
  head: () => ({ meta: [{ title: "Early Warning Center — LANDSAFE NER" }, { name: "description", content: "Early Warning Center (prototype demo)." }, { property: "og:title", content: "Early Warning Center — LANDSAFE NER" }, { property: "og:description", content: "Early Warning Center (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Early Warning Center" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
