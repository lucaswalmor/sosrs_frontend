export function authMiddleware(to, from, next) {
    const usuarioAutenticado = localStorage.getItem('usuario') !== null;
    
    if (!usuarioAutenticado && to.path !== '/') {
        next('/login');
    } else {
        next();
    }
}