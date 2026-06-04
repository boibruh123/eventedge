import { LegalPage } from "@/components/legal-page";

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Game and Price Disclaimer"
      updated="June 4, 2026"
      sections={[
        {
          title: "Price Accuracy",
          body: [
            "Prices shown in the game are estimates or reference prices from the listed source. Real market prices can change by location, condition, timing, fees, taxes, seller, and availability.",
            "A correct game answer does not mean an item can be purchased or sold for that amount."
          ]
        },
        {
          title: "No Affiliation",
          body: [
            "GuessThePrice is an independent game. Unless explicitly stated, it is not affiliated with, endorsed by, or sponsored by any brand, marketplace, manufacturer, auction house, image host, or data source shown in the game."
          ]
        },
        {
          title: "Sponsored Content",
          body: [
            "Sponsored items, ads, and featured challenges should be labeled when used. Sponsored placement does not mean a product is recommended, independently verified, or guaranteed."
          ]
        }
      ]}
    />
  );
}
