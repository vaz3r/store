export const ToastSlice = (set) => ({
    Toast: {
        Active: false,
        Position: "top-center",
        Type: "SUCCESS",
        Message: "",
    },
    setToast: (State) => set((store) => (Object.assign(store.Toast, State))),
});