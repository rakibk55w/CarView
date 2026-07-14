import { Formik, Form} from "formik";
import FormField from "../components/form/FormField";
import TextAreaField from "../components/form/TextAreaField";
import contactUsSchema from "../schemas/contactUsSchema";
import CustomButton from "../components/button/CustomButton";
import { formStyle } from "../utils/formStyle";

export default function ContactUs() {
    return (
        <div className="
            grid 
            gap-12 
            lg:grid-cols-2">

            <section className="
                flex 
                flex-col 
                justify-start">
                <h1 className="
                    mb-6 
                    text-4xl 
                    font-bold 
                    text-primary-600">
                    Contact Us
                </h1>

                <div className="
                    space-y-5 
                    text-gray-700 
                    dark:text-gray-300">
                    <p>
                        We'd love to hear from you. Whether you have questions
                        about selling your vehicle, participating in an auction,
                        or using Carview, our team is here to help.
                    </p>

                    <p>
                        If you've encountered a problem, have suggestions for
                        improving our platform, or simply need assistance, fill
                        out the contact form and we'll get back to you as soon
                        as possible.
                    </p>

                    <p>
                        Our goal is to provide a secure, transparent, and
                        user-friendly experience for every buyer and seller on
                        Carview.
                    </p>
                </div>
            </section>

            <section className={formStyle}>
                <Formik
                    initialValues={{
                        email: "",
                        contact_number: "",
                        subject: "",
                        message: ""
                    }}
                    validationSchema={contactUsSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);

                        // TODO:
                        // axios.post("/api/contact-us", values);

                        resetForm();
                    }}>

                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <FormField
                                label="Email *"
                                name="email"
                                type="email"
                            />

                            <FormField
                                label="Contact Number"
                                name="contact_number"
                                type="password"
                            />

                            <FormField
                                label="Subject *"
                                name="subject"
                                type="text"
                            />

                            <TextAreaField
                                label="Message *"
                                name="message"
                                rows={6}
                                maxLength={500}
                                showCharacterCount
                            />

                            <CustomButton className="w-full" 
                                type="submit"
                                disabled={isSubmitting}>
                                Send Message
                            </CustomButton>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    );
}