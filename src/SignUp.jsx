import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailId: '',
    userName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation here

    // For now, just log the data or send it to your backend API
    console.log('Submitted data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name*:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          maxLength={255}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          maxLength={255}
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          maxLength={10}
          pattern="\d{10}"
          title="Enter a 10-digit mobile number"
        />
      </div>
      <div>
        <label>Email ID:</label>
        <input
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          maxLength={255}
        />
      </div>
      <div>
        <label>Username*:</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
          maxLength={255}
        />
      </div>
      <div>
        <label>Password*:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          maxLength={255}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
