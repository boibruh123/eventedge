import { LegalPage } from "@/components/legal-page";

export default function CopyrightPage() {
  return (
    <LegalPage
      title="Copyright, DMCA, and IP Policy"
      updated="June 4, 2026"
      sections={[
        {
          title: "Respect for IP",
          body: [
            "GuessThePrice aims to use images, names, and references only where permitted by license, public source, fair use, or owner permission.",
            "All trademarks, product names, logos, and photos remain the property of their respective owners."
          ]
        },
        {
          title: "Takedown Requests",
          body: [
            "If you believe content on the site infringes your rights, send a notice with the content URL, your contact information, proof of ownership or authority, and a statement describing the issue.",
            "Send notices to: dmca@guesstheprice.example. If the service becomes public at scale, register a DMCA designated agent with the U.S. Copyright Office."
          ]
        },
        {
          title: "Counter-Notices",
          body: [
            "If your content was removed and you believe it was a mistake, contact us with the removed content, your contact information, and your explanation."
          ]
        }
      ]}
    />
  );
}
