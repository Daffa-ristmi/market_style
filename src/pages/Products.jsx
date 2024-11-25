import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import Counter from "../components/Fragments/Counter";
import { getProducts } from "../service/product.service";
import { getUsername } from "../service/auth.service";
import { useLogin } from "../hooks/useLogin";


// const products = [{
//     id: 1,
//     name: "Baju Baru",
//     price: 100000,
//     image: "/images/cloth-1.jpg",
//     description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
//                     Commodi architecto quasi quisquam assumenda incidunt temporibus a maiores ea dolore esse, 
//                     officiis magnam fugiat perspiciatis ad dolorem harum quaerat neque vero!`,
// },

// {
//     id: 2,
//     name: "Baju Lama",
//     price: 300000,
//     image: "/images/cloth-1.jpg",
//     description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`,
// },

// {
//     id: 3,
//     name: "Baju Merk ",
//     price: 500000,
//     image: "/images/cloth-1.jpg",
//     description: `Ini Baju Baru Merk X.`,
// }
// ]

const token = localStorage.getItem("token");

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const[totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([])
    const username = useLogin();

    useEffect(() => {
       setCart(JSON.parse(localStorage.getItem("cart")) || [])
    }, [])

    

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        });
    }, []);

    useEffect (() => {
        if (products.length > 0 && 
                cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                return acc + product.price * item.qty
            }, 0 );
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, products])


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href="/Login"
    }

    const handleAddToCart = (id) => {
        if(cart.find((item) => item.id === id)){
            setCart(
                cart.map((item) =>
                item.id === id ? {... item, qty: item.qty + 1} : item
                )
            )
        } else {
            setCart([...cart, {id, qty: 1}])
        }
    };

    // useref
    const cartRef = useRef (JSON.parse(localStorage.getItem("cart")) || [])

    const hadleAddToCartRef= (id) => {
        cartRef.current = [...cartRef.current, {id, qty: 1}];
        localStorage.setItem("cart", JSON.stringify(cartRef.current))
    };

    const totalPriceRef = useRef(null)

    useEffect(() => {
        if (cart.length > 0 ) {
            totalPriceRef.current.style.display = "table-row"
        } else {
            totalPriceRef.current.style.display = "none"
        }
    })

    return (
        <Fragment>
            <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
            {username}
            <Button className="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center py-5">
           <div className="w-3/4 flex flex-wrap">
           {products.length > 0 && 
                products.map((product) =>(
                 <CardProduct key={product.id}>
                 <CardProduct.Header image={product.image} id={product.id}/>
                 <CardProduct.Body name={product.title}>
                     {product.description}
                 </CardProduct.Body>
                 <CardProduct.Footer 
                 price={product.price} 
                 id={product.id}
                 handleAddToCart={handleAddToCart}/>
             </CardProduct>
            ))}
           </div>
           <div className="w-1/4">
            <h1 className="text-3xl font-bold text-blue-600 ml-5 mb-2">Cart</h1>
            <table className="text-left table-auto border-seperate border-spacing-x-5">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 && 
                        cart.map((item) =>{
                        const product = products.find((product) => product.id === item.id);

                        return (
                            <tr key={item.id}>
                                <td>{product.title.substring(0, 10)}...</td>
                                <td> ${""} 
                                {product.price.toLocaleString("id-ID", {
                                    styles: "currency", 
                                    currency: "USD"})}</td>
                                <td>{item.qty}</td>
                                <td>
                                    ${""}
                                    {(item.qty * product.price).toLocaleString("id-ID", {
                                        styles: "currency",
                                        currency: "USD"
                                    })}
                                </td>
                            </tr>
                        )
                    })}
                    <tr ref={totalPriceRef}>
                        <td colSpan={3}>
                            <b>
                                Total Price
                            </b>
                        </td>
                        <td>
                            <b>
                            Rp {""}
                              {totalPrice.toLocaleString("id-ID", {
                                styles: "currency",
                                currency: "IDR"
                        })}
                            </b>
                        </td>
                    </tr>
                </tbody>
            </table>
           </div>
         </div>
         <div className="mt-5 flex justify-center">
            <Counter></Counter>
         </div>
        </Fragment>
    );
};

export default ProductPage