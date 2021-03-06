import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Topbar from "../../components/layout/topbar/topbar";
import { clearState, confirmRegistration, userSelector } from "../../features/User";
import './RegisterConfirm.scss';
import TopLogo from '../../components/ui/topLogo/topLogo';

function RegisterConfirm() {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const { isError, isSuccess, errorMsg } = useAppSelector(
      userSelector
    );

    const[error, setError] = useState<string>();

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
      <div className ="wrong-token">
        <TopLogo />
        <h1 className="h1-error">{error}</h1>
      </div>
    );
}

export default RegisterConfirm;