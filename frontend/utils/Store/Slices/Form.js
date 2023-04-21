export const FormSlice = (set) => ({
    Open: false,
    Product: null,
    setOpen: (State) => set((store) => ({ Open: State })),
    setProduct: (State) => set((store) => ({ Product: State })),
});