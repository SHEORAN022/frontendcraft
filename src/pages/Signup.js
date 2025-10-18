
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/auth.css";

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
//   const [message, setMessage] = useState("");

//   const sendOtp = async () => {
//     if (!email) return setMessage("Email is required");
//     try {
//       const res = await fetch("https://clonecraft.vercel.app/api/auth/signup/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await res.json();
//       setMessage(data.message);
//       if (data.success) setStep(2);
//     } catch {
//       setMessage("Failed to send OTP");
//     }
//   };

//   const verifyOtp = async () => {
//     if (!name || !otp) return setMessage("Name and OTP are required");
//     try {
//       const res = await fetch("https://clonecraft.vercel.app/api/auth/signup/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp, name }),
//       });
//       const data = await res.json();
//       setMessage(data.message);
//       if (data.success) navigate("/login");
//     } catch {
//       setMessage("Failed to verify OTP");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Signup</h2>
//       {step === 1 && (
//         <>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <button onClick={sendOtp}>Send OTP</button>
//         </>
//       )}
//       {step === 2 && (
//         <>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={e => setOtp(e.target.value)}
//           />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}
//       <div className="switch" onClick={() => navigate("/login")}>
//         Already have an account? <span>Login</span>
//       </div>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }
