
// // import React, { useEffect, useState } from 'react';
// // import { Container, Card, Table, Badge, Spinner } from 'react-bootstrap';
// // import axios from 'axios';

// // const Users = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchUsers = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await axios.get("https://clonecraft.vercel.app/api/users", {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });

// //       if (res.data.success) {
// //         setUsers(res.data.users);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch users:", err);
// //       if(err.response && err.response.status === 401){
// //         alert("Please login first");
// //         window.location.href = "/login";
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <Container fluid>
// //       <h2 className="mb-4">Users Management</h2>

// //       <Card>
// //         <Card.Body>
// //           {loading ? (
// //             <div className="text-center">
// //               <Spinner animation="border" />
// //             </div>
// //           ) : (
// //             <Table responsive hover>
// //               <thead>
// //                 <tr>
// //                   <th>Name</th>
// //                   <th>Email</th>
// //                   <th>Subscription</th>
// //                   <th>Status</th>
// //                   <th>Joined</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {users.map((user) => (
// //                   <tr key={user._id}>
// //                     <td>{user.name || "-"}</td>
// //                     <td>{user.email}</td>
// //                     <td>
// //                       <Badge bg={
// //                         user.subscription === 'pro' ? 'warning' :
// //                         user.subscription === 'premium' ? 'info' : 'secondary'
// //                       }>
// //                         {user.subscription}
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
// //                         {user.status}
// //                       </Badge>
// //                     </td>
// //                     <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           )}
// //         </Card.Body>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default Users;
// import React, { useEffect, useState } from 'react';
// import { Container, Card, Table, Badge, Spinner } from 'react-bootstrap';
// import axios from 'axios';

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://clonecraft.vercel.app/api/users", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) {
//         setUsers(res.data.users);
//       }
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       if (err.response && err.response.status === 401) {
//         alert("Please login first");
//         window.location.href = "/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <Container fluid>
//       <h2 className="mb-4">Users Management</h2>

//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Subscription</th>
//                   <th>Status</th>
//                   <th>Joined</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name || "-"}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       {user.subscription ? (
//                         <Badge
//                           bg={
//                             user.subscription.type === 'pro' ? 'warning' :
//                             user.subscription.type === 'premium' ? 'info' : 'secondary'
//                           }
//                         >
//                           {user.subscription.type || "free"}
//                         </Badge>
//                       ) : (
//                         <Badge bg="secondary">free</Badge>
//                       )}
//                     </td>
//                     <td>
//                       <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
//                         {user.status}
//                       </Badge>
//                     </td>
//                     <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

// export default Users;
import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://clonecraft.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/authpage";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <Container fluid>
      <h2 className="mb-4">Users Management</h2>
      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name || "-"}</td>
                    <td>{u.email}</td>
                    <td>
                      <Badge bg={u.subscription?.type === "pro" ? "warning" :
                                  u.subscription?.type === "premium" ? "info" : "secondary"}>
                        {u.subscription?.type || "free"}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={u.status === "active" ? "success" : "secondary"}>
                        {u.status}
                      </Badge>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Users;
