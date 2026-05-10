$ErrorActionPreference = 'Stop'

. .\.env

cd backend

if (-not (Test-Path "venv")) {
    python -m venv .
}

. .\venv\Scripts\Activate.ps1

pip install -r requirements.txt # Installs packages

cd ..

Write-Host "Backend cargado"