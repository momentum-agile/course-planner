const HOSTNAME = process.env.REACT_APP_HOSTNAME || "localhost";
const BACKEND_URL = "http://" + HOSTNAME + ":8080";

const ApiClient = (endpoint, { body, ...customConfig } = {}) => {
    const headers = { "content-type": "application/json" };

    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const url = `${BACKEND_URL}/${endpoint}`;

    console.log(`Making call to: ${url}`);

    return window.fetch(`${BACKEND_URL}/${endpoint}`, config).then(async (res) => {
        const text = await res.text();
        const data = text.length ? JSON.parse(text) : {};
        if (res.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};

export default ApiClient;
