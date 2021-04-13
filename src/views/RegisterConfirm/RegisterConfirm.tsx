import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearState, confirmRegistration, userSelector } from "../../features/User/UserSlice";

function RegisterConfirm() {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const { isError, isSuccess, errorMsg } = useAppSelector(
      userSelector
    );

    const[error, setError] = useState<string>();

    //wyciąga z paramsów registrationtoken, robi strzał do API tymże tokenem i robi history.push(/login)
    const { regToken } = useParams<{regToken: string}>();

    useEffect(() => {
        dispatch(clearState());
        dispatch(confirmRegistration(regToken));
    },[])

    useEffect(() => {
        if (isError) {
          setError(errorMsg);
          dispatch(clearState());
        }
        if (isSuccess) {
          dispatch(clearState());
          history.push('/');
        }
      }, [isError, isSuccess]);

    return (
        <h1>{error}</h1>
    );
}

export default RegisterConfirm;