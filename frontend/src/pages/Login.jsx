import { Formik, Form } from "formik";
import FormField from "../components/form/FormField";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showInfoToast, showSuccessToast } from "../utils/toast";
import loginSchema from "../schemas/loginSchema";
import CustomButton from "../components/button/CustomButton";
import { formStyle } from "../utils/formStyle";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

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
                    Welcome Back
                </h1>

                <p className="
                    mb-8 
                    text-center 
                    text-gray-600 
                    dark:text-gray-400">
                    Sign in to continue to Carview.
                </p>

                <Formik initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={async (
                        values,
                        { resetForm }
                    ) => {
                        try {
                            const response = await axiosInstance.post(
                                "/login",
                                values
                            );

                            login(response.data.access_token);

                            showSuccessToast(
                                response.data.message || "Login successful"
                            );

                            showInfoToast(
                                "Redirecting to home in 2 seconds..."
                            );

                            resetForm();

                            setTimeout(() => {
                                navigate("/");
                            }, 2000);

                        } catch (error) {
                            showErrorToast(
                                error.response?.data?.message ||
                                "Login failed. Please try again."
                            );
                        }
                    }}>

                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
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
                                {isSubmitting
                                    ? "Logging in..."
                                    : "Login"
                                }
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