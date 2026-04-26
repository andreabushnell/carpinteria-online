. .\.env

cd backend
. .\venv\Scripts\Activate.ps1

python manage.py flush --no-input # Truncates all tables without influencing the schema
python manage.py migrate # Applies migrations 

Write-Host "Backend reseteado"