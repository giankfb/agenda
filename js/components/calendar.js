let calendar = null;

/* ============================================*/
function renderizarCalendario(eventos){

  const calendarEl =
    document.getElementById('calendar');

  if(!calendarEl) return;

  /* ==========================================
     destrói calendário antigo
  ========================================== */
  if(calendar){

    calendar.destroy();

  }

  /* ==========================================
     cria calendário
  ========================================== */
  calendar =
    new FullCalendar.Calendar(
      calendarEl,
      {

        initialView:'dayGridMonth',

        locale:'pt-br',

        height:'auto',

        fixedWeekCount:false,

        dayMaxEvents:true,

        selectable:true,

        headerToolbar:{

          left:'prev,next today',

          center:'title',

          right:''
        },

        buttonText:{

          today:'Hoje'
        },

        events: eventos.map(evento => ({

          id:evento.ID,

          title:
            `${evento.CLIENTE} • ${formatarMoeda(evento.RESTANTE)}`,

          start:
            evento.DATA?.split('T')[0],

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

        /* ======================================
           clique no evento
        ====================================== */
        eventClick:function(info){

          editarEvento(
            info.event.id
          );

        },

        /* ======================================
           clique na data
        ====================================== */
        dateClick:function(info){

          limparFormulario();

          abrirModal();

          document
            .getElementById('data')
            .value = info.dateStr;

        }

      }
    );

  calendar.render();

}