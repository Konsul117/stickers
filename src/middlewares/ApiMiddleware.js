export default store => next => action => {
	console.log(store.getState(), next, action);
	next(action);
}