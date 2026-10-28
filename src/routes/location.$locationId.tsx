import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";

export const Route = createFileRoute("/location/$locationId")({
  head: () => ({ meta: [{ title: "Location Details — LANDSAFE NER" }, { name: "description", content: "Location Details (prototype demo)." }, { property: "og:title", content: "Location Details — LANDSAFE NER" }, { property: "og:description", content: "Location Details (prototype demo)." }] }),
  component: () => (
    <Page>
      <PageHeader title="Location Details" description="This section is coming soon in the prototype." />
      <DemoNotice />
    </Page>
  ),
});
