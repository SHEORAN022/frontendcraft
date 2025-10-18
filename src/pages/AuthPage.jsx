// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./auth.css";

// export default function AuthPage() {
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");

//   const sendOtp = async () => {
//     try {
//       const url = isSignup
//         ? "https://clonecraft.vercel.app/api/auth/signup/send-otp"
//         : "https://clonecraft.vercel.app/api/auth/login/send-otp";

//       const res = await fetch(url, {
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
//     try {
//       const url = isSignup
//         ? "https://clonecraft.vercel.app/api/auth/signup/verify-otp"
//         : "https://clonecraft.vercel.app/api/auth/login/verify-otp";

//       const body = isSignup ? { email, otp, name } : { email, otp };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       setMessage(data.message);

//       if (data.success) {
//         if (isSignup) {
//           setIsSignup(false);
//           setStep(1);
//           setOtp("");
//           setName("");
//           setMessage("Signup successful! Please login.");
//         } else {
//           localStorage.setItem("token", data.token);
//           navigate("/dashboard");
//         }
//       }
//     } catch {
//       setMessage("Failed to verify OTP");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isSignup ? "Signup" : "Login"}</h2>

//       {step === 1 && (
//         <>
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <button onClick={sendOtp}>Send OTP</button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           {isSignup && (
//             <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//           )}
//           <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
//           <button onClick={verifyOtp}>Verify OTP</button>
//         </>
//       )}

//       <div className="switch" onClick={() => { setIsSignup(!isSignup); setStep(1); setOtp(""); setMessage(""); }}>
//         {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
//       </div>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const url = isSignup
        ? "https://clonecraft.vercel.app/api/auth/signup/send-otp"
        : "https://clonecraft.vercel.app/api/auth/login/send-otp";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "OTP sent");
      if (data.success) setStep(2);
    } catch (err) {
      console.error(err);
      setMessage("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const url = isSignup
        ? "https://clonecraft.vercel.app/api/auth/signup/verify-otp"
        : "https://clonecraft.vercel.app/api/auth/login/verify-otp";

      const body = isSignup ? { email, otp, name } : { email, otp };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        if (isSignup) {
          setIsSignup(false);
          setStep(1);
          setOtp("");
          setName("");
          setMessage("Signup successful! Please login.");
        } else {
          // User/Admin login success
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to verify OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      <div
        className="switch"
        onClick={() => {
          setIsSignup(!isSignup);
          setStep(1);
          setOtp("");
          setMessage("");
        }}
      >
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
