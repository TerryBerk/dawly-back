# 🧪 Тесты Dawly Backend

Эта папка содержит все тесты для backend части проекта Dawly.io.

## 📁 Структура

```
tests/
├── README.md                    # Этот файл
├── api/                         # API тесты
│   └── articles.test.ts        # Пример API теста
├── database/                    # Тесты базы данных
├── services/                    # Тесты сервисов
├── integration/                 # Интеграционные тесты
│   └── integration.test.ts     # Основной интеграционный тест
├── unit/                        # Unit тесты
├── e2e/                        # End-to-end тесты
└── mocks/                      # Моки для тестов
```

## 📁 Содержание

### 🔧 Интеграционные тесты
- **integration.test.ts** - Интеграционные тесты API и базы данных

### 📋 Конфигурация тестов
- **jest.config.js** - Конфигурация Jest (если есть)
- **test setup** - Настройки тестов

## 🏗️ Структура тестов

### Префиксы для файлов:
- `*.test.js` - Jest тесты
- `*.spec.js` - Спецификации
- `*.test.ts` - TypeScript тесты
- `*.spec.ts` - TypeScript спецификации
- `integration.*` - Интеграционные тесты
- `unit.*` - Unit тесты
- `e2e.*` - End-to-end тесты

### Типы тестов:
- **Unit тесты** (`unit/`) - тестирование отдельных функций и методов
- **Integration тесты** (`integration/`) - тестирование API endpoints и взаимодействия с БД
- **E2E тесты** (`e2e/`) - end-to-end тестирование полного flow
- **API тесты** (`api/`) - тестирование REST и GraphQL endpoints
- **Database тесты** (`database/`) - тестирование работы с базой данных
- **Services тесты** (`services/`) - тестирование бизнес-логики

## 🚀 Запуск тестов

### Все тесты
```bash
npm test
```

### Тесты в режиме watch
```bash
npm run test:watch
```

### Тесты с покрытием
```bash
npm run test:coverage
```

### Конкретный тест
```bash
npm test -- --testNamePattern="API"
```

### Тесты по типу
```bash
# API тесты
npm test -- --testPathPattern="api"

# Интеграционные тесты
npm test -- --testPathPattern="integration"

# Database тесты
npm test -- --testPathPattern="database"

# Unit тесты
npm test -- --testPathPattern="unit"
```

## 📝 Правила написания тестов

### 1. Структура теста
```typescript
describe('API Endpoint', () => {
  it('should return correct response', async () => {
    // Arrange
    const request = { /* test data */ };
    
    // Act
    const response = await apiCall(request);
    
    // Assert
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(expectedData);
  });
});
```

### 2. Именование
- Файлы: `FeatureName.test.ts`
- Описания: `should [expected behavior]`
- Группы: `API`, `Database`, `Service`

### 3. Организация
- API тесты: `tests/api/`
- Database тесты: `tests/database/`
- Service тесты: `tests/services/`
- Integration тесты: `tests/integration/`

## 🔧 Настройка

### Jest конфигурация для Strapi
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
  ],
};
```

### Тестовое окружение
```typescript
// tests/setup.ts
import { Strapi } from '@strapi/strapi';

beforeAll(async () => {
  // Инициализация тестовой БД
});

afterAll(async () => {
  // Очистка тестовой БД
});
```

## 📊 Покрытие кода

Минимальное покрытие: 80%
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## 🔄 CI/CD

Тесты автоматически запускаются:
- При каждом PR
- При merge в main
- При деплое
- Перед релизом

## 🗄️ Тестовая база данных

### Настройка
```bash
# Создание тестовой БД
DATABASE_NAME=dawly_test npm run test
```

### Очистка
```typescript
// Автоматическая очистка после каждого теста
afterEach(async () => {
  await cleanupTestData();
});
```

## 📋 Чек-лист для новых тестов

- [ ] Тест покрывает основную функциональность
- [ ] Тест проверяет edge cases
- [ ] Тест имеет понятное описание
- [ ] Тест не зависит от других тестов
- [ ] Тест очищает после себя ресурсы
- [ ] Тест добавлен в CI/CD pipeline
- [ ] Тест использует моки для внешних зависимостей
- [ ] Тест проверяет ошибки и исключения
- [ ] Тест помещен в правильную папку (api/database/services/integration/unit/e2e)

## 🎯 Рекомендации

### Для API тестов:
- Тестируйте все HTTP методы (GET, POST, PUT, DELETE)
- Проверяйте валидацию входных данных
- Тестируйте обработку ошибок

### Для Database тестов:
- Используйте транзакции для изоляции тестов
- Очищайте данные после каждого теста
- Тестируйте миграции

### Для Integration тестов:
- Тестируйте полные flow
- Проверяйте взаимодействие с внешними сервисами
- Тестируйте производительность

## 🔍 Отладка тестов

### Логирование
```typescript
console.log('Test data:', testData);
console.log('Response:', response);
```

### Временные файлы
```typescript
// Сохранение ответов для анализа
fs.writeFileSync('test-response.json', JSON.stringify(response, null, 2));
```

---

**Последнее обновление:** 21 июля 2025 