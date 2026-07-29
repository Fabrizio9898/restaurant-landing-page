---
name: product-context
description: Comprender la visión del producto, reglas de negocio, flujo del usuario y arquitectura antes de diseñar o implementar nuevas funcionalidades.
---

# Product Context

## Cuándo usar este Skill

Usar este skill cuando:

- Se diseñe una nueva feature.
- Se modifique una pantalla.
- Se creen componentes UI.
- Se proponga una mejora UX.
- Se tome una decisión de arquitectura del frontend.
- Existan dudas sobre el flujo del usuario.

Este documento describe el negocio. No explica cómo programar.

---

# Visión del producto

Este proyecto NO es la página web tradicional de un restaurante.

El objetivo es construir una plataforma de reservas inteligentes donde el usuario puede reservar una mesa y, opcionalmente, seleccionar sus platos antes de asistir.

El producto busca optimizar tanto la experiencia del cliente como la operación del restaurante.

---

# Problema que resuelve

Los restaurantes suelen tener problemas como:

- tiempos de espera largos;
- incertidumbre sobre la cantidad de clientes;
- cocina sin previsión;
- desperdicio;
- mala organización.

Este sistema intenta resolver esos problemas mediante reservas con pago anticipado y selección opcional del menú.

---

# Objetivos

Los objetivos principales son:

- aumentar reservas;
- reducir tiempos de espera;
- mejorar la organización de cocina;
- incentivar la compra anticipada;
- simplificar la experiencia del cliente.

---

# Flujo del usuario

Landing

↓

Descubre el restaurante.

↓

Conoce la propuesta.

↓

Ve algunos platos destacados.

↓

Explora el menú completo si quiere.

↓

Reserva una mesa.

↓

Puede elegir sus platos.

↓

Obtiene un beneficio por hacerlo.

↓

Paga.

↓

Recibe confirmación.

↓

Asiste al restaurante.

↓

La cocina ya conoce su pedido.

---

# Arquitectura del sitio

## Landing

Objetivo:

Convertir visitantes en reservas.

Debe incluir:

- Hero
- Video/Presentation
- Discover (gallery)
- Vista previa del menú
- Info
- CTA

Nunca mostrar el menú completo aquí.

---

## Menú

Página dedicada exclusivamente a explorar todos los platos.

No representa el flujo principal.

Su objetivo es generar confianza.

---

## Reservas

Es el corazón del sistema.

Debe permitir:

- elegir fecha;
- elegir horario;
- elegir cantidad de personas;
- seleccionar platos (opcional);
- aplicar descuentos;
- pagar;
- confirmar.

---

# Filosofía del menú

El menú no es un catálogo.

Es una herramienta para incentivar reservas.

La Landing solamente muestra una vista previa.

Nunca convertir la Landing en una carta completa.

---

# Filosofía del diseño

Cada sección debe responder una pregunta del usuario.

Hero
→ ¿Por qué debería venir?

Beneficios
→ ¿Qué gano?

Cómo funciona
→ ¿Es fácil?

Menú
→ ¿Qué puedo comer?

Reserva
→ ¿Cómo empiezo?

---

# Componentes

Los componentes deben ser:

- reutilizables;
- desacoplados;
- preparados para consumir una API;
- fáciles de extender.

Evitar componentes diseñados únicamente para datos hardcodeados.

---

# Estado actual

Actualmente:

- el backend no está conectado;
- muchos datos son estáticos;
- el objetivo es construir un frontend sólido y preparado para el futuro.

Las decisiones de diseño deben asumir que luego existirán APIs reales.

---

# Modelo mental

Pensar siempre en el siguiente flujo:

Usuario

↓

Landing

↓

Explora

↓

Reserva

↓

Selecciona platos

↓

Paga

↓

Restaurante recibe la reserva

↓

Cocina prepara

↓

Cliente llega

---

# Qué NO hacer

No diseñar el sitio como una web corporativa.

No tratar el menú como una simple lista de productos.

No asumir que el objetivo principal es mostrar comida.

No crear componentes difíciles de reutilizar.

No acoplar la UI a datos estáticos.

---

# Al diseñar cualquier feature preguntarse

- ¿Ayuda a que el usuario reserve?
- ¿Respeta el flujo del producto?
- ¿Está preparada para integrarse con el backend?
- ¿Puede reutilizarse?
- ¿Escala cuando existan cientos de platos y reservas?


# Cómo quiero que pienses

Antes de escribir código:

1. Comprende el objetivo del negocio.
2. Comprende el objetivo de la pantalla.
3. Piensa si el componente será reutilizable.
4. Piensa cómo funcionará cuando exista un backend real.
5. Si una decisión de UX contradice la visión del producto, prioriza la visión del producto.
6. Explica siempre por qué propones un cambio, no solo cómo implementarlo.
7. Si detectas una inconsistencia en el flujo o en las reglas de negocio, señálala antes de implementar.

