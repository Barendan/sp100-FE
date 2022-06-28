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

  }

  render(){
    return (
      <div className='wrapper'>
            MAIN APP PAGE
      </div>
    )
  }
}