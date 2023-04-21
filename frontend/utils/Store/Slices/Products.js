export const ProductsSlice = (set) => ({
    Products: [],
    setProducts: (State) => set((store) => ({ Products: State })),
});