import { Fragment, useEffect, useMemo } from "react";
import { useUserStore } from "../utils/Store/Store";
import AuthInstance from "../utils/Authentication/Instance";
import Toast from "./Toast";

const Layout = ({ children }) => {
    const { Hydrated } = children?.props || {};

    // Hydrate Store
    useMemo(() => {
        if (Hydrated?.User != undefined) {
            useUserStore.getState().setUser(Hydrated.User);
        }
    }, [Hydrated]);

    useEffect(() => {
        AuthInstance.HydrateToken();
    }, []);

    return (
        <Fragment>
            <Toast />
            {children}
        </Fragment>
    );
};

export default Layout;