# Run this from the project root to create venv, install deps, migrate and start the dev server (Windows PowerShell)

python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cd django_project
python manage.py migrate
python manage.py runserver
