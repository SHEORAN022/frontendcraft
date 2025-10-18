
// import React, { useState, useEffect } from "react";
// import { Container, Card, Table, Button, Badge, Spinner } from "react-bootstrap";
// import axios from "axios";

// const Subscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all subscriptions
//   const fetchSubscriptions = async () => {
//     try {
//       const res = await axios.get("https://clonecraft.vercel.app/api/subscriptions");
//       if (res.data.success) setSubscriptions(res.data.subscriptions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   // Delete subscription
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`https://clonecraft.vercel.app/api/subscriptions/${id}`);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Create Razorpay Order
//   const handlePayment = async (sub) => {
//     try {
//       const res = await axios.post("https://clonecraft.vercel.app/api/subscriptions/create-order", {
//         amount: sub.amount,
//         currency: "INR",
//       });
//       const { order } = res.data;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID, // frontend key
//         amount: order.amount,
//         currency: order.currency,
//         name: "Crafto Subscriptions",
//         order_id: order.id,
//         handler: async function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Update subscription with paymentId
//           await axios.put(`https://clonecraft.vercel.app/api/subscriptions/${sub._id}`, {
//             paymentId: response.razorpay_payment_id,
//             status: "active",
//           });
//           fetchSubscriptions();
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Container fluid>
//       <h2 className="mb-4">Subscriptions Management</h2>
//       <Card>
//         <Card.Body>
//           {loading ? (
//             <Spinner animation="border" />
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Plan</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subscriptions.map((sub) => (
//                   <tr key={sub._id}>
//                     <td>{sub.user}</td>
//                     <td>{sub.plan}</td>
//                     <td>₹{sub.amount}</td>
//                     <td>
//                       <Badge bg={sub.status === "active" ? "success" : "secondary"}>
//                         {sub.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Button
//                         size="sm"
//                         variant="primary"
//                         className="me-2"
//                         onClick={() => handlePayment(sub)}
//                       >
//                         Pay
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleDelete(sub._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Subscriptions;
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({
    user: "",
    plan: "",
    amount: "",
  });

  // Fetch all subscriptions
  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get("https://clonecraft.vercel.app/api/subscriptions");
      if (res.data.success) setSubscriptions(res.data.subscriptions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Delete subscription
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`https://clonecraft.vercel.app/api/subscriptions/${id}`);
      fetchSubscriptions();
    } catch (err) {
      console.error(err);
    }
  };

  // Add new subscription
  const handleAddSubscription = async (e) => {
    e.preventDefault();
    if (!newSub.user || !newSub.plan || !newSub.amount) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("https://clonecraft.vercel.app/api/subscriptions", newSub);
      if (res.data.success) {
        alert("Subscription added successfully!");
        setShowModal(false);
        setNewSub({ user: "", plan: "", amount: "" });
        fetchSubscriptions();
      }
    } catch (err) {
      console.error(err);
      alert("Error while adding subscription");
    }
  };

  // Create Razorpay Order and open payment
  const handlePayment = async (sub) => {
    try {
      const res = await axios.post("https://clonecraft.vercel.app/api/subscriptions/create-order", {
        amount: sub.amount,
        currency: "INR",
      });
      const { order } = res.data;

      const options = {
        key: "rzp_test_7m8iz2GqqZ6H9C", // frontend key (public)
        amount: order.amount,
        currency: order.currency,
        name: "Crafto Subscriptions",
        order_id: order.id,
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          await axios.put(`https://clonecraft.vercel.app/api/subscriptions/${sub._id}`, {
            paymentId: response.razorpay_payment_id,
            status: "active",
          });
          fetchSubscriptions();
        },
        prefill: {
          name: sub.user,
          email: "demo@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subscriptions Management</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Subscription
        </Button>
      </div>

      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id}>
                    <td>{sub.user}</td>
                    <td>{sub.plan}</td>
                    <td>₹{sub.amount}</td>
                    <td>
                      <Badge bg={sub.status === "active" ? "success" : "secondary"}>
                        {sub.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        className="me-2"
                        onClick={() => handlePayment(sub)}
                      >
                        Pay
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(sub._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* 🔹 Add Subscription Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubscription}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={newSub.user}
                onChange={(e) => setNewSub({ ...newSub, user: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan name"
                value={newSub.plan}
                onChange={(e) => setNewSub({ ...newSub, plan: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={newSub.amount}
                onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="ms-2">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Subscriptions;
