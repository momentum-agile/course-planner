import { useEffect, useState } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";

const useProgrammes = () => {
    const [programmeDegrees, setProgrammeDegrees] = useState([]);

    const createProgramme = (programme, updateList) => {
        CoursePlannerClient.createProgramme(programme)
            .then(() => updateList())
            .then(() => fetchAllProgrammes())
            .catch((e) => console.error(e));
    };

    const deleteProgramme = (id, history, notifyUpdate) => {
        CoursePlannerClient.deleteProgramme(id)
            .then(() => {
                history.push("/programmes/");
                notifyUpdate();
            })
            .catch((e) => console.error(e));
    };

    const fetchAllProgrammes = () => {
        CoursePlannerClient.getProgrammes()
            .then((res) => setProgrammeDegrees(res))
            .catch((e) => console.error(e));
    };

    const updateProgramme = (programme, notifyUpdate) => {
        CoursePlannerClient.updateProgramme(programme)
            .then(() => notifyUpdate())
            .catch((e) => console.error(e));
    };

    useEffect(() => fetchAllProgrammes(), []);

    return { programmeDegrees, fetchAllProgrammes, createProgramme, deleteProgramme, updateProgramme };
};

export default useProgrammes;
