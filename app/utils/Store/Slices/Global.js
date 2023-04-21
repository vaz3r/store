export const GlobalSlice = (set) => ({
    ActiveScreen: "Products",
    Loading: false,
    setActiveScreen: (State) => set((store) => ({ ActiveScreen: State })),
    setLoading: (State) => set((store) => ({ Loading: State })),
    setGlobal: (State) => set((store) => (Object.assign(store, State))),
});