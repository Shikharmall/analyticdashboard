const ENV = import.meta.env.VITE_ENV;

let URL = "http://localhost:5174";

if (ENV === "LOCAL") {
  URL = "http://localhost:5174";
  console.log("USING ENV: LOCAL");
} else if (ENV === "DEV") {
  URL = "";
  console.log("USING ENV: DEV");
} else {
  console.log(
    "WARN: No valid environment available, defaulting to localhost API"
  );
}

export const API_URL_BASE = URL;