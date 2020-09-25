import axios from 'axios';
import {ITokenParameters} from '../shared/interfaces/ITokenParameter';

export class AuthService {
  static login () {
      return axios.get<string>('/spotify/login');
  };

  static requestToken (tokenParams: ITokenParameters) {
      return axios.post('/spotify/token', tokenParams);
  }
}
