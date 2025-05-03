document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentView = 'cards';
    let currentPage = 1;
    let searchQuery = '';
    let isLoading = false;

    // Elementos del DOM
    const contentContainer = document.getElementById('content-container');
    const cardViewBtn = document.getElementById('cardViewBtn');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const searchInput = document.getElementById('searchInput');
    const proModal = document.getElementById('proModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const upgradeBtn = document.getElementById('upgradeBtn');
    const selectedHookText = document.getElementById('selectedHookText');

    // 1. Primero definimos todas las funciones auxiliares
    function showLoading() {
        contentContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
            </div>
        `;
    }

    function renderError(message = 'Error al cargar los ganchos. Por favor, intente nuevamente.') {
        contentContainer.innerHTML = `
            <div class="empty-state">
                <p>${message}</p>
                <button onclick="loadHooks()">Reintentar</button>
            </div>
        `;
    }

    function renderContent(data) {
        if (data.hooks && data.hooks.length === 0) {
            contentContainer.innerHTML = `
                <div class="empty-state">
                    <p>No se encontraron ganchos</p>
                </div>
            `;
            return;
        }

        if (currentView === 'cards') {
            renderCardsView(data);
        } else {
            renderTableView(data);
        }

        setupPagination(data);
        setupIconEvents();
    }
    function renderCardsView(data) {
        let html = `
            <div class="hooks-grid" id="cardsView">
                ${data.hooks.map(hook => `
                    <div class="hook-card">
                        <p class="hook-text">${hook.gancho}</p>
                        <div class="icon-container">
                            <div class="copy-wrapper">
                                <span class="usage-count" id="clicks${hook.id}">usado ${hook.clicks} veces</span>
                                <div class="icon-wrapper copy-icon-wrapper" 
                                    data-hook="${hook.gancho}"
                                    data-id="${hook.id}"
                                    title="Copiar">
                                    <svg class="action-icon copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    </svg>
                                </div>
                            </div>
                            <div class="icon-wrapper adapt-icon-wrapper" 
                                data-hook="${hook.gancho}"
                                title="Adaptar con IA">
                                <svg class="action-icon adapt-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 18h6V6h-6"></path>
                                    <path d="M6 6v12"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        contentContainer.innerHTML = html;
    }
    function renderTableView(data) {
        let html = `
            <div id="tableView" class="table-view">
                <table class="hooks-table">
                    <thead>
                        <tr>
                            <th>Gancho</th>
                            <th>Clicks</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.hooks.map(hook => `
                            <tr>
                                <td class="table-hook-text">${hook.gancho}</td>
                                <td><span class="clicks-count" id="clicks${hook.id}" >Usado ${hook.clicks} veces</span></td>
                                <td>
                                    <div class="table-icon-container">
                                        <div class="icon-wrapper copy-icon-wrapper" 
                                            data-hook="${hook.gancho}"
                                            data-id="${hook.id}"
                                            title="Copiar">
                                            <svg class="action-icon copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                            </svg>
                                        </div>
                                        <div class="icon-wrapper adapt-icon-wrapper" 
                                            data-hook="${hook.gancho}"
                                            title="Adaptar con IA">
                                            <svg class="action-icon adapt-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M12 18h6V6h-6"></path>
                                                <path d="M6 6v12"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        
        contentContainer.innerHTML = html;
    }

    function setupPagination(data) {
        const paginationHtml = `
            <div class="pagination">
                ${data.prev_page_url ? `
                    <li class="page-item">
                        <a class="page-link" href="#" data-page="${data.current_page - 1}">Anterior</a>
                    </li>
                ` : `
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Anterior</a>
                    </li>
                `}
                
                ${Array.from({length: data.last_page}, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === data.current_page ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${page}">${page}</a>
                    </li>
                `).join('')}
                
                ${data.next_page_url ? `
                    <li class="page-item">
                        <a class="page-link" href="#" data-page="${data.current_page + 1}">Siguiente</a>
                    </li>
                ` : `
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Siguiente</a>
                    </li>
                `}
            </div>
        `;
        
        contentContainer.insertAdjacentHTML('beforeend', paginationHtml);
        
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (this.parentElement.classList.contains('disabled')) return;
                
                currentPage = parseInt(this.getAttribute('data-page'));
                loadHooks();
            });
        });
    }

    function updateClickCounters(hookId, newCount) {
        // Buscar todos los contadores para este hook
        document.querySelectorAll(`[data-id="${hookId}"] .usage-count, 
                                 [data-id="${hookId}"] .clicks-count`).forEach(counter => {
            const textParts = counter.textContent.trim().split(' ');
            const descriptor = textParts.length > 1 ? textParts.slice(1).join(' ') : 'veces';
            counter.textContent = `${newCount} ${descriptor}`;
            
            // Animación de feedback
            counter.classList.add('counter-updated');
            setTimeout(() => {
                counter.classList.remove('counter-updated');
            }, 200);
        });
        document.getElementById(`clicks${hookId}`).textContent = `Usado ${newCount} veces`;

    }

    function setupIconEvents() {
        document.querySelectorAll('.copy-icon-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const hookText = this.getAttribute('data-hook');
                const hookId = this.getAttribute('data-id');
                const icon = this.querySelector('svg');
                
                // Verifica si tenemos el token CSRF
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
                if (!csrfToken) {
                    console.error('CSRF token not found');
                    return;
                }
    
                navigator.clipboard.writeText(hookText).then(() => {
                    const originalHTML = icon.innerHTML;
                    icon.innerHTML = `
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    `;
                    
                 fetch(`/hooks/${hookId}/increment-clicks`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': csrfToken,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to increment clicks');
                        }
                        
                        return response.json();
                    }).then(data => {
                        console.log('Clicks incremented:', data.clicks);
                        updateClickCounters(hookId, data.clicks); // Usamos el valor del servidor
                    }).catch(error => {
                        console.error('Error incrementing clicks:', error);
                        icon.innerHTML = originalHTML;
                    });
                                        
                    setTimeout(() => {
                        if (icon.innerHTML.includes('M20 6L9 17l-5-5')) {
                            icon.innerHTML = originalHTML;
                        }
                    }, 2000);
                });
                
                // Función para actualizar todos los contadores relacionados
                // function updateClickCounters(hookId, newCount) {
                //     const counters = document.querySelectorAll(`
                //         [data-id="${hookId}"] .usage-count,
                //         [data-id="${hookId}"] .clicks-count,
                //         .hook-card[data-hook-id="${hookId}"] .usage-count,
                //         tr[data-hook-id="${hookId}"] .clicks-count
                //     `);
                    
                //     counters.forEach(counter => {
                //         // Preservamos el texto descriptivo (ej: "copias", "veces")
                //         const textParts = counter.textContent.trim().split(' ');
                //         const descriptor = textParts.length > 1 ? textParts.slice(1).join(' ') : 'copias';
                        
                //         // Actualizamos el contador
                //         counter.textContent = `${newCount} ${descriptor}`;
                        
                //         // Añadimos animación de actualización
                //         counter.style.transform = 'scale(1.1)';
                //         setTimeout(() => {
                //             counter.style.transform = 'scale(1)';
                //         }, 200);
                //     });
                // }
            });
        });
        
        document.querySelectorAll('.adapt-icon-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                const hookText = this.getAttribute('data-hook');
                selectedHookText.textContent = hookText;
                proModal.classList.add('active');
            });
        });
    }

    function upgradeToPro() {
        alert('Redirigiendo a la página de actualización...');
        proModal.classList.remove('active');
    }

    // 2. Luego definimos la función principal loadHooks
    async function loadHooks() {
        if (isLoading) return;
        
        isLoading = true;
        showLoading();
        
        try {
            const apiUrl = '/api/hooks';
            const url = new URL(apiUrl, window.location.origin);
            url.searchParams.append('page', currentPage);
            url.searchParams.append('view', currentView);
            if (searchQuery) {
                url.searchParams.append('search', searchQuery);
            }

            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                console.log('Hooks clickado:', data.hooks);
                renderContent(data);
            } else {
                throw new Error(data.message || 'Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error loading hooks:', error);
            renderError(error.message);
        } finally {
            isLoading = false;
        }
    }

    // 3. Finalmente inicializamos la aplicación
    loadHooks();

    // Event listeners
    cardViewBtn.addEventListener('click', () => {
        currentView = 'cards';
        cardViewBtn.classList.add('active');
        tableViewBtn.classList.remove('active');
        loadHooks();
    });

    tableViewBtn.addEventListener('click', () => {
        currentView = 'table';
        tableViewBtn.classList.add('active');
        cardViewBtn.classList.remove('active');
        loadHooks();
    });

    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = searchInput.value.trim();
            currentPage = 1;
            loadHooks();
        }, 500);
    });

    closeModal.addEventListener('click', () => proModal.classList.remove('active'));
    cancelBtn.addEventListener('click', () => proModal.classList.remove('active'));
    upgradeBtn.addEventListener('click', upgradeToPro);
});