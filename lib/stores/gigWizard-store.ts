"use client";
import { create } from "zustand";
import { produce } from "immer";
import {
  Gig,
  GigDescription,
  GigGallery,
  GigOverview,
  GigPricing,
  GigWizardStep,
} from "@/types/gigWizard.types";

type GigWizardStore = {
  fullGig: Gig;
  setFullGig: (fullGig: Gig) => void;
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
      gigCategory: "",
      gigSearchTags: [""],
    },
    pricing: {
      packages: [
        {
          title: "",
          description: "",
          price: "1000",
          deliveryTime: "1",
          revisions: "0",
        },
      ],
    },
    description: {
      description: "",
    },
    gallery: {
      gigImages: [""],
      gigDocuments: [""],
    },
  },
  setFullGig(fullGig) {
    set(
      produce((state) => {
        state.fullGig = fullGig;
      }),
    );
  },
  setGigOverview: (overview) =>
    set(
      produce((state) => {
        state.fullGig.overview = overview;
      }),
    ),
  setGigPricing: (pricing) =>
    set(
      produce((state) => {
        state.fullGig.pricing = pricing;
      }),
    ),
  setGigDescription: (description) =>
    set(
      produce((state) => {
        state.fullGig.description = description;
      }),
    ),
  setGigGallery: (gallery) =>
    set(
      produce((state) => {
        state.fullGig.gallery = gallery;
      }),
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

type GigWizardStepStore = {
  gigWizardSteps: GigWizardStep[];
  setGigWizardSteps: (step: GigWizardStep[]) => void;
  getGigWizardSteps: () => GigWizardStep[];
  getCurrentGigWizardStep: (index: number) => GigWizardStep;
  setGigWizardStepHrefs: (hrefs: string[]) => void;
  setGigWizardStepCurrent: (index: number) => void;
  setGigWizardStepCompleted: (index: number) => void;
};

export const useGigWizardStepStore = create<GigWizardStepStore>()(
  (set, get) => ({
    gigWizardSteps: [
      {
        name: "Geral",
        step: 1,
        current: true,
        hasBeenCompleted: false,
      },
      {
        name: "Preçário",
        step: 2,
        current: false,
        hasBeenCompleted: false,
      },
      {
        name: "Descrição",
        step: 3,
        current: false,
        hasBeenCompleted: false,
      },
      {
        name: "Galeria",
        step: 4,
        current: false,
        hasBeenCompleted: false,
      },
      {
        name: "Publicar",
        step: 5,
        current: false,
        hasBeenCompleted: false,
      },
    ],
    setGigWizardSteps: (steps) =>
      set(
        produce((state) => {
          state.gigWizardSteps = steps;
        }),
      ),
    getGigWizardSteps: () => {
      return get().gigWizardSteps;
    },
    getCurrentGigWizardStep: (index) => {
      return get().gigWizardSteps[index];
    },
    setGigWizardStepHrefs: (hrefs) =>
      set(
        produce((state) => {
          state.gigWizardSteps.map((step: GigWizardStep, index: number) => {
            step.href = hrefs[index];
          });
        }),
      ),
    setGigWizardStepCurrent(index) {
      set(
        produce((state) => {
          state.gigWizardSteps.map((step: GigWizardStep, i: number) => {
            if (i === index) {
              step.current = true;
            } else {
              step.current = false;
            }
          });
        }),
      );
    },
    setGigWizardStepCompleted(index) {
      set(
        produce((state) => {
          state.gigWizardSteps[index].hasBeenCompleted = true;
        }),
      );
    },
  }),
);
