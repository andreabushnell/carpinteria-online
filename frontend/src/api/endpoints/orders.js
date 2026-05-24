import axiosClient from "../client/axios";


export const getOrders = async () => {
    const res = await axiosClient.get("/orders/");
    return res.data;
};

export const getOrderById = async (id) => {
    const res = await axiosClient.get(`/orders/${id}/`);
    return res.data;
};

export const createOrder = async (orderData) => {
    const res = await axiosClient.post("/orders/", orderData);
    return res.data;
};


export const updateOrderStatus = async (id, state) => {
    const res = await axiosClient.post(`/orders/${id}/update-status/`, { state });
    return res.data;
};