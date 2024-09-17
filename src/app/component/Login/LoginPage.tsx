import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import Logo from "../../../assets/HoldMyBeer.jpg";
import "../../shared/SharedFormCss.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    playerName: "",
    pin: 0,
  });

  const [errors, setErrors] = useState({
    playerName: "",
    pin: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate playerName
    if (!formData.playerName) {
      newErrors.playerName = "Player Name is required";
      isValid = false;
    } else {
      newErrors.playerName = "";
    }

    // Validate PIN
    if (!formData.pin) {
      newErrors.pin = "PIN is required";
      isValid = false;
    } else if (!/^[0-9]{4}$/.test(formData.pin.toString())) {
      newErrors.pin = "PIN must be exactly 4 digits";
      isValid = false;
    } else {
      newErrors.pin = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      agent.AuthenticationApi.register(formData)
        .then((response) => {
          console.log(response.apiKey);
          localStorage.setItem("hmb-api-key", response.apiKey);

          // Navigate to the protected form page after login
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* Logo */}
          <img src={Logo} alt="Logo" className="logo-image" />

          {/* Player Name Input */}
          <div className="form-group">
            <label>Player Name</label>
            <input
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleChange}
              className={errors.playerName ? "input-error" : ""}
            />
            {errors.playerName && (
              <span className="error-message">{errors.playerName}</span>
            )}
          </div>

          {/* PIN Input */}
          <div className="form-group">
            <label>PIN</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              maxLength={4}
              className={errors.pin ? "input-error" : ""}
            />
            {errors.pin && <span className="error-message">{errors.pin}</span>}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
