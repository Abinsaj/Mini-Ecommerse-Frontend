import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { adminLogin } from '../../services/AdminService/adminAxiosCall'
import { useNavigate } from 'react-router-dom'

const AdminLoginForm = () => {

    const navigate = useNavigate()

    const formik = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: Yup.object({
                email: Yup.string()
                    .transform((value) => value.trim())
                    .email('Invalid email address')
                    .required("Email is required"),
                password: Yup.string()
                    .transform((value) => value.trim())
                    .min(8, "password must be atleast 8 characters")
                    .required("password is required"),
            }),
            onSubmit: async (values) => {
                try {
                    const data = await adminLogin(values)
                    
                    if (data.success) {
                        localStorage.setItem('admin',data.admin)
                        localStorage.setItem('accessToken',data.accessToken)
                        navigate('/admin/dashboard')
                    } else {
                        console.log(data.message)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })

    return (
        <div className='w-full h-screen flex items-start'>
            <div className="relative w-1/2 h-full flex-col hidden md:flex">
                <div className="absolute top-[30%] left-[10%] flex flex-col">
                    <h1 className="text-4xl text-white font-bold my-4 opacity-100">
                    Discover exclusive deals on top products.
                    </h1>
                    <p className="text-xl text-white font-normal opacity-100">
                    Shop smart and save big on the latest collections.
                    </p>
                </div>
                <img
                    className="w-full h-full object-cover"
                    src='/images/login2.jpg'
                    alt='Background Image'
                />
            </div>
            <div className="w-full md:w-1/2 sm:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 ml-auto">
                <div className="flex h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-2">
                        
                        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign In
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>
                            

                            <div>
                                <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        autoComplete="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.email}
                                        </div>
                                    ) : null}
                                </div>
                            </div>


                            <div>
                                <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full border-b border-black text-sm bg-[#f5f5f5] outline-none px-1 py-1"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.password}
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            

                            <div>
                                <button
                                    type="submit"
                                    className="flex h-12 w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white  mt-8 shadow-sm hover:bg-[#04A118] focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-[#04A118]"
                                >
                                    Sign In
                                </button>
                
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLoginForm
