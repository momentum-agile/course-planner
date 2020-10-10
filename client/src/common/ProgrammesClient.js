import ApiClient from "./ApiClient";

const getProgrammes = () => {
    return ApiClient(`programmedegree`);
};

const createProgramme = (newProgramme) => {
    return ApiClient(`programmedegree`, {
        method: "POST",
        body: newProgramme,
    });
};

const deleteProgramme = (id) => {
    return ApiClient(`programmedegree/${id}`, {
        method: "DELETE",
    });
};

const getProgramme = (id) => {
    return ApiClient(`programmedegree/${id}`);
};

const updateProgramme = (programme) => {
    return ApiClient(`programmedegree`, {
        body: programme,
        method: "PUT",
    });
};

const ProgrammesClient = {
    getProgrammes,
    getProgramme,
    createProgramme,
    deleteProgramme,
    updateProgramme,
};

export default ProgrammesClient;
