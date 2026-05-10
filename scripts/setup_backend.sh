set -e

source .env

cd backend || exit

if [ ! -d "venv" ]; then
    python -m venv venv
fi

source venv/bin/activate

pip install -r requirements.txt # Installs packages

python manage.py migrate # Applies migrations
python manage.py seed # Seeds the database if it is empty

cd ..

echo "Backend cargado"