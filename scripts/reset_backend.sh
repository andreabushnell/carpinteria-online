source .env

cd backend || exit
source venv/bin/activate

python manage.py migrate # Applies migrations 
python manage.py reset_seed # Resets and seeds the database

cd ..

echo "Backend reseteado"