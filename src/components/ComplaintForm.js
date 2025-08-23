import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.category) errs.category = 'Category must be selected';
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email is invalid';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('/api/complaints', form);
      setMessage('Complaint submitted successfully!');
      setForm({ title: '', description: '', category: '', name: '', email: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div>
      <h2>Register a Complaint</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            aria-label="title"
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

      
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            aria-label="description"
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-label="category"
          >
            <option value="">Select</option>
            <option value="SERVICE">Service</option>
            <option value="TECHNICAL">Technical</option>
            <option value="BILLING">Billing</option>
            <option value="INFRASTRUCTURE">Infrastructure</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.category && <p>{errors.category}</p>}
        </div>

        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            aria-label="name"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-label="email"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ComplaintForm;
