import MapView from '@/components/MapView';
import shops from '@/data/shops.json';

export default function MapPage() {
  return <MapView shops={shops} />;
}
