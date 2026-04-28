import { LeadersUploadPage } from "@/app/components/leaders-upload/LeadersUploadPage";
import type { Metadata } from "next";
import { seoMetadata } from "../../seo/metadata";

export const metadata: Metadata = seoMetadata.leadersUpload;

export default function UploadLeadersRoute() {
  return <LeadersUploadPage />;
}
