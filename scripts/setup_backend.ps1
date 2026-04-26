$ErrorActionPreference = 'Stop'

. .\.env

cd backend

if (-not (Test-Path "venv")) {
    python -m venv .
}

. .\venv\Scripts\Activate.ps1

pip install -r requirements.txt # Installs packages

python manage.py migrate # Applies migrations

Write-Host "Backend cargado"