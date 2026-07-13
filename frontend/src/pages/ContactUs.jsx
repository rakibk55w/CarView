import { Formik, Form} from "formik";
import FormField from "../components/form/FormField";
import TextAreaField from "../components/form/TextAreaField";
import contactUsSchema from "../schemas/contact_us_schema";

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

            <section>
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
                        <Form className="
                            space-y-5 
                            rounded-xl 
                            border 
                            border-gray-200 
                            p-6 shadow-sm 
                            dark:border-gray-800">

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
                            />

                            <TextAreaField
                                label="Message *"
                                name="message"
                                rows={6}
                                maxLength={500}
                                showCharacterCount
                            />

                            <button className="
                                w-full 
                                rounded-lg 
                                bg-primary-600 
                                px-6
                                py-3 
                                font-medium 
                                text-white 
                                transition 
                                hover:bg-primary-700 
                                disabled:opacity-60"
                                type="submit"
                                disabled={isSubmitting}>
                                Send Message
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    );
}