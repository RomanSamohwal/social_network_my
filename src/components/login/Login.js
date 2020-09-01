import React  from "react";
import {reduxForm} from "redux-form";
import {createField, InputType} from "../common/FormsControl/FormsControls";
import {required} from "../utils/vadidators/validators";
import style from './../common/FormsControl/FormsControls.module.css'
import {connect} from "react-redux";
import {getLogin} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import s from './Login.module.scc.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Login", 'email', InputType, [required])}
            {createField("Password", 'password', InputType, [required], {type: "password"})}
            {createField(null, 'rememberMe', InputType, [], {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", InputType, [required])}
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button className={style.button}><VpnKeyIcon color={'primary'}/></button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.getLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <Container maxWidth={'md'}>
                <Paper style={{backgroundColor: '#eaf1f6', padding: '20px'}}>
                    <div className={s.loginContainer}>
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div>
                            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
                        </div>
                    </div>
                </Paper>
            </Container>

        </div>
    )
};

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {getLogin})(Login);