import axis from 'axios';
import store from '../store';

const apiPublic = axis.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 10000
})
const apiProtected = axis.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 10000,
    headers: {
        'x-access-token': store.state.token
    }

})

export {
    apiPublic,
    apiProtected
}