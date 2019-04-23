# Detectively

## Installing

Run `npm install` from the root and `client` directories.

## Building

Run `npm run build` from the root directory.

## Running

### Development

To start the development React app:
1. Run `npm run dev` from the root directory
1. Navigate in your browser to [localhost:3000](localhost:3000)

### Production

To start the production React app:
1. Build the app with `npm run build`
1. Run `npm start` from the root directory
1. Navigate in your browser to [localhost:5000](localhost:5000)

## Server

### /salary Endpoint

Allows you to query salary data by specifying a filter value for fields.
Multiple values can be entered for a field by separating them with commas.

#### Query Parameters

Parameter|Type|Description
---|---|---
`id`|Number|Matches a single record with the specified id
`min_id`|Number|All records with salaries greater than or equal to the specified value
`max_id`|Number|All records with salaries less than or equal to the specified value
`salary`|Number|Matches all records with the exact salary specified
`min_salary`|Number|All records with salaries greater than or equal to the specified value
`max_salary`|Number|All records with salaries less than or equal to the specified value
`year`|Number|All records for the exact year
`min_year`|Number|All records from the specified year until the latest year
`max_year`|Number|All records from the earliest year until the specified year
`last_name`|String|All records with last names matching or containing the substring
`first_name`|String|All records with first names matching or containing the substring
`sector`|String|All records with sectors matching or containing the substring
`employer`|String|All records with employers matching or containing the substring
`job_title`|String|All records with job titles matching or containing the substring
`location`|String|All records with locations matching or containing the substring
`format`|json, csv|The format to return the results in, defaults to json

#### Examples

*Retrieve all records with a salary greater than $150k and located in Guelph*
>GET /salary?min_salary=150000&location=Guelph

*Retrieve all records for the years 2000 and 2010 for professors earning $250k-$255k in a CSV format*
>GET /salary?year=2000,2010&job_title=professor&min_salary=250000&max_salary=255000&format=csv

*Retrieve the specific records with ids 15000, 14987, 16203*
>GET /salary?id=15000,14987,16203


### /average_salary Endpoint

Allows you to query the avaerage salary data by specifying a filter value for fields.
Multiple values can be entered for a field by separating them with commas.

#### Query Parameters

Parameter|Type|Description
---|---|---
`id`|Number|Matches a single record with the specified id
`min_id`|Number|All records with salaries greater than or equal to the specified value
`max_id`|Number|All records with salaries less than or equal to the specified value
`salary`|Number|Matches all records with the exact salary specified
`min_salary`|Number|All records with salaries greater than or equal to the specified value
`max_salary`|Number|All records with salaries less than or equal to the specified value
`year`|Number|All records for the exact year
`min_year`|Number|All records from the specified year until the latest year
`max_year`|Number|All records from the earliest year until the specified year
`sector`|String|All records with sectors matching or containing the substring
`location`|String|All records with locations matching or containing the substring
`format`|json, csv|The format to return the results in, defaults to json

#### Examples

*Average salary for the universities sector in Ontario in 2010*
>GET /average_salary?sector=universities&location=ontario&year=2010

### /fuzzy Endpoint

Searches all salary fields for approximate matches to the query.

#### Query Parameters

Parameter|Type|Description
---|---|---
`q`|*|Matches all records with at least one field matching or containing the substring
`format`|json, csv|The format to return the results in, defaults to json

#### Examples

*Search for Guelph*
>GET /fuzzy?q=Guelph
