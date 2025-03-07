import { supabase } from "@/utils/supabase";
import { Pet } from "../types";

// Mock data for development
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    created_at: new Date().toISOString(),
    owner_id: "123",
    logs_weight: [],
    logs_bodycondition: [],
    logs_vet_visits: null,
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    created_at: new Date().toISOString(),
    owner_id: "123",
    logs_weight: [],
    logs_bodycondition: [],
    logs_vet_visits: null,
  },
];

export const petService = {
  async getPets(): Promise<Pet[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [...mockPets];
  },

  async getPetById(id: string): Promise<Pet> {
    try {
      const [petInfo, petBodyLogs, petVetLogs, petWeightLogs] =
        await Promise.all([
          supabase.from("pets").select("*").eq("id", id).single(),
          supabase.from("body_condition_logs").select("*").eq("pet_id", id).order('date', { ascending: false }),
          supabase.from("vet_visit_logs").select("*").eq("pet_id", id).order('date', { ascending: false }),
          supabase.from("weight_logs").select("*").eq("pet_id", id).order('date', { ascending: false }),
        ]);

      if (petInfo.error) throw petInfo.error;
      if (petBodyLogs.error) throw petBodyLogs.error;
      if (petVetLogs.error) throw petVetLogs.error;
      if (petWeightLogs.error) throw petWeightLogs.error;

      return {
        ...petInfo.data,
        logs_bodycondition: petBodyLogs.data || [],
        logs_vet_visits: petVetLogs.data || [],
        logs_weight: petWeightLogs.data || [],
      };
    } catch (error) {
      console.error("Error in getPetById:", error);
      throw error;
    }
  },

  async createPet(pet: Omit<Pet, "id" | "created_at">): Promise<Pet> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newPet: Pet = {
      ...pet,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    mockPets.push(newPet);
    return newPet;
  },

  async updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = mockPets.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Pet not found");
    }
    mockPets[index] = { ...mockPets[index], ...updates };
    return mockPets[index];
  },

  async deletePet(id: string): Promise<void> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = mockPets.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Pet not found");
    }
    mockPets.splice(index, 1);
  },
};
