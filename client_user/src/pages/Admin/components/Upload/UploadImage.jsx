import React, { useEffect, useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const CloudinaryImageUpload = ({ max = 5, onChange,imgsUrl }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        let src = file.url || file.thumbUrl;
        if (!src && file.originFileObj) {
            src = await getBase64(file.originFileObj);
        }
        setPreviewImage(src);
        setPreviewVisible(true);
        setPreviewTitle(file.name || src.split("/").pop());
    };

    useEffect(() => {
        if (imgsUrl && imgsUrl.length > 0) {
            const initialFileList = imgsUrl.map((url, index) => ({
                uid: `-${index}`,
                name: `image-${index + 1}`,
                status: "done",
                url: url,
            }));
            setFileList(initialFileList);
        }
    }, [imgsUrl]);

    const handleCancel = () => setPreviewVisible(false);

    const handleUpload = async (options) => {
        const { file, onSuccess, onError } = options;

        const upload_preset = "uploat_data"; 
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/da5mlszld/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.secure_url) {
                const uploadedFile = {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: data.secure_url,
                };

                setFileList((prev) => [...prev, uploadedFile]);
                onSuccess(data, file); 

                if (onChange) {
                    const urls = [...fileList, uploadedFile].map((f) => f.url);
                    onChange(urls);
                }
            } else {
                message.error("Upload thất bại: " + data?.error?.message || "Không rõ lý do");
                onError(new Error("Upload thất bại"));
            }
        } catch (err) {
            console.error("Upload error:", err);
            message.error("Lỗi kết nối tới Cloudinary");
            onError(err);
        }
    };

    const handleRemove = (file) => {
        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);

        if (onChange) {
            onChange(updatedList.map((f) => f.url));
        }
    };
    return (
        <>
            <Upload
                accept="image/*"
                listType="picture-card"
                customRequest={handleUpload}
                fileList={fileList}
                onPreview={handlePreview}
                onRemove={handleRemove}
            >
                {fileList.length >= max ? null : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>

            <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};

export default CloudinaryImageUpload;
