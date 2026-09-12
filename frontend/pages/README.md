# pages (Next.js)

Эта папка нужна только для того, чтобы Next.js не воспринимал `src/pages`
(слой Pages из Feature-Sliced Design) как Pages Router.

Проект использует App Router — маршруты лежат в корневой папке `app/`.
FSD-страницы находятся в `src/pages` и импортируются оттуда в `app/`.
