import {connect} from "react-redux";
import Layout from "../components/Layout";

const mapStateToProps = (state) => {
	return {
		isAuth:         state.auth.user !== null,
		isReady:        state.bootstrap.isReady,
		successMessage: state.alerts.success,
		errorMessage:   state.alerts.error,
		messageId:      state.alerts.id,
	};
};

const mapDispatchToProps = () => {
	return {};
};

const LayoutContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout);

export default LayoutContainer;