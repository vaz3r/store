export const GlobalSlice = (set) => ({
    Loading: false,
    setLoading: (State) => set((store) => ({ Loading: State })),
    setGlobal: (State) => set((store) => (Object.assign(store, State))),
});