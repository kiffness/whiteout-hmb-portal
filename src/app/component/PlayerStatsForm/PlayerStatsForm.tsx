import React, { useState } from "react";
import agent from "../../api/agent";
import Logo from "../../../assets/HoldMyBeer.jpg";
import "../../shared/SharedFormCss.css";

const maxLevelTroopList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const furnaceLevelList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

export default function PlayerStatsForm() {
  const [formData, setFormData] = useState({
    troopsAmount: 0,
    maxLevelTroop: 0,
    rallyCap: 0,
    furnaceLevel: 0,
    powerLevel: 0,
  });

  const [errors, setErrors] = useState({
    troopsAmount: "",
    maxLevelTroop: "",
    rallyCap: "",
    furnaceLevel: "",
    powerLevel: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.troopsAmount) {
      newErrors.troopsAmount = "Troops Amount is required";
      isValid = false;
    } else {
      newErrors.troopsAmount = "";
    }

    if (!formData.maxLevelTroop) {
      newErrors.maxLevelTroop = "Max Level Troop is required";
      isValid = false;
    } else {
      newErrors.maxLevelTroop = "";
    }

    if (!formData.rallyCap) {
      newErrors.rallyCap = "Rally Capacity is required";
      isValid = false;
    } else {
      newErrors.rallyCap = "";
    }

    if (!formData.furnaceLevel) {
      newErrors.furnaceLevel = "Furnace Level is required";
      isValid = false;
    } else {
      newErrors.furnaceLevel = "";
    }

    if (!formData.powerLevel) {
      newErrors.powerLevel = "Power Level is required";
      isValid = false;
    } else {
      newErrors.powerLevel = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      agent.PlayerStatsApi.create(formData)
        .then((response) => {
          console.log(response);
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

          {/* Troops Amount */}
          <div className="form-group">
            <label>Troops Amount</label>
            <input
              type="number"
              name="troopsAmount"
              value={formData.troopsAmount}
              onChange={handleChange}
              className={errors.troopsAmount ? "input-error" : ""}
            />
            {errors.troopsAmount && (
              <span className="error-message">{errors.troopsAmount}</span>
            )}
          </div>

          {/* Max Level Troop */}
          <div className="form-group">
            <label>Max Level Troop</label>
            <select
              name="maxLevelTroop"
              value={formData.maxLevelTroop}
              onChange={handleChange}
              className={errors.maxLevelTroop ? "input-error" : ""}
            >
              <option value="">Select your highest troop level</option>
              {maxLevelTroopList.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.maxLevelTroop && (
              <span className="error-message">{errors.maxLevelTroop}</span>
            )}
          </div>

          {/* Rally Capacity */}
          <div className="form-group">
            <label>Rally Capacity</label>
            <input
              type="number"
              name="rallyCap"
              value={formData.rallyCap}
              onChange={handleChange}
              className={errors.rallyCap ? "input-error" : ""}
            />
            {errors.rallyCap && (
              <span className="error-message">{errors.rallyCap}</span>
            )}
          </div>

          {/* Furnace Level */}
          <div className="form-group">
            <label>Furnace Level</label>
            <select
              name="furnaceLevel"
              value={formData.furnaceLevel}
              onChange={handleChange}
              className={errors.furnaceLevel ? "input-error" : ""}
            >
              <option value="">Select your furnace level</option>
              {furnaceLevelList.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.furnaceLevel && (
              <span className="error-message">{errors.furnaceLevel}</span>
            )}
          </div>

          {/* Power Level */}
          <div className="form-group">
            <label>Power Level</label>
            <input
              type="number"
              name="powerLevel"
              value={formData.powerLevel}
              onChange={handleChange}
              className={errors.powerLevel ? "input-error" : ""}
            />
            {errors.powerLevel && (
              <span className="error-message">{errors.powerLevel}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
