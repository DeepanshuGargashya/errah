import React, { useEffect, useState } from "react";
import "./admin.css";
import { useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import { addNgo, updateNgo } from "../../redux/ngoRelated/ngoHandle";
import Popup from "../../components/Popup";
import CancelIcon from "@mui/icons-material/Cancel";
import BackIcon from "../../assets/back.png";

function AddDonor({ edit = false, modalClose, handleUpdateDonor, data }) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    pan: "",
    aadhar: "",
    gender: "",
    age: "",
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branchName: "",
    place: "",
    city: "",
    state: "",
  });

  const resetPayload = () => {
    setPayload({
      name: "",
      phoneNumber: "",
      email: "",
      pan: "",
      aadhar: "",
      gender: "",
      age: "",
      accountName: "",
      accountNumber: "",
      ifsc: "",
      bankName: "",
      branchName: "",
      place: "",
      city: "",
      state: "",
    });
  };
  const handleChangePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.name.includes("pan")
        ? e.target.value.toUpperCase()
        : e.target.value,
    });
  };
  const checkValidPage1 = () => {
    if (
      !payload.name ||
      !payload.phoneNumber ||
      !payload.email ||
      !payload.pan ||
      !payload.aadhar
    ) {
      // console.error("All fields are required");
      setErrorMessage("All fields are required");
      return false;
    }

    // Additional validation, e.g., email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const aadharRegex = /^\d{12}$/;

    if (!emailRegex.test(payload.email)) {
      console.error("Invalid email format");

      setErrorMessage("Invalid email format");
      return false;
    } else if (!panRegex.test(payload.pan)) {
      console.error("Invalid pan format");
      setErrorMessage("Invalid pan format");
      return false;
    } else if (!aadharRegex.test(payload.aadhar)) {
      console.error("Invalid aadhar format");
      setErrorMessage("Invalid aadhar format");
      return false;
    }
    return true;
  };
  const checkValidPage2 = () => {
    if (!payload.place || !payload.city || !payload.state) {
      // console.error("All fields are required");
      setErrorMessage("All fields are required");
      return false;
    }

    // Additional validation, e.g., email format

    return true;
  };
  const checkValidPage3 = () => {
    if (
      !payload.accountName ||
      !payload.accountNumber ||
      !payload.ifsc ||
      !payload.bankName ||
      !payload.branchName
    ) {
      // console.error("All fields are required");
      setErrorMessage("All fields are required");
      return false;
    }

    // Additional validation, e.g., email format

    return true;
  };

  const handleAddNgo = () => {
    console.log("payload is ", payload);
    if (checkValidPage3()) {
      console.log("valid is true");

      dispatch(
        addNgo(
          payload,
          (callback) => {
            console.log("add successfully");
            setErrorMessage("Added successfully");
            setShowPopup(true);
            resetPayload();
          },
          (onError) => {
            setErrorMessage("try again, something went wrong");
            console.log("get error", onError);
            setShowPopup(true);
          }
        )
      );
    } else {
      console.log("vvaiid is not true");

      setShowPopup(true);
    }
  };
  const handleUpdate = () => {
    console.log("payload is ", payload);
    // setPayload({ ...payload, ngoId: data._id });
    if (checkValidPage3()) {
      console.log("valid is true");

      handleUpdateDonor(payload, resetPayload);
    } else {
      console.log("vvaiid is not true");

      setShowPopup(true);
    }
  };
  const handleNext = () => {
    if (page === 1) {
      if (checkValidPage1()) {
        setPage(page + 1);
      } else {
        setShowPopup(true);
      }
    } else if (page === 2) {
      if (checkValidPage2()) {
        setPage(page + 1);
      } else {
        setShowPopup(true);
      }
    }
  };

  useEffect(() => {
    if (edit) {
      console.log(data);
      setPayload({ ...payload, ...data });
    }
  }, []);

  return (
    <div
      className="container col-lg-6 col-sm-11 col-11 col-md-11 m-auto mt-4 my-4 shadow rounded p-4 bg-white"
      style={{ position: "relative" }}
    >
      <div className="d-flex justify-content-center text-center mb-2">
        <h4>{!edit ? "Add" : "Edit"} Donor</h4>
      </div>
      {page > 1 && (
        <div className="mb-4">
          <img
            style={{ cursor: "pointer", height: "2rem" }}
            onClick={() => setPage(page - 1)}
            // className="cursor-pointer"
            src={BackIcon}
            alt=""
            srcset=""
          />
        </div>
      )}

      {page === 1 ? (
        <>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter name"
                onChange={handleChangePayload}
                value={payload.name}
                name="name"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter mobile number"
                onChange={handleChangePayload}
                value={payload.phoneNumber}
                name="phoneNumber"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Pan
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter pan"
                onChange={handleChangePayload}
                value={payload.pan}
                name="pan"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Aadhar
              </label>
              <input
                className="form-control"
                id="exampleFormControlInput1"
                type="number"
                placeholder="Enter Aadhar"
                value={payload.aadhar}
                name="aadhar"
                onChange={handleChangePayload}
                // autoComplete="new-password"
                min={12}
                maxLength={12}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleChangePayload}
                value={payload.email}
                name="email"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Age
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter age"
                onChange={handleChangePayload}
                value={payload.age}
                name="age"
                required
              />
            </div>
          </div>
        </>
      ) : page === 2 ? (
        <>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder="Enter address"
              name="place"
              onChange={handleChangePayload}
              value={payload.place}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter city"
                onChange={handleChangePayload}
                value={payload.city}
                name="city"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                State
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter state"
                onChange={handleChangePayload}
                value={payload.state}
                name="state"
                required
              />
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-between flex-wrap">
          <div
            class="mb-3 col-12 col-lg-6 col-sm-6"
            style={{ paddingRight: "2px" }}
          >
            <label for="formFileSm" class="form-label">
              bank statement
            </label>
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              accept="application/pdf"
              // value={payload.bankStatement}
              name="bankStatement"
              onChange={handleChangePayload}
              // required
            />
          </div>
          <div
            class="mb-3 col-12 col-lg-6 col-sm-6"
            style={{ paddingLeft: "2px" }}
          >
            <label for="formFileSm" class="form-label">
              Address Proof
            </label>
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              accept="application/pdf"
              // value={payload.addressProof}
              name="addressProof"
              onChange={handleChangePayload}
              required
            />
          </div>
        </div>
      )}
      <button
        type="button"
        class="btn btn-primary"
        onClick={() =>
          page === 3 ? (edit ? handleUpdate() : handleAddNgo()) : handleNext()
        }
      >
        {page === 3 ? (edit ? "Update" : "Add") : "Next"}
      </button>
      {edit && (
        <div
          style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
          onClick={modalClose}
        >
          <CancelIcon />
        </div>
      )}
      <Popup
        message={errorMessage}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
}

export default AddDonor;