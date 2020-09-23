import ApiClient from "./ApiClient";

const endpoint = "plan";

const getPlans = () => {
    return ApiClient("plan");
};

const createProgrammePlan = (programmeID, newPlan) => {
    return ApiClient(`${endpoint}/programmedegree/${programmeID}`, {
        method: "POST",
        body: newPlan,
    });
};
const createStudentPlan = (studentUpi, newPlan) => {
    return ApiClient(`${endpoint}/student/${studentUpi}`, {
        method: "POST",
        body: newPlan,
    });
};

const deletePlan = (id) => {
    return ApiClient(`${endpoint}/${id}`, {
        method: "DELETE",
    });
};

const getPlan = (id) => {
    return ApiClient(`${endpoint}/${id}`);
};

const updatePlan = (plan) => {
    return ApiClient(`${endpoint}`, {
        body: plan,
        method: "PUT",
    });
};

const PlansClient = {
    getPlans,
    createStudentPlan,
    createProgrammePlan,
    deletePlan,
    updatePlan,
    getPlan,
};

export default PlansClient;
