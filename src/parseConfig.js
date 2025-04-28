// keeps all your back4app credentials and init logic in one spot.
import Parse from 'parse';

const APPLICATION_ID  = "TqxNU8zQD14G5gx5IQHU30qe0gTBEFwDdciKG85C";
const JAVASCRIPT_KEY = "tgvd2ClphJz4GwVy7mANMrvE50uhE9oZN2kmAboP";
const SERVER_URL     = "https://parseapi.back4app.com/";

Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
Parse.serverURL = SERVER_URL;

export default Parse;
