import React from 'react';
import { User  } from '../model/Model'
import { AuthService } from '../services/AuthService'
import { DataService } from '../services/DataService';
import { CreateSpace } from './spaces/CreateSpace';
import { Reservations } from './reservations/Reservations';
import { SignUp } from './Auth/Signup';

interface AppState{
  user: User | undefined
}

export class App extends React.Component<{}, AppState>{

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  constructor(props: any){
    super(props)
    this.state = {
      user: undefined
    }

    this.setUser = this.setUser.bind(this);
    this.clearUser = this.clearUser.bind(this);

  }


  private clearUser(){
    this.setState({
      user: undefined
    });
  }

  private async setUser(user: User){
    const isAdmin = this.authService.isUserAdmin(user);
    if (isAdmin) {
      user.isAdmin = true;
    }
    this.setState({
      user: user
    })
    this.dataService.setUser(user);
    await this.authService.getAWSTemporaryCreds(user.cognitoUser);
  }


  render(){
    return (
      <div className='wrapper'>
            MAIN APP PAGE
      </div>
    )
  }
}