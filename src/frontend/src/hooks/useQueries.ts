import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoveNote } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllNotes() {
  const { actor, isFetching } = useActor();
  return useQuery<LoveNote[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      const notes = await actor.getAllNotes();
      // Sort most recent first
      return [...notes].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000, // refresh every 30s
  });
}

export function useSubmitNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitNote(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
