import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

const UserDetails = () => {
  const { aadhar } = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(1);

  const pricePerPassenger = 20;
  const totalPrice = passengers * pricePerPassenger;

  useEffect(() => {
    if (!aadhar) {
      console.error("Error: aadhar is undefined");
      setEmail("Invalid Aadhar ID.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", String(aadhar));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEmail(docSnap.data().email);
        } else {
          setEmail("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setEmail("Error loading data.");
      }
    };

    fetchUserData();
  }, [aadhar]);

  const sendEmail = async () => {
    if (!email || email.includes("Invalid") || email.includes("User not found")) {
      setMessage("Invalid email address.");
      return;
    }

    if (!from || !to || passengers < 1) {
      setMessage("Please fill all trip details correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Your Travel Ticket",
          message: `
Hello,

Here are your travel details:

Aadhar ID: ${aadhar}
From: ${from}
To: ${to}
Passengers: ${passengers}
Total Price: ₹${totalPrice}

Thank you for using our service.
          `.trim(),
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email.");
    }
  };

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
      <div className="=min-h-screen w-screen flex flex-col items-center justify-center bg-red-100 text-black px-4 space-y-6">

     
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">User Details</h2>
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">

        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Email:</span> {email}
        </p>

        <div className="mb-4">
          <label className="block font-medium mb-1">From:</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            <option value="">Select starting point</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Tirupati">Tirupati</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Puri">Puri</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">To:</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-black"
          >
            <option value="">Select destination</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Tirupati">Tirupati</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Puri">Puri</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">No. of Passengers:</label>
          <input
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            min="1"
            className="w-full px-4 py-2 border rounded-md text-black"
          />
        </div>

        <div className="mb-4 text-center text-gray-800 font-semibold">
          Total Price: ₹{totalPrice}
        </div>

        <button
          onClick={sendEmail}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg transition duration-200"
        >
          Send Email
        </button>
        <Link
  to="/scan"
  className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-2 rounded-lg transition duration-200 mt-2"
>
  📷 Scan QR
</Link>

        {message && (
          <p className="mt-4 text-sm text-gray-800 font-medium text-center">{message}</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserDetails;