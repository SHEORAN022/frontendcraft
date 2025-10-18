// import React from 'react';
// import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
// import { FaUsers, FaVideo, FaDownload, FaEye } from 'react-icons/fa';

// const Dashboard = () => {
//   const stats = [
//     { title: 'Total Users', value: '1,250', icon: <FaUsers />, color: 'primary' },
//     { title: 'Templates', value: '450', icon: <FaVideo />, color: 'success' },
//     { title: 'Downloads', value: '15,680', icon: <FaDownload />, color: 'info' },
//     { title: 'Views', value: '89,540', icon: <FaEye />, color: 'warning' }
//   ];

//   const recentTemplates = [
//     { id: 1, title: 'Birthday Video', type: 'video', downloads: 234, views: 1240 },
//     { id: 2, title: 'Quote Graphics', type: 'graphics', downloads: 189, views: 890 },
//     { id: 3, title: 'Festival Template', type: 'video', downloads: 156, views: 760 }
//   ];

//   return (
//     <Container fluid>
//       <h2 className="mb-4">Dashboard</h2>

//       <Row className="mb-4">
//         {stats.map((stat, index) => (
//           <Col xl={3} lg={6} key={index} className="mb-3">
//             <Card className="stat-card h-100">
//               <Card.Body>
//                 <div className="d-flex align-items-center">
//                   <div className={`stat-icon bg-${stat.color} bg-opacity-10 text-${stat.color}`}>
//                     {stat.icon}
//                   </div>
//                   <div className="ms-3">
//                     <h3 className="mb-0">{stat.value}</h3>
//                     <p className="text-muted mb-0">{stat.title}</p>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Row>
//         <Col>
//           <Card>
//             <Card.Header>
//               <h5 className="mb-0">Recent Templates</h5>
//             </Card.Header>
//             <Card.Body>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>Template</th>
//                     <th>Type</th>
//                     <th>Downloads</th>
//                     <th>Views</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentTemplates.map((template) => (
//                     <tr key={template.id}>
//                       <td>{template.title}</td>
//                       <td>
//                         <Badge bg={template.type === 'video' ? 'primary' : 'success'}>
//                           {template.type}
//                         </Badge>
//                       </td>
//                       <td>{template.downloads}</td>
//                       <td>{template.views}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { FaUsers, FaVideo, FaDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentTemplates, setRecentTemplates] = useState([]);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://clonecraft.vercel.app/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const s = res.data.data.stats;
        setStats([
          { title: 'Total Users', value: s.totalUsers, icon: <FaUsers />, color: 'primary' },
          { title: 'Templates', value: s.totalTemplates, icon: <FaVideo />, color: 'success' },
          { title: 'Downloads', value: s.totalDownloads, icon: <FaDownload />, color: 'info' },
          { title: 'Views', value: s.totalViews, icon: <FaEye />, color: 'warning' }
        ]);

        setRecentTemplates(res.data.data.recentTemplates);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container fluid>
      <h2 className="mb-4">Dashboard</h2>

      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col xl={3} lg={6} key={index} className="mb-3">
            <Card className="stat-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className={`stat-icon bg-${stat.color} bg-opacity-10 text-${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="ms-3">
                    <h3 className="mb-0">{stat.value}</h3>
                    <p className="text-muted mb-0">{stat.title}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Templates</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Template</th>
                    <th>Type</th>
                    <th>Downloads</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTemplates.map((template) => (
                    <tr key={template._id}>
                      <td>{template.title}</td>
                      <td>
                        <Badge bg={template.type === 'video' ? 'primary' : 'success'}>
                          {template.type}
                        </Badge>
                      </td>
                      <td>{template.downloads}</td>
                      <td>{template.views}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
