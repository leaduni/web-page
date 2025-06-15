// src/services/contactService.js
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdfTXt052m0uOtkCBAq7_gHreRIaKO-0yj_clpepBnJqDlD7g/formResponse';

export const handleSubmit = async e => {
  e.preventDefault();
  const f = e.target;

  const data = new FormData();
  data.append('entry.1016835073', f.email.value); // Correo
  data.append('entry.510618895', f.nombre.value); // Nombre
  data.append('entry.359016584', f.asunto.value); // Asunto
  data.append('entry.859564087', f.mensaje.value); // Mensaje

  try {
    await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: data });
    alert('✅ Mensaje enviado con éxito');
    f.reset();
  } catch {
    alert('❌ No se pudo enviar; inténtalo de nuevo');
  }
};
