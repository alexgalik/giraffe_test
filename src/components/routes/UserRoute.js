import React from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom'

export default function (Component) {

    class UserRoute extends React.Component{

        render(){
            const {isAuthenticated} = this.props;
            return (
                <div>
                    {isAuthenticated ? <Component {...this.props}/> : <Redirect to = "/"/>}
                </div>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: !!state.user.username
        }
    };

    return connect(mapStateToProps)(UserRoute);
}

