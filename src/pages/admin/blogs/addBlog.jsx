import React, { useEffect, useState } from "react";
import "../admin.css";
import Popup from "../../../components/Popup";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addBlog } from "../../../utils/api-factory";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
// import { AddBlog } from "../../utils/api-factory";

function AddBlog({ edit = false, modalClose, handleUpdateBlog, data }) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({
    title: "",
    content: "",
  });
  const [photo, setPhoto] = useState(null);

  const resetPayload = () => {
    setPhoto(null);
    setPayload({
      title: "",
      content: "",
    });
  };
  const handleChangePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.name.includes("title")
        ? e.target.value.toUpperCase()
        : e.target.value,
    });
  };

  const handleAddBlog = () => {
    if (photo && photo.type.includes("image/")) {
      console.log("payload is ", payload);
      var tempPayload = { ...payload, img: photo };
      console.log(tempPayload);
      addBlog(
        tempPayload,
        (callback) => {
          setErrorMessage(callback.message ?? "successfully added");
          setShowPopup(true);
          resetPayload();
        },
        (onError) => {
          console.log(onError);
          setErrorMessage(
            onError.response.data.message ?? "something went wrong"
          );
          setShowPopup(true);
        }
      );
    } else {
      setErrorMessage("Please select image");
      setShowPopup(true);
    }
  };
  const handleUpdate = () => {
    if (photo && photo.type.includes("image/")) {
      console.log("payload is ", payload);
      var tempPayload = { ...payload, img: photo };
      console.log(tempPayload);
      handleUpdateBlog(tempPayload, resetPayload);
    } else {
      setErrorMessage("Please select image");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (edit) {
      console.log(data);
      var createdata = {
        title: data.title,
        content: data.content,
      };
      setPayload({ ...payload, ...createdata });
    }
  }, []);

  return (
    <div
      className="container col-lg-6 col-sm-11 col-11 col-md-11 m-auto mt-4 my-4 shadow rounded p-4 bg-white"
      style={{ position: "relative" }}
    >
      <div className="d-flex justify-content-center text-center mb-2">
        <h4>{!edit ? "Add" : "Edit"} Blog</h4>
      </div>

      <>
        <div className="d-flex justify-content-between flex-column align-items-center">
          <div
            class="mb-3 col-12 col-lg-10 col-sm-12 col-md-10"
            style={{ paddingRight: "2px" }}
          >
            <label for="exampleFormControlInput1" class="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter title"
              onChange={handleChangePayload}
              value={payload.title}
              name="title"
              required
            />
          </div>
          <div
            class="mb-3 col-12 col-lg-10 col-sm-12 col-md-10"
            style={{ paddingRight: "2px" }}
          >
            <label for="exampleFormControlInput1" class="form-label">
              Poster
            </label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              type="file"
              accept="image/*"
              placeholder="Upload Photo"
              onChange={(event) => setPhoto(event.target.files[0])}
              required
            />
          </div>
          <div
            class="mb-3 col-12 col-lg-10 col-sm-12 col-md-10"
            style={{ paddingLeft: "2px" }}
          >
            <label for="exampleFormControlInput1" class="form-label">
              content
            </label>
            <div style={{ height: "30vh", overflowY: "auto" }}>
              <ReactQuill
                theme="snow"
                value={payload.content}
                onChange={(e) => setPayload({ ...payload, content: e })}
              />
            </div>
          </div>
          <div className="col-12 col-md-10 col-sm-12 col-lg-10">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => (edit ? handleUpdate() : handleAddBlog())}
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </>

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

export default AddBlog;
