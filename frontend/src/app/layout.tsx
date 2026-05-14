
import Navbar from "@/Component/Navbar";
import "./globals.css";
import Footer from "@/Component/Footer";
import Script from "next/script";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-black via-purple-900 to-black text-white">  
         <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        /> 
          <Navbar />    
        {children}
        <Footer />
      </body>
    </html>
  );
}
