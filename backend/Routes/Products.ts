import express, { Router, Request, Response } from 'express';
import { Query } from '../Database';
import { UserAuthentication, SendResponse, IAuthenticationRequest } from '../utils';

const ExpressRouter: Router = express.Router();

ExpressRouter.get('/', async (req: Request, res: Response) => {
    try {
        let Products: any = (await Query(`SELECT * FROM "Products" ORDER BY "Created" DESC;`))?.rows;

        if (Products !== undefined && Products.length > 0) {
            Products = Products.map((Product: any) => {
                return {
                    id: Product?.ID,
                    name: Product?.Name,
                    brand: Product?.Brand,
                    category: Product?.Category,
                    image_url: Product?.ImageURL,
                    price: Product?.Price
                }
            });

            return SendResponse(res, 200, { Products });
        }
    } catch (error: any) {
        console.log(error?.message);

        return SendResponse(res, 500, {
            Message: error?.message
        });
    }

    return SendResponse(res, 200, { Products: [] });
});

ExpressRouter.get('/categories', async (req: Request, res: Response) => {
    try {
        let Categories: any = (await Query(`SELECT DISTINCT "Category" FROM "Products";`))?.rows;

        if (Categories !== undefined && Categories.length > 0) {
            Categories = Categories.map((Category: any) => {
                return {
                    name: Category?.Category,
                }
            });

            return SendResponse(res, 200, { Categories });
        }
    } catch (error: any) {
        console.log(error?.message);

        return SendResponse(res, 500, {
            Message: error?.message
        });
    }

    return SendResponse(res, 200, { Products: [] });
});

ExpressRouter.get('/:category', async (req: Request, res: Response) => {
    try {
        const Category: string = req.params.category;

        let Products: any = (await Query(`SELECT * FROM "Products" WHERE LOWER("Category") = LOWER('${Category}') ORDER BY "Created" DESC;`))?.rows;

        if (Products !== undefined && Products.length > 0) {
            Products = Products.map((Product: any) => {
                return {
                    id: Product?.ID,
                    name: Product?.Name,
                    brand: Product?.Brand,
                    category: Product?.Category,
                    image_url: Product?.ImageURL,
                    price: Product?.Price
                }
            });

            return SendResponse(res, 200, { Products });
        }
    } catch (error: any) {
        console.log(error?.message);

        return SendResponse(res, 500, {
            Message: error?.message
        });
    }

    return SendResponse(res, 200, { Products: [] });
});

ExpressRouter.post("/", UserAuthentication, async (req: Request, res: Response) => {
    try {
        const Name: string = req.body.Name;
        const Brand: string = req.body.Brand;
        const Category: string = req.body.Category;
        const Price: number = req.body.Price;
        const ImageURL: string = req.body.ImageURL;

        const Timestamp: number = Date.now() / 1000;

        const Response = await Query(`INSERT INTO "Products" ("Name", "Brand", "Category", "Price", "ImageURL", "Created") VALUES ('${Name}', '${Brand}', '${Category}', '${Price}', '${ImageURL}', to_timestamp('${Timestamp}'))`);

        if (Response?.rowCount > 0) {
            return SendResponse(res, 201, {
                Message: "Product has been inserted successfully."
            });
        }

        return SendResponse(res, 404, {
            Message: "Invalid parameters supplied to the request"
        });
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

ExpressRouter.patch("/:productId", UserAuthentication, async (req: Request, res: Response) => {
    try {
        const ProductID: string = req.params.productId;

        const Name: string = req.body.Name;
        const Brand: string = req.body.Brand;
        const Category: string = req.body.Category;
        const Price: number = req.body.Price;
        const ImageURL: string = req.body.ImageURL;

        const Timestamp: number = Date.now() / 1000;

        const Response = await Query(`UPDATE "Products" SET "Name" = '${Name}', "Brand" = '${Brand}', "Category" = '${Category}', "Price" = '${Price}', "ImageURL" = '${ImageURL}', "Updated" = to_timestamp('${Timestamp}') WHERE "ID" = ${ProductID};`);

        if (Response?.rowCount > 0) {
            return SendResponse(res, 200, {
                Message: "Product has been updated successfully."
            });
        }

        return SendResponse(res, 404, {
            Message: "Invalid parameters supplied to the request"
        });
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

ExpressRouter.delete("/:productId", UserAuthentication, async (req: Request, res: Response) => {
    try {
        const ProductID: number = parseInt(req.params.productId);

        const Response = await Query(`DELETE FROM "Products" WHERE "ID" = ${ProductID};`);

        if (Response?.rowCount > 0) {
            return SendResponse(res, 200, {
                Message: "Product has been deleted successfully."
            });
        }

        return SendResponse(res, 404, {
            Message: "Invalid parameters supplied to the request"
        });
    } catch (error: any) {
        console.log(error);
        return SendResponse(res, 500, {
            Message: error?.message
        });
    }
});

export default ExpressRouter;