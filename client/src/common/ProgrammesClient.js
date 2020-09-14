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

const updateProgramme = (programme) => {
    return ApiClient(`programmedegree`, {
        body: programme,
        method: "PUT",
    });
};

const ProgrammesClient = {
    getProgrammes,
    createProgramme,
    deleteProgramme,
    updateProgramme,
};

export default ProgrammesClient;
