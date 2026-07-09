import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { buildPageMeta } from "@/lib/pageMeta";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("privacy")!;

export const metadata: Metadata = buildPageMeta({
  title: doc.title,
  description: doc.description,
  path: doc.path,
});

export default function PrivacyPage() {
  return <LegalLayout doc={doc} />;
}
