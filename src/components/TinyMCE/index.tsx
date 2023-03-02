import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as EditorType } from "tinymce";
import { Button } from "antd";

const TinyMCEEditor = (props: {
  editorRef: any;
  keyMCE: string;
  placeholder?: string;
  height?: number;
}) => {
  const { editorRef, keyMCE, placeholder = "", height = 500 } = props;

  const handleImageUpload: any = (
    blobInfo: any,
    success: (url: string) => void,
    failure: () => void
  ) => {
    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());
    fetch("https://your-image-upload-api.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        success(result.url);
      })
      .catch((error) => {
        console.error(error);
        failure();
      });
  };
  return (
    <>
      <Editor
        ref={editorRef}
        key={keyMCE}
        apiKey="x7iqyfri0yduoqx0qrv9r5h50yq6gj7bybcu12uc2x2a9qkl"
        init={{
          height: height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          images_upload_handler: handleImageUpload,
          placeholder: placeholder,
        }}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
      />
    </>
  );
};

export default TinyMCEEditor;
