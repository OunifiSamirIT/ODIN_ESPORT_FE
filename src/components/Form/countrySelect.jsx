import React , {useState } from "react";
import Select from "react-select";
import { paysAllInfo } from "../../assets/data/Country";
import "flag-icon-css/css/flag-icons.min.css";

const SelectWithFlag = () => {



    const handleChange = (selectedOption) => {
        // Update the formData state with the selected nationality
        const value = selectedOption ? selectedOption.label.props.children[1] : ""
        console.log("Selected Nationality:",value);
    };




const options = paysAllInfo.map((country) => {
    const countryCode = country.iso && country.iso["alpha-2"].toLowerCase(); // Convert to lowercase
    return {
        value: countryCode,
        label: (
            <div>
                {countryCode && (
                    <span
                        className={`flag-icon flag-icon-${countryCode}`}
                        style={{ marginRight: "8px", width: "40px" }}
                    ></span>
                )}
                {country.nationalite}
            </div>
        ),
    };
});
return(
    <Select
    options={options}
    placeholder="Select a country"
    className="w-full"
    styles={{
        control: (provided, state) => ({
            ...provided,
            borderRadius: "0.375rem", // You can adjust the radius as needed
            display: "flex",
            justifyContent: "center",
            width: "100%",
            fontSize: "1rem", // Set the desired font size
            backgroundColor: "white", // Set the background color
            borderWidth: "none",
        }),
        }}
     onChange={handleChange}
  />
)


}

export default SelectWithFlag