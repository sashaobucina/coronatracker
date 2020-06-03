#!/bin/sh

# Benchmark for getting supported countries
ab -n 100 -c 5 http://0.0.0.0:5000/valid-countries > valid_countries_benchmark.txt

# Benchmark for getting top movers
ab -n 100 -c 5 http://0.0.0.0:5000/top-movers > top_movers_benchmark.txt

# Benchmark for getting top contributors
ab -n 100 -c 5 http://0.0.0.0:5000/top-contributors > top_contributors_benchmark.txt

# Benchmark for getting peak data
ab -n 100 -c 5 http://0.0.0.0:5000/peak-data > peak_data_benchmark.txt

# Benchmark for getting country data
ab -n 100 -c 5 http://0.0.0.0:5000/cases/Global > country_cases_benchmark.txt

# Benchmark for getting all country data at a high-level
ab -n 100 -c 5 http://0.0.0.0:5000/cases > all_countries_benchmark.txt

# Benchmark for getting news
ab -n 100 -c 5 http://0.0.0.0:5000/news/country/Canada > country_news_benchmark.txt
