import { create } from "zustand";
import { persist } from "zustand/middleware";

const seller = (set) => ({
  progress: 0,
  sellerCategory: null,
  openUserModel: false,
  requirements: {
    destinationPort: "",
    shipmentTerms: "",
    paymentMethod: "",
    message: "",
  },
  order: { orderQuantity: null, orderType: "Bags",estimatedQuantity: null },
  unitPrice: { unitType: "USD", units: null },
  validTo: "",
  scoreInquiry: [
    {
      label: "Estmated Order Quantity",
      marks: "20",
      score: false,
    },
    {
      label: "Preferred Unit Price",
      marks: "20",
      score: false,
    },
    {
      label: "Valid To",
      marks: "20",
      score: false,
    },
    {
      label: "Email",
      marks: "5",
      score: false,
    },
    {
      label: "Destination Port",
      marks: "10",
      score: false,
    },
    {
      label: "Shipment Terms",
      marks: "10",
      score: false,
    },
    {
      label: "Payment Methods",
      marks: "10",
      score: false,
    },
    {
      label: "Required Company",
      marks: "10",
      score: false,
    },
  ],

  updateIncreaseProgress: async (number) =>
    set((store) => ({
      progress: store.progress + 5 > 100 ? 100 : store.progress + number,
    })),
  updateDecreaseProgress: async (number) =>
    set((store) => ({
      progress: store.progress - 10 < 0 ? 0 : store.progress - number,
    })),
  updateSellerCategory: async (value) =>
    set((store) => ({ sellerCategory: value })),
  updateOpenUserModel: async (value) =>
    set((store) => ({ openUserModel: value })),
  updateOrder: async (value) => set((store) => ({ order: value })),
  updateUnitPrice: async (value) => set((store) => ({ unitPrice: value })),
  updateValidTo: async (valid) => set((store) => ({ validTo: valid })),
  updateRequirements: async (require) =>
    set((store) => ({ requirements: require })),
});

export const Seller = create(seller, { name: "seller" });
