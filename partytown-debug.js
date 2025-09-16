// Partytown Debug Script
// Скопируйте и вставьте в консоль браузера для полной диагностики Partytown

(function debugPartytown() {
  console.log('🎭 Partytown Diagnostic Report');
  console.log('=====================================\n');

  // 1. Проверка основных компонентов Partytown
  console.group('📦 1. Partytown Core');
  
  const hasPartytown = typeof window.partytown !== 'undefined';
  const hasPartytownForward = typeof window._ptf !== 'undefined';
  const partytownConfig = window.partytown || {};
  
  console.log(`✅ window.partytown: ${hasPartytown ? '✓ Найден' : '✗ НЕ найден'}`);
  console.log(`✅ window._ptf (forwards): ${hasPartytownForward ? '✓ Активен' : '✗ НЕ найден'}`);
  
  if (hasPartytown) {
    console.log('📋 Конфигурация Partytown:', partytownConfig);
    if (partytownConfig.forward) {
      console.log('📡 Forwarded APIs:', partytownConfig.forward);
    }
    if (partytownConfig.debug) {
      console.log('🐛 Debug mode: ✓ ВКЛЮЧЕН');
    }
  }
  
  console.groupEnd();

  // 2. Проверка загруженных скриптов
  console.group('📜 2. Partytown скрипты');
  
  const partytownScripts = document.querySelectorAll('script[type="text/partytown"]');
  const partytownSandbox = document.querySelector('iframe[src*="partytown-sandbox"]');
  const partytownLib = document.querySelector('script[src*="partytown.js"]');
  
  console.log(`🎯 Скриптов с type="text/partytown": ${partytownScripts.length}`);
  
  if (partytownScripts.length > 0) {
    console.log('Скрипты в Web Worker:');
    partytownScripts.forEach((script, i) => {
      const src = script.src || '[inline]';
      const id = script.id || '[no-id]';
      console.log(`  ${i + 1}. ${src} (id: ${id})`);
      
      // Проверка атрибутов
      if (script.dataset.ptid) {
        console.log(`     └─ ptid: ${script.dataset.ptid} ✓`);
      }
      if (script.dataset.pterror) {
        console.error(`     └─ ERROR: ${script.dataset.pterror} ✗`);
      }
    });
  }
  
  console.log(`🏗️ Sandbox iframe: ${partytownSandbox ? '✓ Загружен' : '✗ Не найден'}`);
  if (partytownSandbox) {
    console.log(`   └─ ${partytownSandbox.src}`);
  }
  
  console.log(`📚 Partytown lib: ${partytownLib ? '✓ Загружен' : '✗ Не найден'}`);
  
  console.groupEnd();

  // 3. Проверка Web Worker
  console.group('👷 3. Web Worker статус');
  
  // Проверка через performance API
  const workerEntries = performance.getEntriesByType('resource').filter(
    entry => entry.name.includes('partytown-ww') || entry.name.includes('partytown-atomics')
  );
  
  if (workerEntries.length > 0) {
    console.log('✓ Web Worker файлы загружены:');
    workerEntries.forEach(entry => {
      const loadTime = Math.round(entry.duration);
      console.log(`  - ${entry.name.split('/').pop()}: ${loadTime}ms`);
    });
  } else {
    console.log('⚠️ Web Worker файлы не обнаружены');
  }
  
  // Проверка SharedArrayBuffer (для Atomics mode)
  const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
  const hasCrossOriginIsolation = self.crossOriginIsolated === true;
  
  console.log(`🔧 SharedArrayBuffer: ${hasSharedArrayBuffer ? '✓ Доступен' : '✗ Недоступен'}`);
  console.log(`🔒 Cross-Origin Isolation: ${hasCrossOriginIsolation ? '✓ Включен' : '✗ Выключен'}`);
  
  if (hasSharedArrayBuffer && hasCrossOriginIsolation) {
    console.log('   └─ Partytown работает в Atomics mode (максимальная производительность)');
  } else {
    console.log('   └─ Partytown работает в Service Worker mode (fallback)');
  }
  
  console.groupEnd();

  // 4. Проверка файловой структуры
  console.group('📁 4. Файловая структура');
  
  const filesToCheck = [
    '/~partytown/partytown.js',
    '/~partytown/partytown-sw.js',
    '/~partytown/partytown-atomics.js',
    '/~partytown/partytown-media.js',
    '/~partytown/debug/partytown.js'  // Debug версия
  ];
  
  console.log('Проверка доступности файлов:');
  
  filesToCheck.forEach(file => {
    fetch(file, { method: 'HEAD' })
      .then(response => {
        const status = response.ok ? '✓' : '✗';
        const size = response.headers.get('content-length');
        const sizeStr = size ? ` (${Math.round(size/1024)}KB)` : '';
        console.log(`  ${status} ${file}${sizeStr}`);
      })
      .catch(() => console.log(`  ✗ ${file} - недоступен`));
  });
  
  console.groupEnd();

  // 5. Проверка forwarded events
  console.group('📡 5. Forwarded Events');
  
  if (window._ptf) {
    console.log('✓ Forward queue активна');
    console.log(`📊 Событий в очереди: ${window._ptf.length / 2}`);
    
    if (window._ptf.length > 0) {
      console.log('Последние 3 forwarded вызова:');
      for (let i = Math.max(0, window._ptf.length - 6); i < window._ptf.length; i += 2) {
        console.log(`  - ${window._ptf[i]}`);
      }
    }
  } else {
    console.log('⚠️ Forward queue не найдена');
  }
  
  // Проверка конкретных forward настроек
  if (partytownConfig.forward) {
    console.log('\n🎯 Настроенные forwards:');
    partytownConfig.forward.forEach(fw => {
      const isFunction = typeof window[fw.split('.')[0]] === 'function';
      console.log(`  - ${fw}: ${isFunction ? '✓ Доступен' : '⚠️ Проверьте'}`);
    });
  }
  
  console.groupEnd();

  // 6. Производительность
  console.group('⚡ 6. Влияние на производительность');
  
  // Проверка main thread блокировки
  const longTasks = performance.getEntriesByType('longtask');
  const partytownTasks = longTasks.filter(task => 
    task.attribution && task.attribution[0] && 
    task.attribution[0].name && 
    task.attribution[0].name.includes('partytown')
  );
  
  console.log(`📊 Long tasks (>50ms): ${longTasks.length} всего`);
  console.log(`🎭 Partytown long tasks: ${partytownTasks.length}`);
  
  if (partytownTasks.length === 0) {
    console.log('✅ Partytown не создает long tasks - main thread свободен!');
  } else {
    console.warn('⚠️ Обнаружены long tasks от Partytown:');
    partytownTasks.forEach(task => {
      console.log(`   - ${Math.round(task.duration)}ms`);
    });
  }
  
  console.groupEnd();

  // 7. Тестирование
  console.group('🧪 7. Тест Partytown');
  
  if (hasPartytown && window.gtag) {
    console.log('Отправка тестового события через Partytown...');
    
    // Добавляем слушатель для проверки
    const originalPush = window.dataLayer.push;
    let testReceived = false;
    
    window.dataLayer.push = function(...args) {
      if (args[0] && args[0][1] && args[0][1] === 'partytown_test') {
        testReceived = true;
        console.log('✅ Тестовое событие получено в dataLayer!');
      }
      return originalPush.apply(this, args);
    };
    
    // Отправляем тестовое событие
    window.gtag('event', 'partytown_test', {
      test: true,
      timestamp: Date.now()
    });
    
    // Проверяем через 100ms
    setTimeout(() => {
      window.dataLayer.push = originalPush;
      if (!testReceived) {
        console.warn('⚠️ Тестовое событие не прошло через dataLayer');
      }
    }, 100);
    
  } else {
    console.log('⚠️ Partytown или gtag не загружены для тестирования');
  }
  
  console.groupEnd();

  // 8. Режим Debug
  console.group('🐛 8. Debug информация');
  
  const isDebugMode = partytownConfig.debug === true || 
                       (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development');
  
  console.log(`Debug mode: ${isDebugMode ? '✓ ВКЛЮЧЕН' : '✗ Выключен'}`);
  
  if (isDebugMode) {
    console.log('💡 В debug режиме:');
    console.log('  - Используются неминифицированные файлы из /~partytown/debug/');
    console.log('  - Доступны подробные сообщения об ошибках');
    console.log('  - Включено логирование в консоль');
  } else {
    console.log('💡 В production режиме:');
    console.log('  - Используются минифицированные файлы');
    console.log('  - Оптимальная производительность');
  }
  
  console.groupEnd();

  // 9. Рекомендации
  console.group('💡 9. Рекомендации');
  
  if (!hasPartytown) {
    console.log('1. Убедитесь что Partytown установлен: npm install @qwik.dev/partytown');
    console.log('2. Проверьте что скрипты скопированы: npm run partytown');
    console.log('3. Проверьте подключение в компоненте GoogleAnalyticsPartytown');
  }
  
  if (hasPartytown && partytownScripts.length === 0) {
    console.log('⚠️ Partytown загружен, но нет скриптов с type="text/partytown"');
    console.log('Проверьте что GA скрипты имеют правильный type атрибут');
  }
  
  if (!hasSharedArrayBuffer || !hasCrossOriginIsolation) {
    console.log('💡 Для максимальной производительности включите Cross-Origin Isolation:');
    console.log('  - Добавьте headers в next.config.js');
    console.log('  - Cross-Origin-Embedder-Policy: credentialless');
    console.log('  - Cross-Origin-Opener-Policy: same-origin');
  }
  
  console.groupEnd();

  console.log('\n=====================================');
  console.log('🎭 Partytown диагностика завершена!');
  
  // Возвращаем сводку
  return {
    isActive: hasPartytown && partytownScripts.length > 0,
    mode: hasSharedArrayBuffer && hasCrossOriginIsolation ? 'atomics' : 'service-worker',
    scriptsCount: partytownScripts.length,
    debug: partytownConfig.debug || false,
    forwards: partytownConfig.forward || [],
    sandboxLoaded: !!partytownSandbox,
    workerActive: workerEntries.length > 0
  };
})();