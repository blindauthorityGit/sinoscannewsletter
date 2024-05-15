import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import MainContainer from "../components/layout/mainContainer";
import { motion } from "framer-motion";

import IMG from "../assets/img.jpg";
import MOBILE from "../assets/mobile.jpg";
import Logo from "../assets/logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [info, setInfo] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Validate form fields
        const isValid = info.name.trim() !== "" && /\S+@\S+\.\S+/.test(info.email);
        setIsFormValid(isValid);
    }, [info]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Replace with your Mailchimp API URL and request details
            const response = await fetch("/api/mailchimp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            if (response.ok) {
                setSubmissionStatus("success");
            } else {
                setSubmissionStatus("error");
            }
        } catch (error) {
            setSubmissionStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="supercontainer flex items-center h-screen">
                <MainContainer width="container mx-auto pt-4 font-sans bg-white p-4 md:p-16">
                    <div className="col-span-12">
                        <a href="https://sinoscan.de">
                            {" "}
                            <img className="w-2/4 md:w-auto" src={Logo.src} alt="" />
                        </a>
                    </div>
                    <div className="hidden md:block col-span-4">
                        <motion.img
                            key={IMG.src} // Key changes when image source changes
                            src={IMG.src}
                            alt=""
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="2xl:max-h-[800px]"
                        />
                    </div>
                    <div className="col-span-12 md:hidden">
                        <motion.img
                            key={MOBILE.src} // Key changes when image source changes
                            src={MOBILE.src}
                            alt=""
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="2xl:max-h-[800px]"
                        />
                    </div>
                    <div className="col-span-12 md:col-span-8 md:px-16 mt-4 md:mt-0">
                        <h2 className="font-sans font-semibold text-xl md:text-5xl text-primaryColor text">
                            Bleiben Sie informiert: Abonnieren Sie unseren Newsletter
                        </h2>
                        <p className="mt-3 md:mt-6 text-sm">
                            Verpassen Sie keine wichtigen Neuigkeiten und bleiben Sie stets auf dem Laufenden über
                            alles, was unsere Firma und die Industrie bewegt.
                        </p>
                        <div className="fields mt-8 md:mt-16 w-full">
                            <div className="wrapper flex items-center">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold w-32">
                                    Ihr Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={info.name}
                                    onChange={handleChange}
                                    className="flex-1 bg-lightGray w-full placeholder-transparent sm:placeholder-gray-500 md:w-auto appearance-none  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div className="fields mt-8 w-full">
                            <div className="wrapper flex items-center">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold w-32">
                                    Ihre Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={info.email}
                                    onChange={handleChange}
                                    className="flex-1 bg-lightGray w-full placeholder-transparent sm:placeholder-gray-500 md:w-auto appearance-none  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <button
                            className={`flex-1 sm:flex-initial px-4 sm:px-8 py-2 w-full md:w-auto hover:opacity-40 mb-8 bg-[#002A3A] text-white mt-8 md:mt-16 font-semibold ${
                                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={handleSubmit}
                            disabled={!isFormValid || loading}
                        >
                            {loading ? <div className="spinner"></div> : "Abonnieren"}
                        </button>
                        {submissionStatus === "success" && (
                            <p className="mt-4 !text-green">Vielen Dank für Ihr Abonnement!</p>
                        )}
                        {submissionStatus === "error" && (
                            <p className="mt-4 text-red-500">Es gab einen Fehler. Bitte versuchen Sie es erneut.</p>
                        )}
                    </div>
                </MainContainer>
            </div>

            <style jsx>{`
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border-left-color: #09f;

                    animation: spin 1s ease infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
}
