import axios from 'axios';

export default axios.create({
	baseURL: BACKEND_BASE_URL,
});
