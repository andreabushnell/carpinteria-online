import axiosClient from "../client/axios";


export const getOrders = async (page = 1) => {
    
    const config = {};

    if (page) {
        config.params = { page: page };
    }

    const res = await axiosClient.get("/orders/", config)
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
    const res = await axiosClient.post(`orders/${id}/update-status/`, { state });
    return res.data;
};

export const updateOrder = async (id, orderData) => {
    const res = await axiosClient.patch(`/orders/${id}/`, orderData);
    return res.data;
}