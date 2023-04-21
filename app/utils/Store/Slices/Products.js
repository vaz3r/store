export const ProductsSlice = (set) => ({
    Products: [],
    Filters: {
        Category: null,
    },
    setProducts: (State) => set((store) => ({ Products: State })),
    setFilters: (State) => set((store) => ({ Filters: Object.assign(store.Filters, State) })),
});