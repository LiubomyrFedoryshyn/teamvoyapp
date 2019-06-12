import React, {Component} from 'react'
import {connect} from 'react-redux'

class DataDetail extends Component {
    render () {
        const {projects} = this.props

        let data = (projects) ? projects.map(m => {
            if (m.birthday !== 'undefined') {
                return (
                    <div className="user-info" key={m.userID}>
                         <img src={m.picture} alt={m.name}/>
                         <h3>{m.name}</h3>
                         <h4>{m.email}</h4>
                         <h4>{m.gender}</h4>
                         <h4>{m.birthday}</h4>
                         <h4>{m.hometown}</h4>
                         {/* {m.posts.map(e => {
                             return (
                                 <h2>{e}</h2>
                             )
                         })} */}
                         {/* if you have a premissions for posts api */}
                    </div>  
                )
            } else {
                return (
                     <div className="user-info" key={m.userID}>
                         <img src={m.picture} alt={m.name}/>
                         <h3>{m.name}</h3>
                         <h4>{m.email}</h4>
                    </div> 
                )
            }
        }) : (
            <div>
                <span>There was some mistake, please, try to login again</span>
            </div>
        )
       

        return (
            <div>
               {data && data}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects : state.projects
    }
}

export default connect (mapStateToProps)(DataDetail)