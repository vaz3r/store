import { Products } from "@/utils/Functions/Client";
import { useFormStore, useToastStore } from "@/utils/Store/Store";
import { Fragment, useEffect, useState } from "react";
import styles from "./Form.module.css";

const Form = () => {
    const State = {
        Form: {
            Open: useFormStore((Store) => Store.Open),
            Product: useFormStore((Store) => Store.Product),
        }
    };

    const EditMode = State.Form.Product === null ? false : true;

    const [Name, setName] = useState("");
    const [Brand, setBrand] = useState("");
    const [Category, setCategory] = useState("");
    const [Price, setPrice] = useState("");
    const [ImageURL, setImageURL] = useState("");

    const [ValidationError, setValidationError] = useState(null);

    const Update = {
        Toast: useToastStore((Store) => Store.setToast),
        Form: {
            Product: useFormStore((Store) => Store.setProduct),
            Open: useFormStore((Store) => Store.setOpen),
        }
    };

    useEffect(() => {
        const Product = State.Form.Product;

        if (Product !== null) {
            setName(Product.name);
            setBrand(Product.brand);
            setCategory(Product.category);
            setPrice(Product.price);
            setImageURL(Product.image_url);
        }
    }, [State.Form.Product]);

    const Close = () => {
        try {
            Update.Form.Product(null);
            Update.Form.Open(false);
        } catch (error) {
            console.log(error);
        }
    };

    const Submit = async () => {
        try {
            if (Name.length < 1) {
                setValidationError("Please enter a product name.");
                return;
            }

            if (Brand.length < 1) {
                setValidationError("Please enter a product brand name.");
                return;
            }

            if (Category.length < 1) {
                setValidationError("Please enter a product category name.");
                return;
            }

            if (Price.length < 1) {
                setValidationError("Please enter a product price.");
                return;
            }

            if (EditMode) {
                const ProductID = State.Form?.Product?.id;

                if (ProductID != undefined) {
                    const Updated = await Products.Edit(ProductID, Name, Brand, Category, Price, ImageURL);

                    if (Updated) {
                        Update.Toast({
                            Active: true,
                            Type: "SUCCESS",
                            Message: "Product has been updated successfully."
                        });

                        location.reload();
                        return;
                    }
                }

                Update.Toast({
                    Active: true,
                    Type: "ERROR",
                    Message: "There has been an issue updating the product, please try again later!"
                });
            } else {
                const Added = await Products.Add(Name, Brand, Category, Price, ImageURL);

                if (Added) {
                    Update.Toast({
                        Active: true,
                        Type: "SUCCESS",
                        Message: "Product has been added successfully."
                    });

                    location.reload();
                } else {
                    Update.Toast({
                        Active: true,
                        Type: "ERROR",
                        Message: "There has been an issue creating the product, please try again later!"
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }

        setValidationError(null);
    };

    if (State.Form.Open === false) { return null; }

    return (
        <Fragment>
            <section className={styles.Wrapper}>
                <div className={styles.Form}>
                    <div className={styles.Header}>
                        <h1>New Product</h1>

                        <button onClick={() => Close()}>
                            <svg viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                        </button>
                    </div>

                    <div className={styles.Content}>
                        <div className={styles.Input}>
                            <input value={Name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Product name"></input>
                        </div>

                        <div className={styles.Input}>
                            <input value={Brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Brand name"></input>
                        </div>

                        <div className={styles.Input}>
                            <input value={Category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category"></input>
                        </div>

                        <div className={styles.Input}>
                            <input value={Price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price"></input>
                        </div>

                        <div className={styles.Input}>
                            <input value={ImageURL} onChange={(e) => setImageURL(e.target.value)} type="text" placeholder="Image URL"></input>
                        </div>

                        {
                            ValidationError !== null && (
                                <span className={styles.Error}>{ValidationError}</span>
                            )
                        }

                        <button onClick={() => Submit()}>{EditMode ? "Save" : "Create"}</button>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Form;