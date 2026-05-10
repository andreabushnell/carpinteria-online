Write-Host "Iniciando aplicacion en Windows"

# Intializes database and sets up backend
& .\scripts\init_db.ps1
& .\scripts\setup_backend.ps1
# Optional database reset / fresh seeded start (commented for now):
# & .\scripts\reset_backend.ps1
& .\scripts\run_backend.ps1