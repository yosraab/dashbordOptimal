/**
 * Return an object from a param given array using a param given ID.
 *
 * @author: Malek BOUBAKRI
 *
 * @param {string} id of the object we want to search in the array.
 * @param {Array<any>} array we want to search in.
 * @return {Object} the object you want if exist or undefined if not.
 */
export const getObjectFromArrayByID = (id, array) => array.find(item => item._id === id);
