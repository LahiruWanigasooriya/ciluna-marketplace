import imageBanner from "@/public/assets/trackYourOrder/ImageBanner.webp";
import React from "react";
import Image from "next/image";
import TrackingDetails from "./trackingDetails"
const trackyourorder: React.FC = () => {
    return(
         <div className="relative ">
              <Image
                src={imageBanner}
                alt="bannerimg"
                className="hidden md:block w-screen h-[468px] object-cover object-top mt-[108px]"
                style={{ objectPosition: "center 50%" }}
              />
              <div className="relative ">
              <Image
                src={imageBanner}
                alt="bannerImage mobile"
                className="block md:hidden w-screen h-[258px] object-cover object-center mt-[104px] "
                style={{ objectPosition: "center 10%",
                 }}
              />
              <div className="progressive-blur"></div>
              </div>
            <div className="absolute top-[79px] md:top-[10%] lg:top-[15%]  w-full md:w-full lg:w-full   flex flex-col  p-[16px] lg:left-1/2  gap-[12px] lg:px-[287px] lg:py-[180px] lg:gap-[12px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mx-auto lg:items-center ">            
              <h1 className="flex text-white font-kaiseiBold text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] items-center justify-center z-10">Smooth & Reliable Delivery</h1>
              <p className="flex text-white items-center justify-center font-arial font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-center z-10">
                At Ciluna, we ensure that your orders arrive safely and on time, with easy tracking and transparent delivery services.              </p>
            </div>
           
            <div className="relative px-[16px] py-[28px] md:px-[96px] md:py-[40px] flex flex-col gap-[24px] md:gap-[40px] "> 
              
              <TrackingDetails
              title="Delivery Services at CILUNA"
              desc="At CILUNA, we prioritize providing our customers with a seamless shopping experience, and that includes offering reliable delivery services. Whether you’re purchasing luxury items or exclusive products, we make sure your orders are delivered quickly and safely. Our carefully selected delivery partners handle the logistics from our warehouse to your doorstep. We believe in transparency and simplicity in every part of the shopping experience, including delivery. Our goal is to ensure you’re informed every step of the way."
              
              />

              <TrackingDetails
              title="How Our Delivery Works"
              desc="Once you’ve placed your order, we immediately begin preparing it for shipment. We handle all aspects of the delivery process with care, from packaging to dispatch, ensuring your items are ready to be delivered as quickly as possible."
                subpoints={[
                  "Order Processing: After you make your purchase, your order is carefully packaged and labeled.",
                  "Shipping: We collaborate with trusted delivery partners to ensure safe and reliable shipping to your specified address.",
                  "Delivery Notifications: You’ll receive notifications about the status of your order to keep you updated on its journey."
                ]}
              />

              <TrackingDetails
              title="Tracking Your Order"
              desc="To ensure you’re always informed about the status of your purchase, we provide a straightforward way to track your order. Once your order has been dispatched, we’ll send you a tracking link with your unique reference ID. You can use this reference ID to access real-time tracking information on the external tracking platform."
              subpointsTitle="How to Track Your Order:"
              subpoints={[
                " Check your order confirmation email for the tracking link.",
                "Use the provided reference ID to search for your order on the tracking page.",
                "View the current status of your order, including shipping updates and expected delivery date."
              ]}
              />

              <TrackingDetails
              title="Why Tracking is Important"
              desc="Tracking your order provides transparency and peace of mind. You’ll be able to monitor your order’s journey from our warehouse to your doorstep, ensuring you know exactly when to expect your delivery. This helps you plan your day, especially when your order arrives at your convenience."
              />
              </div>

                 
            </div>
            
 
    )

}
export default trackyourorder;