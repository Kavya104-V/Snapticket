import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { db } from "./firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


const Register = () => {
    const [aadhar, setAadhar] = useState("");
    const [email, setEmail] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const qrRef = useRef(null);
  
    const handleRegister = async () => {
      if (aadhar.length !== 12 || isNaN(aadhar)) {
        alert("Enter a valid 12-digit Aadhar number");
        return;
      }
  
      const userDoc = doc(db, "users", String(aadhar));
      const qrCodeLink = `https://aadhar-registration-47nw00xap-kavya-vs-projects.vercel.app/users/${aadhar}`; 
      console.log("Generated QR Code URL:", qrCodeLink);
  
      try {
        await setDoc(userDoc, { email, qrUrl: qrCodeLink });
        setQrUrl(qrCodeLink);
      } catch (error) {
        console.error("Error registering user: ", error);
      }
    };
  
    // 📌 Function to Download QR as Image
    const downloadImage = async () => {
      const canvas = await html2canvas(qrRef.current);
      const imgData = canvas.toDataURL("image/png");
  
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `QR_Aadhar_${aadhar}.png`;
      link.click();
    };
  
    // 📌 Function to Download QR as PDF
    const downloadPDF = async () => {
      const canvas = await html2canvas(qrRef.current);
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 80, 80);
      pdf.save(`QR_Aadhar_${aadhar}.pdf`);
    };
  
  

  return (
    <>
    <div className="min-h-screen w-screen flex items-center justify-center bg-red-100 text-black px-4">
    <div className="absolute top-4 left-4">
  <Link
    to="/"
    className="bg-white text-black dark:text-black px-4 py-2 rounded shadow-md hover:shadow-[rgba(0,0,0,0.3)] transition-shadow duration-200"
  >
    ← Back to Home
  </Link>
</div>
<div className="=min-h-screen w-screen flex flex-col items-center justify-center bg-red-100 text-black px-4 space-y-6">

      <h2 className="text-3xl font-bold">👤 Passenger Registration Page</h2>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">

      <input type="text" placeholder="Aadhar Number" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
      <input type="email" placeholder="Email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRegister} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">Register</button>

      {qrUrl && (
        <div>
          <h3>Your QR Code:</h3>
          <div ref={qrRef} style={{ padding: "10px", background: "#fff", display: "inline-block" }}>
            <QRCodeCanvas value={qrUrl} size={200} />
          </div>
          <br />
          <div className="flex justify-center space-x-4 mt-4">
  <button
    onClick={downloadImage}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
  >
    Download as Image
  </button>
  <button
    onClick={downloadPDF}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
  >
    Download as PDF
  </button>
</div>

        </div>
      )}
      </div>
      </div>


     
    </div>
  </>
  );
};

export default Register;