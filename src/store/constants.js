const ROOT_ENDPOINT = "http://localhost:8080/";
const SITE_ID = "mscc-jobs-json";
const ROOT_ENDPOINT_SITE_ID = ROOT_ENDPOINT + SITE_ID;
const USE_JSON = ".json";

// GET

const LATEST_JOBS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/latest" + USE_JSON;
const JOBS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/listings";
const TAGS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/popularjobs";
const EMPLOYERS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/employers";
const CONTENT_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/content";

// GET w/ params

const GET_JOB_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/jobs"; ///jobs/{jobId}

// POST

// POST w/ params
const SEARCH_ENDPOINT = ROOT_ENDPOINT + "/search";
const PROFILE_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/profile";
const CUSTOMER_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/customer";
const APPLY_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/apply";
const UPLOAD_ENDPOINT = ROOT_ENDPOINT + "/upload";

export {
  LATEST_JOBS_ENDPOINT,
  JOBS_ENDPOINT,
  TAGS_ENDPOINT,
  EMPLOYERS_ENDPOINT,
  PROFILE_ENDPOINT,
  GET_JOB_ENDPOINT,
  SEARCH_ENDPOINT,
  APPLY_ENDPOINT,
  USE_JSON,
  CUSTOMER_ENDPOINT,
  CONTENT_ENDPOINT,
  UPLOAD_ENDPOINT
};
