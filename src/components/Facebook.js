import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'
import DataDetail from '../components/DataDetail'
import {connect} from 'react-redux'
import {createProject} from '../store/actions/projectActions'

 class Facebook extends Component {
    state = {
        isLoggedIn : false,
        userID: '',
        accessToken : '',
        name : 'here should be your name',
        email : 'here should be your email',
        picture : '',
        hometown : 'here should be your hometown',
        birthday : 'here should be your birthday',
        gender : 'here should be your gender'
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            isLoggedIn : false
        })
    }

    responseFacebook = response => {
            if( response.name !== undefined) {
                localStorage.setItem('userPicture', response.picture.data.url);
                localStorage.setItem('userID', response.id);
                localStorage.setItem('userName', response.name);
                localStorage.setItem('userEmail', response.email);
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('gender', response.gender);
                localStorage.setItem('birthday', response.birthday);
                if (response.hometown !== undefined ) {
                    localStorage.setItem('hometown', response.hometown.name);
                }

                this.setState({
                    isLoggedIn : true,
                    name :  localStorage.getItem('userName'),
                    email: localStorage.getItem('userEmail'),
                    userID : localStorage.getItem('userID'),
                    accessToken :  localStorage.getItem('accessToken'),
                    picture : localStorage.getItem('userPicture'),
                    gender : localStorage.getItem('gender'),
                    birthday : localStorage.getItem('birthday'),
                    hometown : localStorage.getItem('hometown')
                })
                this.props.createProject(this.state);
            }
        
    }

    render() {

        let fbContent;

        if (this.state.isLoggedIn) {
            
                fbContent = (
                       <div className='logged-content'>
                            <div className='logout' onClick={this.logout} href="#">Logout</div>
                            <DataDetail/>
                       </div>
                );
                     
        } else {
            fbContent = (
                <div>
                <FacebookLogin
                    appId="2094913534134846"
                    autoLoad={true}
                    fields="name,email,picture,gender,birthday,hometown"
                    //simply add the word "posts" after coma to retreive the posts
                    callback={this.responseFacebook}
                    onLogin={this.responseFacebook}
                    icon="fa-facebook"
                     />
                </div>
                    );
        }

        return (
            <div>
                {fbContent}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(null, mapDispatchToProps)(Facebook)
