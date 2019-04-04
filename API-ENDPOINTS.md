# Accessible API endpoints

The following API endpoints can be accessed to provide information and details about the active job adverts.

# Public Routes:

## Latest Vacancies
```
GET: /sites/{siteId}/latest
```

## Popular Jobs, aka Tags
```
GET: /sites/{siteId}/popularjobs
```

## Jobs A-Z
```
GET: /sites/{siteId}/listings
```

## Employers A-Z
```
GET: /sites/{siteId}/employers
```

## Search
```
POST: /search
```
Using the following JSON structure as payload:
```
{
  "id": 0,
  "keyword": "string",
  "searchId": "string",
  "offset": 0,
  "limit": 0,
  "inhouse": 0,
  "employment": 0,
  "contract": 0,
  "latitude": 0.0,
  "longitude": 0.0,
  "radius": 0,
  "isCountry": false,
  "startMonth": 0,
}
```

## Employer Details
```
POST: /profile
```
Using the following JSON structure as payload:
```
{
  "id": 0,
  "advertId": 0,
  "customer": "string",
  "profile": "string"
}
```

## Job Details
```
GET: /jobs/{jobId}
```

## Apply for a job
```
POST: /apply
```

## Purchase an advert
```
POST: /purchase/listings
```
