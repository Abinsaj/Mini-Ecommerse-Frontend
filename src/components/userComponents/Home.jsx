import React, { useEffect, useState } from 'react'
import { getAllProduct } from '../../services/AdminService/adminAxiosCall'
import { ShoppingCart } from 'lucide-react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, setCartItems } from '../../redux/Slices/cartSlice'
import { getUserCart, updatedUserCart } from '../../services/UserService/userAxiosCall'
import { toast } from 'sonner'

const Home = () => {

    const dispatch = useDispatch();

    const [product, setProducts] = useState([]);
    const cartItems = useSelector(state => state.cart.cartItems);
    const user = useSelector(state => state.user.user);


    const fetchUserCart = async () => {
        if (user && user._id) {
            try {
                const data = await getUserCart(user._id);
                if (data && data.cart) {
                    dispatch(setCartItems(data.cart));
                }
            } catch (error) {
                console.error('Failed to fetch user cart:', error);

            }
        }
    };
    useEffect(() => {
        fetchUserCart();
    }, [dispatch]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProduct();
                setProducts(data.product);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            dispatch(addToCart(product));

            await updatedUserCart(user._id, product._id,);
            toast.success('Item added to the cart')
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    return (
        <div>
            <Header />
            <div className="relative overflow-hidden bg-white mt-6">
                <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Summer styles are finally here
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                                if you live or die.
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                                                        className="size-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="#"
                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                                >
                                    Shop Collection
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 pb-4">Products</h1>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {product && product.map((pdt) => {

                            const isInCart = cartItems.some((item) => item.productId === pdt._id);
                            return (
                                <div key={pdt._id} className="group">
                                    <div className="relative">
                                        <img
                                            alt={pdt.image}
                                            src={pdt.image}
                                            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                        />

                                        <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {isInCart ? (
                                                <a
                                                    href="/cart"
                                                    className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                >
                                                    Go to Cart
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleAddToCart(pdt);
                                                    }}
                                                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-150"
                                                    aria-label="Add to cart"
                                                >
                                                    <ShoppingCart className="w-4 h-4 text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="mt-4 text-sm text-gray-700">{pdt.name}</h3>
                                    <h3 className="mt-4 text-sm text-gray-700">{pdt.description}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{pdt.price}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Home
