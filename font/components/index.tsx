import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e:any) => {
    setFiles(e.target.files);
  };

  const onTextChange = (e:any) => {
    setText(e.target.value);
  };

  const onSubmit = async (e:any) => {
    console.log(files)
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i],files[i].name);
    }
    formData.append("text", text);

    try {
      const res = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent:any) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total).toString()
            )
          );
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" multiple onChange={onChange} />
      <input type="text" onChange={onTextChange} />
      <button type="submit">Upload</button>
      {uploadPercentage > 0 && <p>{uploadPercentage}%</p>}
    </form>
  );
};

export default FileUpload;