import axios from "axios";

export const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "product");
    
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/ddk8zxjtb/image/upload",
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};