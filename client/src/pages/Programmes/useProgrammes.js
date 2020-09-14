import { useEffect, useState } from "react";
import MomentumClient from "../../common/MomentumClient";

const useProgrammes = () => {
    const [programmeDegrees, setProgrammeDegrees] = useState([]);

    const createProgramme = (programme, updateList) => {
        MomentumClient.createProgramme(programme)
            .then(() => updateList())
            .then(() => fetchAllProgrammes())
            .catch((e) => console.error(e));
    };

    const deleteProgramme = (id, history, notifyUpdate) => {
        MomentumClient.deleteProgramme(id)
            .then(() => {
                history.push("/programmes/");
                notifyUpdate();
            })
            .catch((e) => console.error(e));
    };

    const fetchAllProgrammes = () => {
        MomentumClient.getProgrammes()
            .then((res) => setProgrammeDegrees(res))
            .catch((e) => console.error(e));
    };

    const updateProgramme = (programme, notifyUpdate) => {
        MomentumClient.updateProgramme(programme)
            .then(() => notifyUpdate())
            .catch((e) => console.error(e));
    };

    useEffect(() => fetchAllProgrammes(), []);

    return { programmeDegrees, fetchAllProgrammes, createProgramme, deleteProgramme, updateProgramme };
};

export default useProgrammes;
