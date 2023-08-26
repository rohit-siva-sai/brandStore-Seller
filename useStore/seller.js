import { create } from "zustand";
import { persist } from "zustand/middleware";

const seller = (set) => ({
  
  sellerCategory: null,
  openUserModel: false,

  updateSellerCategory: async (value) => set((store) => ({ sellerCategory: value })),
  updateOpenUserModel: async (value) => set((store) => ({ openUserModel: value })), 
 
});

export const Seller = create(seller, { name: "seller" });
