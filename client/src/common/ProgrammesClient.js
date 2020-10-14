import ApiClient from "./ApiClient";

const endpoint = "programmedegree";

const getProgrammes = () => {
    return ApiClient(endpoint, {
        method: "GET",
    });
};

const getProgramme = (id) => {
    return ApiClient(`${endpoint}/${id}`, {
        method: "GET",
    });
};

const createProgramme = (programme) => {
    return ApiClient(endpoint, {
        method: "POST",
        body: programme,
    });
};

const updateProgramme = (programme) => {
    return ApiClient(endpoint, {
        method: "PUT",
        body: programme,
    });
};

const deleteProgramme = (id) => {
    return ApiClient(`${endpoint}/${id}`, {
        method: "DELETE",
    });
};

const ProgrammesClient = {
    getProgrammes,
    getProgramme,
    createProgramme,
    updateProgramme,
    deleteProgramme,
};

export default ProgrammesClient;
