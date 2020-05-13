A RESTful API supporting the tracking of trends and movements for the COVID-19 virus. This API supports the client-side component of the [Coronatracker](https://sashaobucina.github.io/coronatracker/) site.

Hosted on [Dockerhub](https://hub.docker.com/r/sashaobucina/coronatracker)

## Table Of Contents

  - [Valid Countries](#valid-countries)
  - [Top Movers](#top-movers)
  - [Top Contributors](#top-contributors)
  - [Peak Data](#peak-data)
  - [Confirmed Cases](#confirmed-cases)
  - [Country Data](#country-data)
  - [News](#news)
  - [News - Supported Countries](#news-supported-countries)

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
  date: Date,
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
  },
  recovered: {
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
  date: Date,
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
    ...],
    recovered: [
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
{
  date: Date,
  confirmed: [
    {
      country: String,
      daysSince: int,
      percentBelow: float,
      newCases: int,
      peak: int,
    }
  ...],
  deaths: [
    {
      country: String,
      daysSince: int,
      percentBelow: float,
      newCases: int,
      peak: int,
    }
  ...],
  recovered: [
    {
      country: String,
      daysSince: int,
      percentBelow: float,
      newCases: int,
      peak: int,
    }
  ...]
}
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
  date: Date,
  overall: [
    {
      date: Date,
      confirmed: int,
      deaths: int,
      recovered: int
    },
  ...],
  first_derivative_data: [
    {
      date: Date,
      confirmed: int,
      deaths: int,
      recovered: int
    },
  ...],
  second_derivative_data: [
    {
      date: Date,
      confirmed: int,
      deaths: int,
      recovered: int
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
    },
    recovered: {
      country: String,
      total: int,
      newCases: int,
      maxCases: int,
      percentBelow: float,
      daysSince: int,
      percentChange: float
    }
  },
  travel: {
    description: String,
    published: Date
  }
}
```

### News

Returns all COVID-19 related news stories for a country, given the country is supported.

```bash
GET /news/country/{country}
```

Return Type:
```yaml
[
  {
    description: String,
    link: String,
    image: String,
    published: Date,
    title: String
  }
...]
```

### News Supported Countries

Returns all the countries that support news scraping.

```bash
GET /news/supported-countries
```

Return Type:
```yaml
[String...]
```