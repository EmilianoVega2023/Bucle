# Nombre de tu Proyecto (¡Ponle un nombre genial!) 🚀

Una breve descripción atractiva de tu proyecto. ¿De qué se trata? ¿Cuál es su propósito? ✨

## Estado del Proyecto 🚦

Este proyecto se encuentra en [Indica el estado actual: En desarrollo, Beta, Estable, etc.].

## Roadmap de Desarrollo 🗺️

Aquí puedes visualizar las fases de tu proyecto de una manera más clara:

### Fase 1 – MVP (1 semana) ✅

* ✅ **Formulario de reserva funcional (frontend)**
* ✅ **Backend Express**
* ✅ **Guardado en SQLite**
* 🚧 **Vista de administrador**
* 🛠️ **Corrección de fetch + submit**
* ⏳ **Mostrar reservas**

### Fase 2 – Admin & Validación (2–3 días) ⏳

* 🔒 **Agregar login básico para `/admin`**
* ✔️ **Validación de campos**
* 💬 **Feedback visual al usuario**

### Fase 3 – Pagos & Extras (1 semana) ⏳

* 💰 **Implementar Mercado Pago**
* 💬 **Opción de enviar reserva a WhatsApp**
* 📊 **Exportar reservas a Excel/CSV**

### Fase 4 – Estética & Deploy (3–5 días) ⏳

* 🎨 **Mejorar UI/UX**
* ☁️ **Deploy (Render + Netlify o Vercel)**

**Leyenda de Emojis:**

* ✅: Tarea completada
* 🚧: Código en IA (en progreso con ayuda de IA)
* 🛠️: En corrección o refactorización
* ⏳: Pendiente o en desarrollo
* 🔒: Seguridad
* ✔️: Validación
* 💬: Interacción con el usuario
* 💰: Pagos
* 📊: Datos/Reportes
* 🎨: Diseño/Interfaz
* ☁️: Despliegue

## Estructura del Proyecto 📂

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




## To-Do List para una MVP Funcional 📝

Esta sección la puedes presentar como una lista de verificación más visual:

* ✅ Frontend simple con formulario de reservas.
* ✅ Backend con API REST (`/api/reservations`).
* ✅ Base de datos funcional (SQLite).
* ✔️ Mover `fetch()` dentro del `submit` y usar la URL correcta (`localhost:3000`).
* ✔️ Mostrar reservas en el frontend o tener una ruta GET para comprobar que se guardan.
* ✔️ Modularizar (routes, db, etc.).
* ✅ Evitar que la base se cree cada vez.
* ⚠️ Agregar CORS si se usan puertos diferentes.
* ⚠️ Validar bien el campo `people` (capturarlo del form).
* ⚙️ Preparar para deploy (Netlify + Render por ejemplo).
* 💳 Agregar pasarela de pagos (Mercado Pago, Stripe, etc).

**Leyenda de Emojis:**

* ✅: Hecho
* ✔️: Tarea a realizar/mejorar
* ⚠️: Importante/A tener en cuenta
* ⚙️: Configuración/Preparación
* 💳: Funcionalidad específica

## Próximos Pasos 🚀

listar de forma concisa las siguientes acciones o funcionalidades en las que trabajarás.

## Contribuciones 🤝
