import "../../styles/Product.css"
import ProductList from "./ProductList.js"
import products from "../../data/products_data.js"

const Product = () => {
    return(
        <main>
            <h1>Productos</h1>
                <div>
                    {products.map(prods => (
                        <ProductList prod={prods} key={prods} prods={prods}/>
                    ))}
            </div>
        </main>
    )
}
export default Product