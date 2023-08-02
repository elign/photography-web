import SocialShare from "../components/SocialShare";

export default function ContactPage() {

    const sendEmail = (e) => {
        e.preventDefault();
    };
    return (
        <div className="container mx-auto p-2 md:p-16">
            <div className="lg:flex">
                <div className="xl:w-2/5 lg:w-2/5 bg-gray-900 py-16 xl:rounded-bl rounded-tl rounded-tr xl:rounded-tr-none">
                    <div className="xl:w-5/6 xl:px-0 px-8 mx-auto">
                        <h2 className="xl:text-4xl text-3xl pb-4 text-white font-bold">
                            Contact Me Today!
                        </h2>
                        <p className="text-l text-white pb-8 leading-relaxed font-normal lg:pr-4">
                            {`I'm a photographer whose style and personality will click with
              you. I'll meet you beforehand to make you feel comfortable. I'll
              make sure that you enjoy every moment of your special day! And
              I'll capture it... 😉`}
                        </p>
                        <div className="flex pb-4 items-center">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-phone-call"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#ffffff"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 4h5l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v5a1 1 0 0 1 -1 1a16 16 0 0 1 -16 -16a1 1 0 0 1 1 -1" />
                                    <path d="M15 7a2 2 0 0 1 2 2" />
                                    <path d="M15 3a6 6 0 0 1 6 6" />
                                </svg>
                            </div>
                            <p className="pl-4 text-white text-base">+91 877 803 4315</p>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-mail"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#FFFFFF"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={3} y={5} width={18} height={14} rx={2} />
                                    <polyline points="3 7 12 13 21 7" />
                                </svg>
                            </div>
                            <p className="pl-4 text-white text-base">
                                kyrospictures@gmail.com
                            </p>
                        </div>
                        <p className="text-sm text-white pt-10 tracking-wide">
                            28 32, Second Main Rd, Kasturba Nagar, Adyar, Chennai, Tamil Nadu
                            600020
                        </p>
                        <div className="flex justify-start pt-10 items-center gap-4">
                            <h2 className="text-white font-bold">Social Media :</h2>
                            <SocialShare />
                        </div>
                    </div>
                </div>
                <div className="xl:w-3/5 lg:w-3/5 bg-gray-200 h-full pt-5 pb-5 xl:pr-5 xl:pl-0 rounded-tr rounded-br">
                    <form
                        onClick={sendEmail}
                        id="contact"
                        className="bg-white py-4 px-8 rounded-tr rounded-br"
                    >
                        <h1 className="text-4xl text-gray-800 font-extrabold mb-6">
                            {`Let's Talk!`}
                        </h1>
                        <div className="block xl:flex w-full flex-wrap justify-between mb-6">
                            <div className="w-2/4 max-w-xs mb-6 xl:mb-0">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="full_name"
                                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        className="border rounded-lg py-2 px-3 w-full"
                                    />
                                </div>
                            </div>
                            <div className="w-2/4 max-w-xs xl:flex xl:justify-end">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="email"
                                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        required
                                        className="border rounded-lg py-2 px-3 w-full"
                                        type="email"
                                        name="email"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap">
                            <div className="w-2/4 max-w-xs">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="phone"
                                        className="text-gray-800 text-sm font-semibold leading-tight tracking-normal mb-2"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        required
                                        className="border rounded-lg py-2 px-3 w-full"
                                        type="tel"
                                        name="phone"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6">
                            <div className="flex flex-col">
                                <label
                                    className="text-sm font-semibold text-gray-800 mb-2"
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    className="border rounded-lg py-2 px-3 w-full"
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Enter your message"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-5 focus:outline-none bg-gray-800 transition ease-in-out delay-150 duration-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm leading-6"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
