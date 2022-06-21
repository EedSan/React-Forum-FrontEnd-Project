import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {tokenSelector} from '../selector/selectors';

const PublicRoute = ({token, children, ...rest}) => (<Route {...rest}>{token ? <Redirect to="/"/> : children}</Route>);

const mapStateToProps = (state) => ({token: tokenSelector(state),});

export default connect(mapStateToProps)(PublicRoute);
