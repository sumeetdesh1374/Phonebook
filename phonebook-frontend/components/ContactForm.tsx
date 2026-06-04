"use client";

import { useState, SubmitEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from '@auth0/nextjs-auth0';

interface ContactFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  categoryId: string;
}

interface ContactFormProps {
  categories?: Array<{ id: number; name: string }>,
  contactBaseUrl?: string,
  contactFormData?: Contact,
  contactId?: number | string,
  onSuccess?: () => void
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  categoryId?: string;
}

export default  function ContactForm({ categories = [], contactBaseUrl, contactFormData, contactId, onSuccess }: ContactFormProps) {
  const router = useRouter();
  const isUpdating = !!contactId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

 
  const [formData, setFormData] = useState({
    firstName: contactFormData?.firstName || "",
    lastName: contactFormData?.lastName || "",
    phoneNumber: contactFormData?.phoneNumber || "",
    email: contactFormData?.email || "",
    categoryId: contactFormData?.categoryId || 0,
  });

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // FirstName validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    // LastName validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
        errors.phoneNumber = "Phone Number must be 10 digits";
      }
    }

    // Category validation
    if (!formData.categoryId) {
      errors.categoryId = "Category must be selected";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Get access token from the session
      const payload = JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          categoryId: formData.categoryId,
        });

      console.log("Submitting contact with payload:", payload);

      const url = isUpdating ? `/api/contacts/${contactId}` : `/api/contacts`;
      const method = isUpdating ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: payload ,
      });

      console.log(response);  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (isUpdating ? "Failed to update contact" : "Failed to create contact"));
      }

      setSuccess(true);
      
      if (!isUpdating) {
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          categoryId: 0,
        });
      }

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/");
        }
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{isUpdating ? "Update Contact" : "Create New Contact"}</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Contact {isUpdating ? "updated" : "created"} successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter first name"
          />
          {validationErrors.firstName && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter last name"
          />
          {validationErrors.lastName && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter email"
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.phoneNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter phone number"
          />
          {validationErrors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              validationErrors.categoryId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {validationErrors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.categoryId}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? (isUpdating ? "Updating..." : "Creating...") : (isUpdating ? "Update Contact" : "Create Contact")}
        </button>
      </form>
    </div>
  );
}
