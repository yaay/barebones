import { useState, useEffect, useCallback } from "react";
import { Pet } from "@/types";
import { petService } from "@/services/petService";

export const usePet = (petId: string) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPet = useCallback(async () => {
    setLoading(true); 
    setError(null);

    try {
      const petData = await petService.getPetById(petId);
      setPet(petData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  return { pet, loading, error, refetch: fetchPet };
};
