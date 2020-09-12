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

    const getProgramme = (id, setSelectedProgramme) => {
        MomentumClient.getProgrammeInfo(id)
            .then((res) => setSelectedProgramme(res))
            .catch((e) => console.error(e));
    };

    useEffect(() => fetchAllProgrammes(), []);

    return { programmeDegrees, fetchAllProgrammes, getProgramme, createProgramme, deleteProgramme };
};

export default useProgrammes;
