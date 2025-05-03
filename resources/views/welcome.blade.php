<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hook Generator</title>
    <link rel="stylesheet" href="{{ asset('css/custom/hook.css') }}">
</head>
<body>
    <header class="header">
        <h1 class="app-title">Hook Generator</h1>
        <nav class="nav-menu">
            <a href="#" class="nav-link">Inicio</a>
            <a href="#" class="nav-link">Ganchos</a>
            <a href="#" class="nav-link">Estadísticas</a>
            <a href="#" class="nav-link">Configuración</a>
        </nav>
    </header>

    <main class="container">
        <div class="controls-container">
            <div class="search-container">
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="Buscar ganchos..." 
                    id="searchInput"
                >
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>

            <div class="view-toggle">
                <button class="view-btn active" id="cardViewBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    Tarjetas
                </button>
                <button class="view-btn" id="tableViewBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="3" y1="15" x2="21" y2="15"></line>
                        <line x1="12" y1="3" x2="12" y2="21"></line>
                    </svg>
                    Tabla
                </button>
            </div>
        </div>

        <!-- Content will be loaded via AJAX -->
        <div id="content-container">
            <div class="loading-container">
                <div class="loading-spinner"></div>
            </div>
        </div>
    </main>

    <!-- Modal PRO -->
    <div id="proModal" class="modal">
        <div class="modal-content">
            <button class="modal-close" id="closeModal">&times;</button>
            <h3 class="modal-title">FunciÓn PRO - Adaptación con IA</h3>
            <div class="modal-text">
                <p>La adaptación automática con inteligencia artificial es una función exclusiva de la versión PRO.</p>
                <p>Gancho seleccionado:</p>
                <div class="hook-preview" id="selectedHookText"></div>
                <p>Obtén la versión PRO para desbloquear esta y otras funciones avanzadas.</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" id="cancelBtn">Cerrar</button>
                <button class="modal-btn modal-btn-primary" id="upgradeBtn">Actualizar a PRO</button>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/custom/hook.js') }}"></script>
</body>
</html>