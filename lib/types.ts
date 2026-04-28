export interface Shop {
  id: string;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  photo: string;
  tags: string[];
  rating: number;
  avgPrice: number;
  keywords: string[];
}
