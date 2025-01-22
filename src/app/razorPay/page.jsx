"use client";
import React,{useEffect} from "react";
import tshirt from "../../../public/blogImg.jpg";
// import Razorpay from "razorpay";
// const axios = require("axios").default;
import Image from "next/image";

export default function Product() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const myStyle2 = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "70px",
  };
  const myStyle = {
    width: "250px",
    height: "350px",
    borderRadius: "10px",
    margin: "auto",
    marginBottom: "10px",
  };
  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    margin: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "12%",
    height: "50px",
    fontSize: "22px",
    marginLeft: "20px",
    marginTop: "0px",
  };

  const amount = 25000; // amount in smallest units 250*100
  const currency = "INR";
  const receiptId = "qwerty";

  const paymentHandler = async (e) => {
    const API_URL =
      "https://iwojpgsdff.execute-api.ap-south-1.amazonaws.com/dev/api/fitnearn/web/razorpay/create-order";
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
        method: 'wallet', // wallet, netbanking, upi, card,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    // console.log(navigator.userAgent);
    var options = {
      key: "rzp_test_99Mi4G9l7ZajTw", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "FitnEarn",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        const body = {
          ...response,
        };
        // const validateResponse=await fetch("http://localhost:3444/order/validate", {
        const validateResponse = await fetch(
          "https://iwojpgsdff.execute-api.ap-south-1.amazonaws.com/dev/api/fitnearn/web/razorpay/capture-payment",
          {
            // const validateResponse=await fetch("https://api.razorpay.com/v1/orders/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const validateData = await validateResponse.json();
        console.log(validateData);
        alert("order successful");
        // window.location.href="/success";
      },
      prefill: {
        name: "Lokesh Yadav",
        email: "lokesh@gmail.com",
        contact: "9000090000",
      },
      notify: {
        sms: true,
        email: true,
      },
      options: {
        checkout: {
          method: {
            netbanking: false,
            card: true,
            upi: true,
            wallet: false,
          },
        },
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      debug: true,
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log("payment.failed");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="pt-[72px]">
      <h2 style={{ margin: "auto" }}>T-Shirt</h2>
      {/* <img src={tshirt} style={myStyle} alt="t-shirt" /> */}
      <Image src={tshirt} alt="tshirt" style={myStyle} />
      <div style={{ margin: "auto", width: "70%" }}>
        <p
          style={{
            display: "inline",
            color: "white",
            fontSize: "24px",
            marginLeft: "420px",
            marginTop: "20px",
          }}
        >
          <strong>500₹</strong>
        </p>
        <button style={buttonStyle} type="submit" onClick={paymentHandler}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

// Razorpay Payment Gateway Integration in React
