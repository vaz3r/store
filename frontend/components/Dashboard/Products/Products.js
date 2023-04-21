import { useEffect } from "react";
import styles from "./Products.module.css";
import { Products } from "@/utils/Functions/Client";
import { useFormStore, useGlobalStore, useProductsStore, useToastStore } from "@/utils/Store/Store";

const Element = () => {
    const State = {
        Products: useProductsStore((Store) => Store.Products)
    };

    const Update = {
        Products: useProductsStore((Store) => Store.setProducts),
        Toast: useToastStore((Store) => Store.setToast),
        Form: {
            Open: useFormStore((Store) => Store.setOpen),
            Product: useFormStore((Store) => Store.setProduct)
        }
    };

    useEffect(() => {
        Products.Get().then((Products) => {
            Update.Products(Products);
        });
    }, []);

    const Delete = async (ProductID) => {
        try {
            if (!confirm(`Are you sure you want to delete the product?`)) { return; }

            const Result = await Products.Delete(ProductID);

            if (Result) {
                Update.Toast({
                    Active: true,
                    Message: "Product has been deleted successfully!"
                });

                location.reload();
            } else {
                Update.Toast({
                    Active: true,
                    Message: "There has been an issue deleting the product!"
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Edit = (Product) => {
        try {
            Update.Form.Product(Product);
            Update.Form.Open(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className={styles.Products}>
            <article className={`${styles.Row} ${styles.Header}`}>
                <div className={styles.Column} style={{ width: "40%" }}>
                    <span>Name</span>
                </div>

                <div className={styles.Column} style={{ width: "15%" }}>
                    <span>Brand</span>
                </div>

                <div className={styles.Column} style={{ width: "15%" }}>
                    <span>Category</span>
                </div>

                <div className={styles.Column} style={{ width: "10%" }}>
                    <span>Price</span>
                </div>

                <div className={styles.Column} style={{ width: "20%" }}>
                </div>
            </article>

            {
                State.Products.map((Product) => {
                    return (
                        <article key={Product.id} className={styles.Row}>
                            <div className={styles.Column} style={{ width: "40%" }}>
                                <span>{Product?.name}</span>
                            </div>

                            <div className={styles.Column} style={{ width: "15%" }}>
                                <span>{Product?.brand}</span>
                            </div>

                            <div className={styles.Column} style={{ width: "15%" }}>
                                <span>{Product?.category}</span>
                            </div>

                            <div className={styles.Column} style={{ width: "10%" }}>
                                <span>{Product?.price}</span>
                            </div>

                            <div className={styles.Column} style={{ width: "20%" }}>
                                <div className={styles.Actions}>
                                    <button onClick={() => Delete(Product.id)}>
                                        <svg viewBox="-4 -2 24 24"><path d="M14.833 5l-.728 13.11A2 2 0 0 1 12.108 20H3.892a2 2 0 0 1-1.997-1.89L1.167 5H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-.167zM12.83 5H3.17l.722 13h8.216l.722-13zM2 2v1h12V2H2zm4 5a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1z"></path></svg>
                                        Delete
                                    </button>

                                    <button onClick={() => Edit(Product)}>
                                        <svg viewBox="-2.5 -2.5 24 24"><path d="M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z"></path></svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </article>
                    )
                })
            }
        </section>
    );
};

export default Element;