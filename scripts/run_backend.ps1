$ErrorActionPreference = 'Stop'

# Load .env manually
Get-Content .env | ForEach-Object {
    if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value)
    }
}

# Debug
Write-Host "HOST: $env:HOST"
Write-Host "PORT: $env:BACKEND_PORT"

cd backend
. .\venv\Scripts\Activate.ps1

python manage.py runserver "$env:HOST`:$env:BACKEND_PORT"

Write-Host "Backend iniciado"