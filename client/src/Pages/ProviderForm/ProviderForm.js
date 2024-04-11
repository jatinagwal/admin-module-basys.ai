import React, { useState } from "react";
import "./providerform.css";

const ProviderForm = () => {
 const BACKEND_URL = "http://localhost:5000/submit-form";
 const [name, setName] = useState("");
 const [contactInfo, setContactInfo] = useState({
    personName: "",
    email: "",
    phone: "",
 });
 const [physicalAddress, setPhysicalAddress] = useState("");
 const [billingAddress, setBillingAddress] = useState("");
 const [taxID, setTaxID] = useState("");
 const [specialty, setSpecialty] = useState("");
 const [providerPlansSupported, setProviderPlansSupported] = useState([]);
 const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    businessCertification: null,
 });
 const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
 });

 const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevContactInfo) => ({
      ...prevContactInfo,
      [name]: value,
    }));
 };

 const handlePhysicalAddressChange = (e) => {
    setPhysicalAddress(e.target.value);
 };

 const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
 };

 const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
 };

 const handleProviderPlansSupportedChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setProviderPlansSupported(selectedOptions);
 };

 const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name; // Get the name of the input field
    setDocuments((prevDocuments) => ({
      ...prevDocuments,
      [fieldName]: file, // Use the field name to dynamically set the correct property
    }));
 };

 const handleUserCredentialsChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
 };
 const handleUsernameChange = (e) => {
  setUserCredentials((prevCredentials) => ({
    ...prevCredentials,
    username: e.target.value,
  }));
};

const handlePasswordChange = (e) => {
  setUserCredentials((prevCredentials) => ({
    ...prevCredentials,
    password: e.target.value,
  }));
};

 const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file uploads
    const formData = new FormData();

    // Append textual data to FormData
    formData.append("name", name);
    formData.append("email", contactInfo.email); // Append email
    formData.append("phone", contactInfo.phone); // Append phone
    formData.append("physicalAddress", physicalAddress);
    formData.append("billingAddress", billingAddress);
    formData.append("specialty", specialty);
    formData.append("username", userCredentials.username); // Append username
    formData.append("password", userCredentials.password); // Append password
    formData.append("usertype", "provider"); // Append usertype
    // Append files to FormData
    if (documents.license) formData.append("license", documents.license);
    if (documents.insurance) formData.append("insurance", documents.insurance);
    if (documents.businessCertification)
      formData.append("businessCertification", documents.businessCertification);

    // Send the request
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
 };

 return (
  <div className="form-flex">
     <div className="form-title">Please fill out the following details</div>
     <form className="form" onSubmit={handleSubmit}>
       {/* Contact Info Inputs */}
       <div className="form-input-flex">
         <div className="form-label">Email</div>
         <input
           type="email"
           name="email"
           value={contactInfo.email}
           placeholder="Enter email"
           className="form-input"
           onChange={handleContactInfoChange}
         />
       </div>
       <div className="form-input-flex">
         <div className="form-label">Phone</div>
         <input
           type="tel"
           name="phone"
           value={contactInfo.phone}
           placeholder="Enter phone number"
           className="form-input"
           onChange={handleContactInfoChange}
         />
       </div>
       {/* Physical Address Inputs */}
       <div className="form-input-flex">
         <div className="form-label">Physical Street</div>
         <input
           type="text"
           name="physical.street"
           value={physicalAddress}
           placeholder="Enter physical street"
           className="form-input"
           onChange={handlePhysicalAddressChange}
         />
       </div>
       {/* Billing Address Inputs */}
       <div className="form-input-flex">
         <div className="form-label">Billing Street</div>
         <input
           type="text"
           name="billing.street"
           value={billingAddress}
           placeholder="Enter billing street"
           className="form-input"
           onChange={handleBillingAddressChange}
         />
       </div>
       {/* Specialty Input */}
       <div className="form-input-flex">
         <div className="form-label">Specialty</div>
         <select
           name="specialty"
           value={specialty}
           className="form-input"
           onChange={handleSpecialtyChange}
         >
           <option value="">Select Specialty</option>
           {/* Add options for specialties */}
         </select>
       </div>
       {/* Document Upload Inputs */}
       <div className="form-input-flex">
         <div className="form-label">Proof of License</div>
         <input
           type="file"
           name="license"
           className="form-input"
           onChange={handleDocumentUpload}
         />
       </div>
       <div className="form-input-flex">
         <div className="form-label">Proof of Insurance</div>
         <input
           type="file"
           name="insurance"
           className="form-input"
           onChange={handleDocumentUpload}
         />
       </div>
       <div className="form-input-flex">
         <div className="form-label">Business Certification</div>
         <input
           type="file"
           name="businessCertification"
           className="form-input"
           onChange={handleDocumentUpload}
         />
       </div>
       {/* Username and Password Inputs */}
       <div className="form-input-flex">
         <div className="form-label">Username</div>
         <input
           type="text"
           name="username"
           value={userCredentials.username}
           placeholder="Enter username"
           className="form-input"
           onChange={handleUsernameChange}
         />
       </div>
       <div className="form-input-flex">
         <div className="form-label">Password</div>
         <input
           type="password"
           name="password"
           value={userCredentials.password}
           placeholder="Enter password"
           className="form-input"
           onChange={handlePasswordChange}
         />
       </div>
       <input
        type= "hidden"
        name="usertype"
        value="provider"
      />
       <button type="submit" className="submit-button">
         Submit
       </button>
     </form>
  </div>
 );
};

export default ProviderForm;
