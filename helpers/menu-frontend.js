
const getMenuFrontEnd = ( role ) => {
    const menu = 
    [
        {
          title: 'Principal',
          submenu: [
            { title: 'Dashboard', url: '/app', icon: 'speedometer-outline' },
            { title: 'ProgressBar', url: '/app/progress', icon: 'battery-half-outline'},
            { title: 'Gráficos', url: '/app/graficos', icon: 'stats-chart-outline' },
            { title: 'Promesas', url: '/app/promesas', icon: 'pulse-outline'},
            { title: 'Rxjs', url: '/app/rxjs', icon: 'shapes-outline' }
          ]
        },
        {
          title: 'Mantenimiento',
          submenu: [
            // { title: 'Usuarios', url: '/app/usuarios' },
            { title: 'Hospitales', url: '/app/hospitales', icon: 'business-outline' },
            { title: 'Médicos', url: '/app/medicos', icon: 'thermometer-outline' }
          ]
        }
      ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: '/app/usuarios', icon: 'people-circle-outline' });
    }
    
    return menu;

}

module.exports = {
    getMenuFrontEnd
}