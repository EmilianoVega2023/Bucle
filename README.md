Fase 1 – MVP (1 semana)
 Formulario de reserva funcional (frontend) HECHO

 Backend Express HECHO

 Guardado en SQLite  HECHO

 Vista de administrador  CODIGO EN IA

 Corrección de fetch + submit

 Mostrar reservas

Fase 2 – Admin & Validación (2–3 días)
 Agregar login básico para /admin

 Validación de campos

 Feedback visual al usuario

Fase 3 – Pagos & Extras (1 semana)
 Implementar Mercado Pago

 Opción de enviar reserva a WhatsApp

 Exportar reservas a Excel/CSV

Fase 4 – Estética & Deploy (3–5 días)
 Mejorar UI/UX

 Deploy (Render + Netlify o Vercel)

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

/backend
  ├── db/
  │     └── sqlite.js
  ├── routes/
  │     └── reservations.js
  ├── server.js
/frontend
  ├── index.html
  ├── main.js
  └── styles.css



To-Do List para tener una MVP funcional
 Frontend simple con formulario de reservas.  HECHO

 Backend con API REST (/api/reservations).  HECHO

 Base de datos funcional (SQLite).  HECHO

 Mover fetch() dentro del submit y usar la URL correcta (localhost:3000). 

 Mostrar reservas en el frontend o tener una ruta GET para comprobar que se guardan.

 Modularizar (routes, db, etc.).

 Evitar que la base se cree cada vez (ya lo hacés bien).

 Agregar CORS si se usan puertos diferentes.

 Validar bien el campo people (lo estás validando, pero no lo capturás del form).

 Preparar para deploy (Netlify + Render por ejemplo).

 Agregar pasarela de pagos (Mercado Pago, Stripe, etc).
