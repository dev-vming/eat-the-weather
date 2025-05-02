import { create } from 'zustand';

interface QueryTriggerState {
  queryTrigger: boolean;
  setQueryTriggerFalse: () => void;
  toggleQueryTrigger: () => void;
}

export const useQueryTriggerStore = create<QueryTriggerState>((set) => ({
  queryTrigger: false,
  setQueryTriggerFalse: () => set(() => ({ queryTrigger: false })),
  toggleQueryTrigger: () =>
    set((state) => ({ queryTrigger: !state.queryTrigger })),
}));
