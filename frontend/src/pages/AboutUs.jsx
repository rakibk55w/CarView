export default function AboutUs() {
    return (
        <div className="
            mx-auto 
            max-w-5xl 
            px-6 
            space-y-10">

            <section className="text-center">
                <h1 className="
                    text-4xl 
                    font-bold 
                    text-primary-600">
                    About Carview
                </h1>

                <p className="
                    mx-auto 
                    mt-4 
                    max-w-3xl 
                    text-lg 
                    text-gray-600 
                    dark:text-gray-300">
                    Carview is an online vehicle auction platform that
                    connects car owners with verified buyers in a secure,
                    transparent, and competitive marketplace. Instead of
                    negotiating with multiple buyers individually, you can
                    let buyers compete by placing bids, helping you receive
                    the best possible value for your vehicle.
                </p>
            </section>

            <section>
                <h2 className="
                    mb-4 
                    text-2xl 
                    font-semibold">
                    How It Works
                </h2>

                <div className="
                    space-y-4 
                    text-gray-700 
                    dark:text-gray-300">
                    <p>
                        Selling your vehicle is simple. Start by creating an
                        auction listing and providing important details
                        about your car, including its specifications,
                        condition, mileage, and photos. Once your listing is
                        complete, choose a starting (base) price and decide
                        how long the auction should remain active.
                    </p>

                    <p>
                        During the auction, verified users can place bids on
                        your vehicle. Every new bid must be higher than the
                        current highest bid, creating a fair and competitive
                        bidding process. Interested buyers can monitor the
                        auction in real time and continue bidding until the
                        auction closes.
                    </p>

                    <p>
                        When the auction ends, the highest valid bidder wins
                        the auction. Both the seller and the winning buyer
                        can then proceed with the next steps to complete the
                        transaction.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="
                    mb-4 
                    text-2xl 
                    font-semibold">
                    Why Choose Carview?
                </h2>

                <ul className="
                    list-disc 
                    space-y-3 pl-6 
                    text-gray-700 
                    dark:text-gray-300">
                    <li>
                        Fair and transparent auction process where buyers
                        compete openly.
                    </li>

                    <li>
                        Simple listing process with detailed vehicle
                        information and multiple photos.
                    </li>

                    <li>
                        Verified users help create a more trustworthy
                        marketplace.
                    </li>

                    <li>
                        Real-time bidding ensures sellers receive
                        competitive offers.
                    </li>

                    <li>
                        Responsive platform that works across desktop,
                        tablet, and mobile devices.
                    </li>
                </ul>
            </section>

            <section className="
                rounded-xl 
                bg-primary-100 
                p-8 
                dark:bg-primary-900">
                <h2 className="
                    mb-4 
                    text-2xl 
                    font-semibold">
                    Our Mission
                </h2>

                <p className="
                    text-gray-700 
                    dark:text-gray-300">
                    At Carview, our mission is to make buying and selling
                    vehicles easier, safer, and more transparent. We believe
                    every seller deserves a fair market price and every
                    buyer deserves accurate information and an equal
                    opportunity to bid. By combining modern technology with
                    a straightforward auction system, we aim to create a
                    marketplace that benefits everyone involved.
                </p>
            </section>
        </div>
    );
}