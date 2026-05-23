/* ==========================================
   VALIDAR TELEFONE
========================================== */
function validarTelefone(telefone){

  const numero =

    String(telefone || '')
      .replace(/\D/g,'');

  return (
    numero.length >= 10
  );

}


/* ==========================================
   VALIDAR CLIENTE
========================================== */
function validarCliente(nome){

  return (
    String(nome || '')
      .trim()
      .length >= 3
  );

}


/* ==========================================
   VALIDAR DATA
========================================== */
function validarData(data){

  if(!data){

    return false;

  }

  return !isNaN(
    new Date(data)
  );

}


/* ==========================================
   VALIDAR HORÁRIO
========================================== */
function validarHorario(horario){

  if(!horario){

    return true;
  }

  const regex =
    /^([01]\d|2[0-3]):([0-5]\d)$/;

  return regex.test(horario);

}


/* ==========================================
   VALIDAR EVENTO
========================================== */
function validarEvento(dados){

  if(
    !validarData(
      dados.data
    )
  ){

    mostrarToast(
      'Selecione uma data',
      'erro'
    );

    return false;

  }

  if(
    !validarCliente(
      dados.cliente
    )
  ){

    mostrarToast(
      'Informe o cliente',
      'erro'
    );

    return false;

  }

  if(
    !validarTelefone(
      dados.telefone
    )
  ){

    mostrarToast(
      'Informe um telefone válido',
      'erro'
    );

    return false;

  }

  if(
    dados.horario
    &&
    !validarHorario(
      dados.horario
    )
  ){

    mostrarToast(
      'Horário inválido',
      'erro'
    );

    return false;

  }

  return true;

}