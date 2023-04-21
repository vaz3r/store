import { Fragment } from "react";
import styles from "./UnAuthorized.module.css";

const UnAuthorized = () => {
    return (
        <Fragment>
            <section className={styles.UnAuthorized}>
                <h1>UnAuthorized</h1>
                <p>You are not authorized and do not have enough permissions to access this page.</p>
            </section>
        </Fragment>
    );
};

export default UnAuthorized;