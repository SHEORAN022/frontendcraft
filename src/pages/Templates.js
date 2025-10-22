import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Badge, 
  Modal,
  Form,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const profilePositions = [
  "topLeft","topRight","bottomLeft","bottomRight","center",
  "centerLeft","centerRight","topCenter","bottomCenter",
];

const transitionTypes = [
  "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
  "slideFromBottomLeft","slideFromBottomRight","slideFromTopLeft","slideFromTopRight",
  "scale","rotation","bounce","ripple","profileReveal",
];

const orientations = ["landscape","portrait"];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "video",
    status: "active",
    category: "",
    file: null,
    profilePosition: "center",
    transitionType: "fade",
    orientation: "landscape",
  });
  const [filePreview, setFilePreview] = useState(null);

  const BASE_URL = "https://clonecraft.vercel.app/api/template";

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const { data } = await axios.get(${BASE_URL}/templates);
      setTemplates(data.templates || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(${BASE_URL}/categories);
      setCategories(data.categories || data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchCategories();
  }, []);

  const handleShow = (tpl = null) => {
    if (tpl) {
      setEditId(tpl._id);
      setForm({
        title: tpl.title,
        type: tpl.type,
        status: tpl.status,
        category: tpl.category?._id || "",
        file: null,
        profilePosition: tpl.profilePosition || "center",
        transitionType: tpl.transitionType || "fade",
        orientation: tpl.orientation || "landscape",
      });
      setFilePreview(tpl.file || null);
    } else {
      setEditId(null);
      setForm({
        title: "",
        type: "video",
        status: "active",
        category: "",
        file: null,
        profilePosition: "center",
        transitionType: "fade",
        orientation: "landscape",
      });
      setFilePreview(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      setForm({ ...form, file });
      if (file) setFilePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category) return alert("Title & Category required!");

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("type", form.type);
      fd.append("status", form.status);
      fd.append("category", form.category);
      fd.append("profilePosition", form.profilePosition);
      fd.append("transitionType", form.transitionType);
      fd.append("orientation", form.orientation);
      if (form.file) fd.append("file", form.file);

      const url = editId
        ? ${BASE_URL}/templates/${editId}
        : ${BASE_URL}/templates;
      const method = editId ? "put" : "post";

      await axios[method](url, fd, { headers: { "Content-Type": "multipart/form-data" } });
      fetchTemplates();
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading template");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axios.delete(${BASE_URL}/templates/${id});
      fetchTemplates();
    } catch (err) {
      console.error(err);
      alert("Failed to delete template");
    }
  };

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Templates Management</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          <FaPlus className="me-2" /> Add Template
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Orientation</th>
                <th>Profile Position</th>
                <th>Transition Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((tpl) => (
                <tr key={tpl._id}>
                  <td>{tpl.title}</td>
                  <td><Badge bg={tpl.type==="video"?"primary":"success"}>{tpl.type}</Badge></td>
                  <td>{tpl.category?.name}</td>
                  <td>{tpl.orientation}</td>
                  <td>{tpl.profilePosition}</td>
                  <td>{tpl.transitionType}</td>
                  <td><Badge bg={tpl.status==="active"?"success":"secondary"}>{tpl.status}</Badge></td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={()=>handleShow(tpl)}><FaEdit/></Button>
                    <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(tpl._id)}><FaTrash/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId?"Edit Template":"Add Template"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleChange}>
                <option value="video">Video</option>
                <option value="graphics">Graphics</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Orientation</Form.Label>
              <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
                {orientations.map(o => <option key={o} value={o}>{o}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Position</Form.Label>
              <Form.Select name="profilePosition" value={form.profilePosition} onChange={handleChange}>
                {profilePositions.map(p => <option key={p} value={p}>{p}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transition Type</Form.Label>
              <Form.Select name="transitionType" value={form.transitionType} onChange={handleChange}>
                {transitionTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control type="file" name="file" onChange={handleChange} />
              {filePreview && (
                <div className="mt-2">
                  {form.type==="video" ? (
                    <video src={filePreview} controls style={{ maxWidth: "100%" }} />
                  ) : (
                    <img src={filePreview} alt="preview" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                  )}
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Templates;
