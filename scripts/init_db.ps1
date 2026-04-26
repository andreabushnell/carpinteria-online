. .\.env

$userExists = psql -U postgres -tc "SELECT 1 FROM pg_roles WHERE rolname='$env:DB_USER'" | Select-String -Quiet 1
if (-not $userExists) {
    psql -U postgres -c "CREATE USER $env:DB_USER WITH PASSWORD '$env:DB_PASSWORD'"
}

Write-Host "🔍 Comprobando base de datos..."

$dbExists = psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname='$env:DB_NAME'" | Select-String -Quiet 1
if (-not $dbExists) {
    psql -U postgres -c "CREATE DATABASE $env:DB_NAME OWNER $env:DB_USER"
}

Write-Host "Conexion a base de datos exitosa"