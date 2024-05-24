docker run --name postgres --rm -d -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=indiabuild postgres:16-alpine
