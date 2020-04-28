This directory contains the RESTful microservice supporting the client-side component of the web application.

Hosted on [Dockerhub](https://hub.docker.com/r/sashaobucina/coronatracker)

## Table Of Contents

  - [Valid Countries](#valid-countries)
  - [Top Movers](#top-movers)
  - [Top Contributors](#top-contributors)
  - [Peak Data](#peak-data)
  - [Confirmed Cases](#confirmed-cases)
  - [Country Data](#country-data)

## Supported Endpoints

### Valid Countries

Returns all the countries being tracked by the John Hopkins CSSE repository.

```bash
GET /valid-countries
```

Return Type:

```yaml
[String...]
```

### Top Movers

Returns movement information for countries that have sufficient data in terms of which countries gained the most amount of cases, or gained the least amount of most cases.

```bash
GET /top-movers
```

Return Type:

```yaml
{
  confirmed: {
    top_gainers: [
      {
        country: String,
        change: int,
        percentChange: float,
        totalCases: int
      }
    ...],
    top_losers: [
      {
        country: String,
        change: int,
        percentChange: float,
        totalCases: int
      }
    ...]
  },
  deaths: {
    top_gainers: [
      {
        country: String,
        change: int,
        percentChange: float,
        totalCases: int
      }
    ...],
    top_losers: [
      {
        country: String,
        change: int,
        percentChange: float,
        totalCases: int
      }
    ...]
  }
}
```

### Top Contributors

Returns information on the top 10 countries impaced by the COVID-19 virus.

```bash
GET /top-contributors
```

Return Type:

```yaml
{
  graph: {
    labels: [...],
    contributors: [...]
  },
  summary: {
    confirmed: [
      {
        country: String,
        total: int,
        newCases: int,
        maxCases: int,
        percentBelow: float,
        daysSince: int,
        percentChange: float
      }
    ...],
    deaths: [
      {
        country: String,
        total: int,
        newCases: int,
        maxCases: int,
        percentBelow: float,
        daysSince: int,
        percentChange: float
      }
    ...]
  }
}
```

### Peak Data

Returns information on countries with more than 5000 cases about when the countries peaked, and how many days since.

```bash
GET /peak-data
```

Return Type:

```yaml
[
  {
    country: String,
    daysSince: int,
    percentBelow: float,
    newCases: int,
    peak: int,
    peakDate: Date
  }
...]
```

### Confirmed Cases

Returns all confirmed cases for all countries tracked in by the John Hopkins CSSE repository.

```bash
GET /cases
```

Return Type:

```yaml
[
  {
    date: Date,
    data: [
      {
        country: String,
        value: int
      }
    ...]
  }
...]
```

### Country Data

Returns country data for a supported country.

```bash
GET /cases/{country}
```

Return Type:

```yaml
{
  overall: [
    {
      date: Date,
      confirmed: int,
      deaths: int
    },
  ...],
  first_derivative_data: [
    {
      date: Date,
      confirmed: int,
      deaths: int
    },
  ...],
  second_derivative_data: [
    {
      date: Date,
      confirmed: int,
      deaths: int
    },
  ...],
  summary: {
    confirmed: {
      country: String,
      total: int,
      newCases: int,
      maxCases: int,
      percentBelow: float,
      daysSince: int,
      percentChange: float
    },
    deaths: {
      country: String,
      total: int,
      newCases: int,
      maxCases: int,
      percentBelow: float,
      daysSince: int,
      percentChange: float
    }
  }
}
```
