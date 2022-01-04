// const ROOT_ENDPOINT = "http://localhost:8000/v1/public";
const ROOT_ENDPOINT = "https://api.agilemedia.mu/v1/public";
const SITE_ID = "1";
const ROOT_ENDPOINT_SITE_ID = ROOT_ENDPOINT + "/sites/" + SITE_ID;
const DEFAULT_RADIUS_MILES = 25;
const CHECKOUT_API = "https://cdn.checkout.com/sandbox/js/checkout.js";
// const CHECKOUT_API = "https://cdn.checkout.com/js/checkout.js";

// GET

const LATEST_JOBS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/latest";
const JOBS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/listings";
const TAGS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/popularjobs";
const EMPLOYERS_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/employers";
const ARTICLES_ENDPOINT = ROOT_ENDPOINT_SITE_ID + "/articles";

// GET w/ params

const GET_ARTICLE_ENDPOINT = ROOT_ENDPOINT + "/articles"; ///article/{articleId}
const GET_JOB_ENDPOINT = ROOT_ENDPOINT + "/jobs"; ///jobs/{jobId}

// POST

// POST w/ params
const SEARCH_ENDPOINT = ROOT_ENDPOINT + "/search";
const PROFILE_ENDPOINT = ROOT_ENDPOINT + "/profile";
const CUSTOMER_ENDPOINT = ROOT_ENDPOINT + "/customer";
const APPLY_ENDPOINT = ROOT_ENDPOINT + "/apply";
const ARTICLE_ENDPOINT = ROOT_ENDPOINT + "/articles/filter";
const UPLOAD_ENDPOINT = ROOT_ENDPOINT + "/upload";
const SUBSCRIBE_ENDPOINT = ROOT_ENDPOINT + "/subscribe";
const PURCHASE_ENDPOINT = ROOT_ENDPOINT + "/purchase/listing";

// API Keys
const GOOGLEMAPS_KEY = "AIzaSyDXeL4nVhBIVIjuWX9eaPh0ILzCuhIZxCs";
const DROPBOX_APP_KEY = "1rdh07gbhk409va";
const ONEDRIVE_CLIENT_ID = "e02f0289-d4d5-470e-a584-3aa83a1b2ea6";
const CHECKOUT_KEY = "pk_test_dcefa1b7-7aca-4513-bb05-04d6c9a5c687";

export {
  SITE_ID,
  LATEST_JOBS_ENDPOINT,
  JOBS_ENDPOINT,
  TAGS_ENDPOINT,
  EMPLOYERS_ENDPOINT,
  ARTICLES_ENDPOINT,
  GET_JOB_ENDPOINT,
  GET_ARTICLE_ENDPOINT,
  SEARCH_ENDPOINT,
  PROFILE_ENDPOINT,
  CUSTOMER_ENDPOINT,
  APPLY_ENDPOINT,
  ARTICLE_ENDPOINT,
  UPLOAD_ENDPOINT,
  GOOGLEMAPS_KEY,
  DROPBOX_APP_KEY,
  ONEDRIVE_CLIENT_ID,
  DEFAULT_RADIUS_MILES,
  CHECKOUT_KEY,
  SUBSCRIBE_ENDPOINT,
  CHECKOUT_API,
  PURCHASE_ENDPOINT
};
