const SERVER_URL = "https://express-backend-9nif.onrender.com/";
const LOCAL_URL = "http://localhost:5003/";

const url = process.env.NODE_ENV === "production" ? SERVER_URL : LOCAL_URL;

export default url;
