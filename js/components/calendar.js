function renderizarCalendario(eventos){

  const calendarEl =
    document.getElementById('calendar');

  calendarEl.innerHTML = '';

  const calendar =
    new FullCalendar.Calendar(
      calendarEl,
      {

        initialView:'dayGridMonth',

        locale:'pt-br',

        height:'auto',

        events: eventos.map(evento => ({

          id:evento.ID,

          title:
          `${evento.CLIENTE} • R$ ${evento.RESTANTE}`,

          start:evento.DATA,

        color:
          evento.STATUS === 'Pago'
            ? '#27ae60'

            : evento.STATUS === 'Cancelado'
            ? '#e74c3c'

            : '#f39c12',

          extendedProps:{
            ...evento
          }

        })),

        eventClick:function(info){

          editarEvento(
            info.event.id
          );

        },

        dateClick:function(info){

          abrirModal();

          document
            .getElementById('data')
            .value = info.dateStr;

        }

      }
    );

  calendar.render();
}