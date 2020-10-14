import ApiClient from "./ApiClient";

const endpoint = "plan";

const getPlans = () => {
    return ApiClient(endpoint, {
        method: "GET",
    });
};

const getPlan = (id) => {
    return ApiClient(`${endpoint}/${id}`, {
        method: "GET",
    });
};

const createProgrammePlan = (programmeID, plan) => {
    return ApiClient(`${endpoint}/programmedegree/${programmeID}`, {
        method: "POST",
        body: plan,
    });
};
const createStudentPlan = (studentUpi, plan) => {
    return ApiClient(`${endpoint}/student/${studentUpi}`, {
        method: "POST",
        body: plan,
    });
};

const updatePlan = (plan) => {
    return ApiClient(endpoint, {
        method: "PUT",
        body: plan,
    });
};

const deletePlan = (id) => {
    return ApiClient(`${endpoint}/${id}`, {
        method: "DELETE",
    });
};

const PlansClient = {
    getPlans,
    getPlan,
    createStudentPlan,
    createProgrammePlan,
    updatePlan,
    deletePlan,
};

export default PlansClient;
