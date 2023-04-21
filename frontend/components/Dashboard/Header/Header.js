import AuthInstance from "@/utils/Authentication/Instance";
import { useFormStore, useUserStore } from "@/utils/Store/Store";
import { Fragment } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const State = {
        User: useUserStore((Store) => Store.User)
    };

    const Update = {
        Form: {
            Open: useFormStore((Store) => Store.setOpen)
        }
    };

    return (
        <Fragment>
            <section className={styles.Header}>
                <figure>
                    <h1>Store Admin</h1>
                    <span>{State.User?.Email}</span>
                </figure>

                <div className={styles.Actions}>
                    <button onClick={() => Update.Form.Open(true)} className={styles.Primary}>Add Product</button>
                    <button onClick={() => AuthInstance.Functions.SignOut()}>Logout</button>
                </div>
            </section>
        </Fragment>
    );
};

export default Header;