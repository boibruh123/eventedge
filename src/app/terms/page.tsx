import { LegalPage } from "@/components/legal-page";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="June 4, 2026"
      sections={[
        {
          title: "Use of GuessThePrice",
          body: [
            "GuessThePrice is a game for entertainment and educational purposes. Prices, images, categories, and item references are provided to support gameplay and may be approximate, delayed, or incorrect.",
            "You may use the site only for lawful purposes and may not attack, scrape, copy, resell, or interfere with the service."
          ]
        },
        {
          title: "No Purchase, Investment, or Appraisal Advice",
          body: [
            "The site does not provide financial, investment, valuation, appraisal, shopping, legal, or tax advice. Do not rely on game prices to buy, sell, insure, value, or invest in any item."
          ]
        },
        {
          title: "Accounts, Names, and Leaderboards",
          body: [
            "If you submit a display name or score, you are responsible for what you enter. Do not submit offensive, private, misleading, or infringing content.",
            "We may remove, reset, or modify leaderboard entries, room names, or scores to prevent abuse, cheating, spam, or technical issues."
          ]
        },
        {
          title: "Brands and Images",
          body: [
            "Product names, brands, trademarks, and photos belong to their respective owners. GuessThePrice is not endorsed by, sponsored by, or affiliated with those owners unless clearly stated.",
            "Images and source links should be used only where permitted by the image owner, platform, or license."
          ]
        },
        {
          title: "Ads and Sponsors",
          body: [
            "Ads, sponsored placements, and promoted challenges may appear on the site. Sponsored content should be labeled clearly when enabled.",
            "Advertisers are responsible for their claims, links, offers, and compliance with applicable law."
          ]
        },
        {
          title: "Limitation of Liability",
          body: [
            "The site is provided as is and as available. To the maximum extent allowed by law, we are not liable for lost profits, lost data, incorrect prices, unavailable rooms, leaderboard errors, or indirect damages."
          ]
        },
        {
          title: "Contact",
          body: ["For business, support, or legal issues, contact: legal@guesstheprice.example."]
        }
      ]}
    />
  );
}
