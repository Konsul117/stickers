import {connect} from "react-redux";
import Login from "../../components/auth/Login";
import {login} from "../../actions/auth";

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		doLogin: (loginRequest) => dispatch(login(loginRequest)),
	};
};

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginContainer;