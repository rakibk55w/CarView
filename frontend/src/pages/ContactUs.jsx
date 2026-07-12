import { Formik, Form, Field, ErrorMessage } from "formik";
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

                    {({ values, isSubmitting }) => (
                        <Form className="
                            space-y-5 
                            rounded-xl 
                            border 
                            border-gray-200 
                            p-6 shadow-sm 
                            dark:border-gray-800">

                            <div>
                                <label className="
                                    mb-2 
                                    block 
                                    font-medium">
                                    Email *
                                </label>

                                <Field className="
                                    w-full 
                                    rounded-lg 
                                    border 
                                    border-gray-300 
                                    px-4 
                                    py-2 
                                    outline-none 
                                    focus:border-primary-500 
                                    dark:border-gray-700 
                                    dark:bg-gray-900"
                                    name="email"
                                    type="email"
                                />

                                <ErrorMessage className="
                                    mt-1 
                                    text-sm 
                                    text-red-500"
                                    name="email"
                                    component="p"
                                />
                            </div>

                            <div>
                                <label className="
                                    mb-2 
                                    block 
                                    font-medium">
                                    Contact Number
                                </label>

                                <Field className="
                                    w-full 
                                    rounded-lg 
                                    border 
                                    border-gray-300 
                                    px-4 
                                    py-2 
                                    outline-none 
                                    focus:border-primary-500 
                                    dark:border-gray-700 
                                    dark:bg-gray-900"
                                    name="contact_number"
                                />

                                <ErrorMessage className="
                                    mt-1 
                                    text-sm 
                                    text-red-500"
                                    name="contact_number"
                                    component="p"
                                />
                            </div>

                            <div>
                                <label className="
                                    mb-2 
                                    block 
                                    font-medium">
                                    Subject *
                                </label>

                                <Field className="
                                    w-full 
                                    rounded-lg 
                                    border 
                                    border-gray-300 
                                    px-4 py-2 outline-none 
                                    focus:border-primary-500 
                                    dark:border-gray-700 
                                    dark:bg-gray-900"
                                    name="subject"
                                />

                                <ErrorMessage className="
                                    mt-1 
                                    text-sm 
                                    text-red-500"
                                    name="subject"
                                    component="p"
                                />
                            </div>

                            <div>
                                <label className="
                                    mb-2 
                                    block 
                                    font-medium">
                                    Message *
                                </label>

                                <div className="relative">
                                    <Field className="
                                        w-full 
                                        resize-none 
                                        rounded-lg 
                                        border 
                                        border-gray-300 
                                        px-4 
                                        py-2 
                                        pb-8
                                        outline-none 
                                        focus:border-primary-500 
                                        dark:border-gray-700 
                                        dark:bg-gray-900"
                                        as="textarea"
                                        rows="6"
                                        name="message"
                                        maxLength={500}
                                    />
                                    <span className="
                                        pointer-events-none
                                        absolute
                                        bottom-2
                                        right-1
                                        text-xs
                                        text-gray-500
                                        dark:text-gray-400">
                                        {values.message.length}/500
                                    </span>
                                </div>


                                <ErrorMessage className="
                                    mt-1 
                                    text-sm 
                                    text-red-500"
                                    name="message"
                                    component="p"
                                />
                            </div>

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