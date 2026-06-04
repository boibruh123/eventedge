import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 4, 2026"
      sections={[
        {
          title: "Information We Collect",
          body: [
            "The MVP may store display names, guesses, scores, room codes, leaderboard entries, admin-created items, and ad settings.",
            "Some data is currently stored in browser local storage. If Supabase or another backend is enabled, the same types of data may be stored on servers."
          ]
        },
        {
          title: "How We Use Information",
          body: [
            "We use information to run the game, show room scores, prevent daily replay abuse, display leaderboards, manage content, and improve the product.",
            "We may use analytics, ads, or sponsor tools in the future. Those tools may collect device, usage, and interaction information under their own policies."
          ]
        },
        {
          title: "Cookies and Local Storage",
          body: [
            "The site uses browser storage for daily play locks, room state, leaderboard entries, admin edits, and ad settings. This helps the game work without requiring an account.",
            "You can clear browser storage in your browser settings, but doing so may remove game progress, room data, or daily lock state."
          ]
        },
        {
          title: "Children",
          body: [
            "GuessThePrice is not intended for children under 13. Do not use the site if you are under 13.",
            "We do not knowingly collect personal information from children under 13. If you believe a child provided information, contact us so we can delete it."
          ]
        },
        {
          title: "Your Choices",
          body: [
            "You can use guest mode, choose a non-identifying display name, clear local storage, or contact us to request deletion of server-stored information if server storage is enabled.",
            "Depending on your location, you may have privacy rights to access, delete, correct, or opt out of certain data uses."
          ]
        },
        {
          title: "Contact",
          body: ["Privacy requests can be sent to: privacy@guesstheprice.example."]
        }
      ]}
    />
  );
}
