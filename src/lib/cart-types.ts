export interface CartItem {
  id: string;
  name: string;
  priceDisplay: string;
  priceNumber: number;
  quantity: number;
}

export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  category: string;
  priceNumber: number;
  priceDisplay: string;
  image?: string;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  dummyWhatsApp: string;
}
