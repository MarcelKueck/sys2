"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface BasicInfo {
  companyName: string;
  name: string;
  role: string;
  email: string;
  password: string;
  website: string;
  linkedinProfile: string;
  teamSize: string;
  companyStage: string;
}

interface AboutBusiness {
  description: string;
  industry: string;
  foundedDate: string;
  fundingStatus: string;
  currentLocation: string;
  techStack: string[];
  companyImages: File[];
}

interface CollaborationProfile {
  lookingFor: string;
  canOffer: string;
  idealNeighbors: string;
  collaborationInterests: string[];
}

interface SpaceSelection {
  selectedSpaces: string[];
  priorities: Record<string, number>;
  additionalNotes: string;
  termsAccepted: boolean;
}

interface ApplicationFormData {
  basicInfo: BasicInfo;
  aboutBusiness: AboutBusiness;
  collaborationProfile: CollaborationProfile;
  spaceSelection: SpaceSelection;
}

interface ApplicationContextType {
  formData: ApplicationFormData;
  updateBasicInfo: (data: Partial<BasicInfo>) => void;
  updateAboutBusiness: (data: Partial<AboutBusiness>) => void;
  updateCollaborationProfile: (data: Partial<CollaborationProfile>) => void;
  updateSpaceSelection: (data: Partial<SpaceSelection>) => void;
  clearForm: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

const initialFormData: ApplicationFormData = {
  basicInfo: {
    companyName: "",
    name: "",
    role: "",
    email: "",
    password: "",
    website: "",
    linkedinProfile: "",
    teamSize: "",
    companyStage: "",
  },
  aboutBusiness: {
    description: "",
    industry: "",
    foundedDate: "",
    fundingStatus: "",
    currentLocation: "",
    techStack: [],
    companyImages: [],
  },
  collaborationProfile: {
    lookingFor: "",
    canOffer: "",
    idealNeighbors: "",
    collaborationInterests: [],
  },
  spaceSelection: {
    selectedSpaces: [],
    priorities: {},
    additionalNotes: "",
    termsAccepted: false,
  },
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  const updateBasicInfo = (data: Partial<BasicInfo>) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...data }
    }));
  };

  const updateAboutBusiness = (data: Partial<AboutBusiness>) => {
    setFormData(prev => ({
      ...prev,
      aboutBusiness: { ...prev.aboutBusiness, ...data }
    }));
  };

  const updateCollaborationProfile = (data: Partial<CollaborationProfile>) => {
    setFormData(prev => ({
      ...prev,
      collaborationProfile: { ...prev.collaborationProfile, ...data }
    }));
  };

  const updateSpaceSelection = (data: Partial<SpaceSelection>) => {
    setFormData(prev => ({
      ...prev,
      spaceSelection: { ...prev.spaceSelection, ...data }
    }));
  };

  const clearForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem("workspace-application-draft");
  };

  const saveToStorage = () => {
    try {
      // Don't save files or sensitive data to localStorage
      const dataToSave = {
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          password: "", // Don't save password
        },
        aboutBusiness: {
          ...formData.aboutBusiness,
          companyImages: [], // Don't save files
        },
      };
      localStorage.setItem("workspace-application-draft", JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save form data to localStorage:", error);
    }
  };

  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem("workspace-application-draft");
      if (saved) {
        const parsedData = JSON.parse(saved);
        setFormData(prev => ({
          ...parsedData,
          basicInfo: {
            ...parsedData.basicInfo,
            password: "", // Always reset password
          },
          aboutBusiness: {
            ...parsedData.aboutBusiness,
            companyImages: [], // Always reset files
          },
        }));
      }
    } catch (error) {
      console.error("Failed to load form data from localStorage:", error);
    }
  };

  // Auto-save to localStorage when form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToStorage();
    }, 1000); // Debounce saves by 1 second

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Load from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        formData,
        updateBasicInfo,
        updateAboutBusiness,
        updateCollaborationProfile,
        updateSpaceSelection,
        clearForm,
        saveToStorage,
        loadFromStorage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return context;
}
