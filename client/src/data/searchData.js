import categoryProducts from "./categoryProducts";
import previewProductsData from "./previewProductsData";
// flatten all category items into one array
const categoryList = Object.values(categoryProducts).flat();
const previewList = previewProductsData.map(p=>({
  id: p.id,
  name: p.name,
  price: p.price,
  images: [p.images],
}))
export const allSearchProducts =[ ...categoryList,
  ...previewList];