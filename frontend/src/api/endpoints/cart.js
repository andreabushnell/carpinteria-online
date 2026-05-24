import axiosClient from "../client/axios";


export const getCart = async () => {
    const res = await axiosClient.get("/cart/");
    return res.data;
};

export const addCartItem = async (data) => {
    const res = await axiosClient.post("/cart-items/", data);
    return res.data;
};

export const updateCartItemQuantity = async (id, quantity) => {
    const res = await axiosClient.patch(`/cart-items/${id}/`, { quantity });
    return res.data;
};

export const removeCartItem = async (id) => {
    const res = await axiosClient.delete(`/cart-items/${id}/`);
    return res.data;
};