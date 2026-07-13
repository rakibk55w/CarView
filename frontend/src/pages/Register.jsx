import { Formik, Form } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import registerSchema from "../schemas/register_schema";
import FormField from "../components/form/FormField";


export default function Register() {
    return (
        <div className="
            mx-auto 
            max-w-md">
            <div className="
                rounded-xl 
                border 
                border-gray-200 
                p-8 
                shadow-sm 
                dark:bg-gray-800
                dark:border-gray-700">

                <h1 className="
                    mb-2 
                    text-center 
                    text-3xl 
                    font-bold 
                    text-primary-600">
                    Create Account
                </h1>

                <p className="
                    mb-8 
                    text-center 
                    text-gray-600 
                    dark:text-gray-400">
                    Join Carview and start buying or selling vehicles today.
                </p>

                <Formik initialValues={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values) => {
                        console.log(values);

                        // TODO:
                        // axios.post("/api/auth/register", values);
                    }}>

                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <FormField label="Name" 
                                name="name"
                            />

                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                            />

                            <FormField
                                label="Password"
                                name="password"
                                type="password"
                            />

                            <button className="
                                w-full 
                                rounded-lg 
                                bg-primary-600 
                                py-3 font-medium 
                                text-white 
                                hover:bg-primary-700"
                                type="submit"
                                disabled={isSubmitting}>
                                Create Account
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="
                    my-6 
                    flex 
                    items-center">
                    <div className="
                        h-px 
                        flex-1 
                        bg-gray-300 
                        dark:bg-gray-700"
                    />
                    <span className="
                        px-4 
                        text-sm 
                        text-gray-500">
                        OR
                    </span>
                    <div className="
                        h-px 
                        flex-1 
                        bg-gray-300 
                        dark:bg-gray-700"
                    />
                </div>

                <div className="space-y-3">
                    <button className="
                        flex w-full 
                        items-center 
                        justify-center 
                        gap-3 
                        rounded-lg border 
                        border-gray-300 
                        py-3 
                        hover:bg-gray-50 
                        dark:border-gray-700 
                        dark:hover:bg-gray-900"
                        type="button"
                        onClick={() => {
                            // TODO:
                            // Google OAuth
                        }}>
                        <FcGoogle size={22} />
                        Continue with Google
                    </button>

                    <button className="
                        flex 
                        w-full 
                        items-center 
                        justify-center 
                        gap-3 
                        rounded-lg border 
                        border-gray-300 
                        py-3 
                        hover:bg-gray-50 
                        dark:border-gray-700 
                        dark:hover:bg-gray-900"
                        type="button"
                        onClick={() => {
                            // TODO:
                            // Facebook OAuth
                        }}>
                        <FaFacebook
                            size={22}
                            className="text-blue-600"
                        />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}