import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

const ScanQr = () => {
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null); // Use ref instead of state
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Initializing QR Scanner...");
    if (scannerRef.current) return; // Avoid duplicate init
  
    const qrCodeScanner = new Html5Qrcode("reader");
  
    qrCodeScanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          setScannedData(decodedText);
          window.location.href = decodedText;
        },
        (error) => {
          // Don't log constantly
          // console.error("QR scan error:", error);
        }
      )
      .then(() => {
        scannerRef.current = qrCodeScanner;
      })
      .catch((err) => {
        console.error("Failed to start QR scanner", err);
        alert("Error starting the camera. Please check your permissions.");
      });
  
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, []);
  

 

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-blue-100 text-black px-4 relative">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="bg-white text-black px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6">🛠️ Bus Administration Page</h2>

      <div id="reader" className="w-[300px] mb-4" />

      {scannedData && (
        <p className="bg-white px-4 py-2 rounded shadow text-center">
          <strong>Scanned Data:</strong> {scannedData}
        </p>
      )}
    </div>
  );
};

export default ScanQr;
