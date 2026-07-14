import { Formik, Form } from "formik";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import registerSchema from "../schemas/registerSchema";
import FormField from "../components/form/FormField";
import CustomButton from "../components/button/CustomButton";
import { formStyle } from "../utils/formStyle";

export default function Register() {
    return (
        <div className="
            mx-auto 
            max-w-md">
            <div className={formStyle}>

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
                                passwordToggle
                            />

                            <CustomButton className="w-full"
                                type="submit"
                                disabled={isSubmitting}>
                                Create Account
                            </CustomButton>
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
                    <CustomButton className="w-full"
                        primaryButton={false}
                        icon={
                            <FcGoogle size={22}/>
                        }
                        onClick={() => {
                            // TODO
                        }}>
                        Continue with Google
                    </CustomButton>
                    <CustomButton className="w-full" 
                        primaryButton={false}
                        icon={
                            <FaFacebook className="
                                text-blue-600"
                                size={22}
                            />
                        }
                        onClick={() => {
                            // TODO
                        }}>
                        Continue with Facebook
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}