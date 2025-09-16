# Тестирование Google Analytics

## 1. Проверка в консоли браузера

Откройте консоль (F12) и введите:

```javascript
// Проверить что gtag загружен
window.gtag
// Должно вернуть: ƒ gtag(){dataLayer.push(arguments)}

// Проверить dataLayer
window.dataLayer
// Должно вернуть массив с событиями

// Отправить тестовое событие
gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Manual Test'
});
```

## 2. Network Tab в DevTools

1. Откройте DevTools → Network
2. Фильтр: "collect" или "gtag"
3. Обновите страницу
4. Должны увидеть запросы к:
   - `googletagmanager.com/gtag/js` (загрузка скрипта)
   - `google-analytics.com/g/collect` (отправка данных)

## 3. Google Tag Assistant (расширение Chrome)

1. Установите: https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk
2. Нажмите на иконку расширения
3. Включите запись
4. Обновите страницу
5. Увидите все теги GA и их статус

## 4. Realtime отчеты в Google Analytics

1. Откройте Google Analytics
2. Перейдите в Reports → Realtime
3. Откройте ваш сайт в другой вкладке
4. Должны увидеть себя как активного пользователя

## 5. Проверка режима Partytown vs Native

### Для Partytown режима:
```javascript
// В консоли должно быть:
// 🔧 GA Mode: partytown
// 🚀 Google Analytics: Partytown mode (web workers)

// Проверить что скрипты загружены через Partytown
document.querySelectorAll('script[type="text/partytown"]')
// Должно вернуть NodeList с GA скриптами
```

### Для Native режима:
```javascript
// В консоли должно быть:
// 🔧 GA Mode: native
// 🚀 Google Analytics: Native mode (main thread loading)

// Проверить обычные скрипты
document.querySelectorAll('script[src*="googletagmanager"]')
// Должно вернуть обычные script теги
```

## 6. Отладка если не работает

### Проверить ENV переменные:
```bash
# Должен быть настроен tracking ID
echo $NEXT_PUBLIC_GA_TRACKING_ID
```

### Проверить ошибки в консоли:
- CSP блокировки
- CORS ошибки
- 404 на скрипты

### Для Partytown проверить что файлы на месте:
```bash
ls -la public/~partytown/
# Должны быть partytown.js, partytown-sw.js и др.
```

## 7. Тестовые события для проверки

```javascript
// Клик
gtag('event', 'click', {
  event_category: 'UI',
  event_label: 'Header'
});

// Просмотр страницы
gtag('event', 'page_view', {
  page_title: 'Test Page',
  page_location: window.location.href,
  page_path: window.location.pathname
});

// Конверсия
gtag('event', 'conversion', {
  send_to: 'G-XXXXXXXX/XXXXXX',
  value: 1.0,
  currency: 'USD'
});
```

После отправки проверьте в Network tab что запрос к `/g/collect` прошел со статусом 204.