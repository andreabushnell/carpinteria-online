source .env

cd backend || exit
source venv/bin/activate

python manage.py flush --no-input # Truncates all tables without influencing the schema
python manage.py migrate # Applies migrations 

echo "Backend reseteado"