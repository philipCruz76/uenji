import { create } from "zustand";
import { produce } from "immer";
import {
  Gig,
  GigDescription,
  GigGallery,
  GigOverview,
  GigPricing,
} from "@/types/gigWizard.types";

type GigWizardStore = {
  fullGig: Gig;
  setGigOverview: (overview: GigOverview) => void;
  setGigPricing: (pricing: GigPricing) => void;
  setGigDescription: (description: GigDescription) => void;
  setGigGallery: (gallery: GigGallery) => void;
  getGigOverview: () => GigOverview;
  getGigPricing: () => GigPricing;
  getGigDescription: () => GigDescription;
  getGigGallery: () => GigGallery;
  getFullGig: () => Gig;
};

export const useGigWizardStore = create<GigWizardStore>()((set, get) => ({
  fullGig: {
    overview: {
      gigTitle: "",
      gigCateogry: "",
      gigSearchTags: [""],
    },
    pricing: {
      packages: [
        {
          title: "",
          description: "",
          price: 0,
          deliveryTime: 0,
          revisions: 0,
        },
      ],
    },
    description: {
      description: "",
    },
    gallery: {
      gigImages: [""],
    },
  },
  setGigOverview: (overview) =>
    set(
      produce((state) => {
        state.fullGig.overview = overview;
      })
    ),
  setGigPricing: (pricing) =>
    set(
      produce((state) => {
        state.fullGig.pricing = pricing;
      })
    ),
  setGigDescription: (description) =>
    set(
      produce((state) => {
        state.fullGig.description = description;
      })
    ),
  setGigGallery: (gallery) =>
    set(
      produce((state) => {
        state.fullGig.gallery = gallery;
      })
    ),
  getGigOverview: () => {
    return get().fullGig.overview;
  },
  getGigPricing: () => {
    return get().fullGig.pricing;
  },
  getGigDescription: () => {
    return get().fullGig.description;
  },
  getGigGallery: () => {
    return get().fullGig.gallery;
  },
  getFullGig: () => {
    return get().fullGig;
  },
}));