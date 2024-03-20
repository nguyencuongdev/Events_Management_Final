import './LoginPage.css';
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext, actions } from '../../store';
import { loginService, getListRegistedEventService } from '../../services';

function LoginPage() {
    const [, dispath] = useContext(StoreContext);

    const navigate = useNavigate();
    const errLastNameRef = useRef(null);
    const errRegistrationCodeRef = useRef(null);
    const errMessaegRef = useRef(null);

    const [lastNameValue, setLastNameValue] = useState('');
    const [registrationCodeValue, setRegistrationCodeValue] = useState('');
    const [checkLastName, setCheckLastName] = useState(false);
    const [checkRegistrationCode, setCheckRegistrationCode] = useState(false);

    const handleChangeLastName = (e) => {
        let value = e.target.value;
        if (!value.trim()) {
            setLastNameValue('');
            return;
        }
        setLastNameValue(value);
        errLastNameRef.current.innerText = ' ';
    }


    const handleChangeRegistrationCode = (e) => {
        let value = e.target.value;
        if (!value.trim()) {
            setRegistrationCodeValue('');
            return;
        }
        setRegistrationCodeValue(value);
        errRegistrationCodeRef.current.innerText = ' ';
    }

    const handleValidateLastName = (e) => {
        let value = e.target.value;
        if (!value.trim()) {
            setCheckLastName(false);
            errLastNameRef.current.innerText = 'Last name không được để trống!';
            return;
        }
        setCheckLastName(true);
        errLastNameRef.current.innerText = ' ';
    }

    const handleValidateRegistrationCode = (e) => {
        let value = e.target.value;
        if (!value.trim()) {
            setCheckRegistrationCode(false);
            errRegistrationCodeRef.current.innerText = 'Mã đăng ký không được để trống!';
            return;
        }
        setCheckRegistrationCode(true);
        errRegistrationCodeRef.current.innerText = ' ';
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!checkLastName)
            errLastNameRef.current.innerText = 'Last name không được để trống!';
        if (!checkRegistrationCode)
            errRegistrationCodeRef.current.innerText = 'Mã đăng ký không được để trống!';
        if (checkLastName && checkRegistrationCode) {
            const data = await loginService(lastNameValue, registrationCodeValue);
            if (data?.message) {
                errMessaegRef.current.innerText = 'Last name hoặc mã đăng ký không chính xác';
                return;
            }
            dispath(actions.storeInforUser(data));
            const listRegistedEvent = await getListRegistedEventService(data?.token);
            dispath(actions.storeListRegistedEvent(listRegistedEvent));
            (window.history.length > 1) ? navigate(-1) : navigate('/');
        }
    }

    return (
        <div className="login">
            <form className='form-login' method='POST' onSubmit={handleLogin}>
                <h2 className='login-title mb-4 text-primary'>Đăng nhập</h2>
                <div className="form-group form-inline">
                    <label htmlFor="#lastname"
                        className='col-lg-4 text-left d-inline-block px-0'
                    >
                        Last name:
                    </label>
                    <input type="text" className='form-control col-lg-8 d-inline-block' name='lastname'
                        id='lastname'
                        value={lastNameValue}
                        onChange={handleChangeLastName}
                        onBlur={handleValidateLastName}
                    />
                    <p className='message mt-2 text-danger col-12 px-0 mb-0' ref={errLastNameRef}>
                    </p>
                </div>
                <div className="form-group form-inline">
                    <label htmlFor="#registration_code"
                        className='col-lg-4 text-left d-inline-block px-0'
                    >
                        Registration code:
                    </label>
                    <input type="text" className='form-control col-lg-8 d-inline-block' name='registration_code'
                        id='registration_code'
                        value={registrationCodeValue}
                        onChange={handleChangeRegistrationCode}
                        onBlur={handleValidateRegistrationCode}
                    />
                    <p className='message mt-2 text-danger col-12 px-0 mb-0'
                        ref={errRegistrationCodeRef}>
                    </p>
                </div>
                <p className='message mt-2 text-danger col-12 px-0 mb-0' ref={errMessaegRef}>
                </p>
                <div className="form-group">
                    <button className='btn btn-block btn-primary'>Đăng nhập</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;