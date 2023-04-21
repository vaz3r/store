export const SignalsSlice = (set) => ({
    Refresh: null,
    setRefresh: (State) => set((store) => ({ Refresh: State })),
});