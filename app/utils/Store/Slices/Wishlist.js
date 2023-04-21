export const WishlistSlice = (set) => ({
    Wishlist: [],
    setWishlist: (State) => set((store) => ({ Wishlist: State })),
});