// Google Analytics Debug Script
// Скопируйте и вставьте в консоль браузера для полной диагностики GA

(function debugGA() {
  console.log('🔍 Google Analytics Diagnostic Report');
  console.log('=====================================\n');

  // 1. Проверка основных объектов
  console.group('📦 1. Основные объекты GA');
  
  const hasGtag = typeof window.gtag !== 'undefined';
  const hasDataLayer = typeof window.dataLayer !== 'undefined';
  const hasGoogleAnalytics = typeof window.ga !== 'undefined';
  
  console.log(`✅ window.gtag: ${hasGtag ? '✓ Загружен' : '✗ НЕ найден'}`);
  console.log(`✅ window.dataLayer: ${hasDataLayer ? '✓ Существует' : '✗ НЕ найден'}`);
  console.log(`✅ window.ga (Universal Analytics): ${hasGoogleAnalytics ? '✓ Найден (старая версия)' : '✗ Не используется'}`);
  
  if (hasDataLayer) {
    console.log(`📊 DataLayer записей: ${window.dataLayer.length}`);
    console.log('Последние 3 события:', window.dataLayer.slice(-3));
  }
  console.groupEnd();

  // 2. Проверка загруженных скриптов
  console.group('📜 2. Загруженные GA скрипты');
  
  const partytownScripts = document.querySelectorAll('script[type="text/partytown"]');
  const gaScripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="google-analytics"]');
  const gtagScripts = document.querySelectorAll('script[src*="gtag"]');
  
  console.log(`🎭 Partytown скриптов: ${partytownScripts.length}`);
  if (partytownScripts.length > 0) {
    console.log('Partytown GA режим: ✓ АКТИВЕН (Web Workers)');
    partytownScripts.forEach((script, i) => {
      console.log(`  ${i + 1}. ${script.src || '[inline script]'}`);
    });
  }
  
  console.log(`📝 Native GA скриптов: ${gaScripts.length + gtagScripts.length}`);
  if (gaScripts.length + gtagScripts.length > 0) {
    console.log('Native GA режим: ✓ АКТИВЕН (Main Thread)');
    [...gaScripts, ...gtagScripts].forEach((script, i) => {
      console.log(`  ${i + 1}. ${script.src}`);
    });
  }
  console.groupEnd();

  // 3. Проверка Partytown
  console.group('🎯 3. Partytown статус');
  
  const partytownLib = document.querySelector('iframe[src*="partytown"]');
  const partytownWorker = !!window._ptf || !!window.partytown;
  
  console.log(`📁 Partytown библиотека: ${partytownLib ? '✓ Загружена' : '✗ Не найдена'}`);
  console.log(`👷 Partytown worker: ${partytownWorker ? '✓ Активен' : '✗ Не активен'}`);
  
  // Проверка файлов Partytown
  fetch('/~partytown/partytown.js')
    .then(r => console.log(`📄 /~partytown/partytown.js: ${r.ok ? '✓ Доступен' : '✗ 404'}`))
    .catch(() => console.log('📄 /~partytown/partytown.js: ✗ Ошибка загрузки'));
  
  console.groupEnd();

  // 4. Конфигурация GA
  console.group('⚙️ 4. Конфигурация GA');
  
  if (hasDataLayer) {
    const configEvents = window.dataLayer.filter(item => 
      item[0] === 'config' || (item.event === 'gtm.js')
    );
    
    if (configEvents.length > 0) {
      console.log('Найдены config события:');
      configEvents.forEach(event => console.log(event));
      
      // Извлечение GA ID
      const gaId = window.dataLayer.find(item => 
        typeof item[1] === 'string' && item[1].match(/^G-|^UA-|^AW-/)
      );
      if (gaId) {
        console.log(`🆔 Google Analytics ID: ${gaId[1]}`);
      }
    }
  }
  console.groupEnd();

  // 5. Сетевые запросы
  console.group('🌐 5. Проверка сетевых запросов');
  console.log('Для просмотра запросов к GA:');
  console.log('1. Откройте Network tab');
  console.log('2. Фильтр: "collect" или "google-analytics"');
  console.log('3. Обновите страницу');
  console.log('4. Ищите запросы к:');
  console.log('   - google-analytics.com/g/collect (GA4)');
  console.log('   - google-analytics.com/collect (Universal Analytics)');
  console.groupEnd();

  // 6. Отправка тестового события
  console.group('🧪 6. Тестовое событие');
  
  if (hasGtag) {
    try {
      const testEventName = `test_debug_${Date.now()}`;
      window.gtag('event', testEventName, {
        event_category: 'Debug Test',
        event_label: 'Console Debug',
        debug_mode: true
      });
      console.log(`✓ Отправлено тестовое событие: "${testEventName}"`);
      console.log('Проверьте Network tab для запроса к /g/collect');
      console.log('Или Realtime отчеты в Google Analytics');
    } catch (error) {
      console.error('✗ Ошибка отправки события:', error);
    }
  } else {
    console.warn('✗ gtag не загружен - невозможно отправить тестовое событие');
  }
  console.groupEnd();

  // 7. Режим работы
  console.group('🎮 7. Режим работы GA');
  
  const envMode = localStorage.getItem('ga-mode') || 'не установлен';
  const isPartytown = partytownScripts.length > 0;
  const isNative = gaScripts.length > 0 || gtagScripts.length > 0;
  
  if (isPartytown && !isNative) {
    console.log('🚀 Режим: PARTYTOWN (Web Workers)');
    console.log('Преимущества: Не блокирует main thread, лучше производительность');
  } else if (isNative && !isPartytown) {
    console.log('📊 Режим: NATIVE (Main Thread)');
    console.log('Преимущества: Проще отладка, стандартная интеграция');
  } else if (isPartytown && isNative) {
    console.warn('⚠️ Обнаружены ОБА режима - возможен конфликт!');
  } else {
    console.warn('❌ GA не обнаружен - проверьте настройки');
  }
  
  console.groupEnd();

  // 8. Рекомендации
  console.group('💡 8. Рекомендации');
  
  if (!hasGtag && !hasDataLayer) {
    console.log('1. Проверьте NEXT_PUBLIC_GA_TRACKING_ID в .env.local');
    console.log('2. Убедитесь что DeferredScripts подключен в layout.tsx');
    console.log('3. Подождите 3 секунды или взаимодействуйте со страницей для загрузки GA');
  }
  
  if (hasGtag && !hasDataLayer) {
    console.log('⚠️ gtag загружен, но dataLayer пустой - возможно GA еще инициализируется');
  }
  
  if (partytownScripts.length === 0 && isNative) {
    console.log('💡 Для улучшения производительности установите NEXT_PUBLIC_GA_MODE=partytown');
  }
  
  console.groupEnd();

  console.log('\n=====================================');
  console.log('📋 Диагностика завершена!');
  
  // Возвращаем объект с результатами
  return {
    hasGtag,
    hasDataLayer,
    dataLayerSize: hasDataLayer ? window.dataLayer.length : 0,
    mode: isPartytown ? 'partytown' : isNative ? 'native' : 'not-loaded',
    partytownScripts: partytownScripts.length,
    nativeScripts: gaScripts.length + gtagScripts.length
  };
})();