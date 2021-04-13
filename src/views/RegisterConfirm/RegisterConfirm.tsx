import { useParams } from "react-router";

function RegisterConfirm() {

    //wyciąga z paramsów registrationtoken, robi strzał do API tymże tokenem i robi history.push(/login)
    const { regToken } = useParams<{regToken: string}>();
    return (
        <div></div>
    );
}

export default RegisterConfirm;