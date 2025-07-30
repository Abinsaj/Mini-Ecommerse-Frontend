import {
    Settings,
    Home,
    BarChart3,
    Users,
    Package,
    CreditCard,
    MessageSquare,
    Calendar,
    X,
    ShoppingCart,
    Upload,
    Save,
    ArrowLeft,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import {  getSingleProduct, updateProduct } from '../../services/AdminService/adminAxiosCall';
import {  useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {

    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const {id} = useParams();
    const [form, setFormData] = useState({
        _id:'',
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: null
    });
    const [imagePreview, setImagePreview] = useState(form.image);
    const [errors, setErrors] = useState({});

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
        { id: 'products', label: 'Products', icon: Package ,path: '/admin/productlist' },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];

    useEffect(()=>{
        const getProduct = async()=>{
            try {
                const data = await getSingleProduct(id)
                setFormData({
                    _id: data.product.id,
                    name: data.product.name || '',
                    description: data.product.description || '',
                    price: data.product.price || '',
                    quantity: data.product.quantity || '',
                    image: data.product.image || null,
                });
                setImagePreview(data.product.image || null);
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    },[id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!form.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!form.price || parseFloat(form.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }

        if (!form.quantity || parseInt(form.quantity) < 0) {
            newErrors.quantity = 'Valid quantity is required';
        }

        if (!form.image) {
            newErrors.image = 'Product image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description)
            formData.append('price', form.price)
            formData.append('quantity', form.quantity)
            formData.append('image', form.image)

            try {

                const data = await updateProduct(id,formData)
                console.log(data,'this is the data we got here')
                if(data.success ){
                    navigate('/admin/productlist')
                }
            } catch (error) {
                console.log(error)
            }

        }
    };


    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
                        <span className="text-xl font-bold text-gray-800">Mini-Ecommerce</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-6 px-3">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 mb-1 rounded-lg text-left transition-colors duration-200 ${activeTab === item.id
                                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <IconComponent className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="flex-1 flex flex-col lg:ml-0">
                <Navbar />

                <div className="bg-white min-h-full">
                    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-4">
                                <button

                                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to Products</span>
                                </button>
                                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-8">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={form.name}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.name
                                                        ? 'ring-red-300 focus:ring-red-600'
                                                        : 'ring-gray-300 focus:ring-blue-600'
                                                    }`}
                                                placeholder={form.name}
                                            />
                                            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows={4}
                                                value={form.description}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.description
                                                        ? 'ring-red-300 focus:ring-red-600'
                                                        : 'ring-gray-300 focus:ring-blue-600'
                                                    }`}
                                                placeholder={form.description}
                                            />
                                            {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price ($)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                step="0.01"
                                                min="0"
                                                value={form.price}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.price
                                                        ? 'ring-red-300 focus:ring-red-600'
                                                        : 'ring-gray-300 focus:ring-blue-600'
                                                    }`}
                                                placeholder="0.00"
                                            />
                                            {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                            Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                min="0"
                                                value={form.quantity}
                                                onChange={handleInputChange}
                                                className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.quantity
                                                        ? 'ring-red-300 focus:ring-red-600'
                                                        : 'ring-gray-300 focus:ring-blue-600'
                                                    }`}
                                                placeholder="0"
                                            />
                                            {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>}
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Image
                                        </label>
                                        <div className="mt-2">
                                            <div className={`flex justify-center rounded-lg border border-dashed px-6 py-10 ${errors.image ? 'border-red-300' : 'border-gray-900/25'
                                                }`}>
                                                <div className="text-center">
                                                    {imagePreview ? (
                                                        <div className="mb-4">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="mx-auto h-32 w-32 object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Upload className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                                    )}
                                                    <div className="flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            htmlFor="image"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                                        >
                                                            <span>{imagePreview ? 'Change image' : 'Upload a file'}</span>
                                                            <input
                                                                id="image"
                                                                name="image"
                                                                type="file"
                                                                className="sr-only"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-4">
                                <button
                                    type="button"
                                    // onClick={handleBackToProducts}
                                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Add Product</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default EditProduct;