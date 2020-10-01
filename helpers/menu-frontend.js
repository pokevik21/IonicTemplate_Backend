
const getMenuFrontEnd = ( role ) => {
    const menu = 
    [
        {
          titulo: 'Principal',
          icon: 'mdi mdi-gauge',
          submenus: [
            { titulo: 'Dashboard', url: '/dashboard' },
            { titulo: 'ProgressBar', url: '/dashboard/progress' },
            { titulo: 'Gráficas', url: '/dashboard/grafica1' },
            { titulo: 'Promesas', url: '/dashboard/promesas' },
            { titulo: 'Rxjs', url: '/dashboard/rxjs' }
          ]
        },
        {
          titulo: 'Mantenimiento',
          icon: 'mdi mdi-folder-lock-open',
          submenus: [
            // { titulo: 'Usuarios', url: '/dashboard/usuarios' },
            { titulo: 'Hospitales', url: '/dashboard/hospitales' },
            { titulo: 'Médicos', url: '/dashboard/medicos' }
          ]
        }
      ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenus.unshift({ titulo: 'Usuarios', url: '/dashboard/usuarios' });
    }
    
    return menu;

}

module.exports = {
    getMenuFrontEnd
}