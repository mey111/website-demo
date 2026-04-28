import AdminTable from '@/components/AdminTable';
import shops from '@/data/shops.json';

export default function AdminPage() {
  return <AdminTable initialShops={shops} />;
}
