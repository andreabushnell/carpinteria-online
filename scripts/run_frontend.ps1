$ErrorActionPreference = 'Stop'

. .\.env

cd frontend

$env:PORT = $env:FRONTEND_PORT
npm start

Write-Host "Frontend iniciado"