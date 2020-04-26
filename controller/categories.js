import {
  ErrorCustomResponse,
  SuccessCustomResponse,
} from "../lib/customResponse";
import Category from "../model/category";

export async function getCategories(req, res) {
  res.send(
    new SuccessCustomResponse(
      200,
      "Category list received.",
      await Category.all()
    )
  );
}
