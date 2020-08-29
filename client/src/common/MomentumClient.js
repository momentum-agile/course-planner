import ApiClient from "./ApiClient";

const getCourses = () => {
    return ApiClient(`course`);
};

const MomentumClient = {
    getCourses,
};

export default MomentumClient;
