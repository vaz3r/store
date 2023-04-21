export const AuthenticationSlice = (set) => ({
    LoggedIn: false,
    User: {},
    Token: null,
    setToken: (State) => set((store) => ({ Token: State })),
    setUser: (State) => set((store) => ({ User: State })),
    setLoggedIn: (State) => set((store) => ({ LoggedIn: State })),
});