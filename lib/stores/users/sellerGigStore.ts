import { create } from "zustand";
import { produce } from "immer";
import {
  Gig,
  GigDescription,
  GigGallery,
  GigOverview,
  GigPricing,
} from "@/types/gigWizard.types";

type SellerGigStore = {
  sellerGig: Gig;
  setSellerGig: (gig: Gig) => void;
  setGigOverview: (overview: GigOverview) => void;
  setGigPricing: (pricing: GigPricing) => void;
  setGigDescription: (description: GigDescription) => void;
  setGigGallery: (gallery: GigGallery) => void;
  getSellerGig: () => Gig;
  getGigOverview: () => GigOverview;
  getGigPricing: () => GigPricing;
  getGigDescription: () => GigDescription;
  getGigGallery: () => GigGallery;
};

export const useSellerGigStore = create<SellerGigStore>()((set, get) => ({
  sellerGig: {
    overview: {
      gigTitle: "",
      gigCategory: "",
      gigSearchTags: [""],
    },
    pricing: {
      packages: [
        {
          title: "",
          description: "",
          price: "0",
          deliveryTime: "0",
          revisions: "0",
        },
      ],
      extras: [
        {
          title: "",
          description: "",
          price: 0,
        },
      ],
    },
    description: {
      description: "",
      faqs: [
        {
          question: "",
          answer: "",
        },
      ],
    },
    gallery: {
      gigImages: [""],
      gigVideo: "",
      gigDocuments: [""],
    },
  },
  setGigOverview: (overview) =>
    set(
      produce((state) => {
        state.sellerGig.overview = overview;
      }),
    ),
  setGigPricing: (pricing) =>
    set(
      produce((state) => {
        state.sellerGig.pricing = pricing;
      }),
    ),
  setGigDescription: (description) =>
    set(
      produce((state) => {
        state.sellerGig.description = description;
      }),
    ),
  setGigGallery: (gallery) =>
    set(
      produce((state) => {
        state.sellerGig.gallery = gallery;
      }),
    ),
  setSellerGig: (gig) =>
    set(
      produce((state) => {
        state.singleGig = gig;
      }),
    ),
  getSellerGig: () => get().sellerGig,
  getGigOverview: () => get().sellerGig.overview,
  getGigPricing: () => get().sellerGig.pricing,
  getGigDescription: () => get().sellerGig.description,
  getGigGallery: () => get().sellerGig.gallery,
}));
