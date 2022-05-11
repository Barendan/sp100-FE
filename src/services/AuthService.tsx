import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import { config } from './config';
import { CognitoUser } from '@aws-amplify/auth'

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        identityPoolId: config.IDENTITY_POOL_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
})


export class AuthService {
    
    public async signUp(username: string, password: string, email: string):Promise<CognitoUser | undefined>{
        try {
            const result = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            return result.user;
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    public async confirmSignUp(username: string, code: string):Promise<any | undefined>{
        try {
            const result = await Auth.confirmSignUp(username, code);
            return result
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    public async logOut(){
        return await Auth.signOut();
    }

}