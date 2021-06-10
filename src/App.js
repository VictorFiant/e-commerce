import React, { useState, useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './Components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './Lib/commerce';



const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Get all of the products from Commercer.js
     * 
     */
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    /**
     * Get only one product by id from Commerce.js
     */

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    };

    /**
     * Take a product and add to Cart
     */

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    /*
    *  Update the cart (quantity) by product Id
    */

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    };
     /*
    *  Remove products one by one  by product Id
    */

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart);
    };
     
    /*
    *  Empty the cart 
    */

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()

        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();

    }, []);
    console.log(cart)


    return (
        <Router>
            <div>
                <Navbar totalItem={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>

    )
};

export default App;