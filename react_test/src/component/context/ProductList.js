import "../../styles/ProductList.css"

const ProductList = ({prods}) => {
    return(
        <div className="itemgroup">
            <h2>Nombre: {prods.name}</h2>
                <h3>Modelo: {prods.model}</h3>
                <p>Faccion: {prods.faction}</p>
                <p>Descripcion: {prods.description}</p>
                <img src={prods.url} alt={prods.name} />
                <h3>Price: ${prods.price}</h3>
                <h4>Stock: {prods.stock}</h4><div>

            </div>
        </div> 
    )
}

export default ProductList