import React from "react";

class UserProfileCardTask extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <div class="card-container">
                    <div class="card">
                        <div class="card-header">
                            <img src={this.props.image} alt="Profile Image" class="profile-img" />
                                <h2>{this.props.name}</h2>
                                <p class="title">{this.props.tital}</p>
                        </div>

                        <div class="card-body">
                            <div class="detail-item">
                                <i class="fas fa-envelope"></i>
                                <span>{this.props.email}</span>
                            </div>

                            <div class="detail-item">
                                <i class="fas fa-phone"></i>
                                <span>{this.props.contact}</span>
                            </div>

                            <div class="detail-item">
                                <i class="fas fa-venus-mars"></i>
                                <span>{this.props.gender}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserProfileCardTask