import { AdminDashboard } from "@/components/admin-dashboard";
import { fallbackItems } from "@/lib/items";

export default function AdminPage() {
  return <AdminDashboard items={fallbackItems} />;
}
