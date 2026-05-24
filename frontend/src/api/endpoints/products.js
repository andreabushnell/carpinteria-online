import axiosClient from "../client/axios";


// CATEGORIES
export const getCategories = async () => {
    const res = await axiosClient.get("/categories/");
    return res.data;
};

export const getCategoryById = async (id) => {
    const res = await axiosClient.get(`/categories/${id}/`);
    return res.data;
};

export const createCategory = async (data) => {
    const res = await axiosClient.post("/categories/", data);
    return res.data;
};

export const updateCategory = async (id, data) => {
    const res = await axiosClient.patch(`/categories/${id}/`, data);
    return res.data;
};

export const deleteCategory = async (id) => {
    const res = await axiosClient.delete(`/categories/${id}/`);
    return res.data;
};


// PRODUCTS
export const getProducts = async () => {
    const res = await axiosClient.get("/products/");
    return res.data;
};

export const getProductById = async (id) => {
    const res = await axiosClient.get(`/products/${id}/`);
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axiosClient.post("/products/", data);
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await axiosClient.patch(`/products/${id}/`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await axiosClient.delete(`/products/${id}/`);
    return res.data;
};


export const getProductStock = async (id) => {
    const res = await axiosClient.get(`/products/${id}/stock/`);
    return res.data;
};