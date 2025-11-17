# Product Feature

Модуль для работы с товарами: отображение каталога, поиск, фильтрация и бесконечная подгрузка.

## Архитектура

### API Layer (`api/productApi.ts`)

**Основной API**

- `productApi.getProducts()` - получение товаров с пагинацией
- `productApi.getProduct(id)` - получение одного товара

**Структура API ответа:**

```typescript
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Название товара",
      "description": "Описание товара",
      "price": 1500.50,
      "article": "ART-001",
      "unit": "шт",
      "images": [
        {
          "url": "/uploads/image1.jpg",
          "alt": "Описание изображения"
        }
      ],
      "categoryName": "Название категории",
      "category": { ... },
      "published": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 150,
      "pageCount": 8
    }
  }
}
```

### React Query Hooks (`lib/queries.ts`)

- `useInfiniteProducts(filters)` - бесконечная подгрузка товаров
- `useProduct(id)` - получение одного товара
- `useProducts(filters)` - обычная пагинация (если нужна)

### UI Components (`ui/`)

- `InfiniteProductGrid` - сетка товаров с бесконечной подгрузкой

## Использование

### Базовый пример

```tsx
import { InfiniteProductGrid } from '@/features/Product/ui/InfiniteProductGrid'

export const CatalogPage = () => {
	return <InfiniteProductGrid />
}
```

### С фильтрами

```tsx
import { InfiniteProductGrid } from '@/features/Product/ui/InfiniteProductGrid'

export const CatalogPage = () => {
	const filters = {
		category: 'Баскетбол',
		minPrice: 1000,
		maxPrice: 50000,
		sortBy: 'price',
		sortOrder: 'asc',
	}

	return <InfiniteProductGrid filters={filters} />
}
```

### Поиск товаров

```tsx
const filters = {
	search: 'баскетбол',
	category: 'Одежда',
}

return <InfiniteProductGrid filters={filters} />
```

## Параметры API

### GET /api/products

- `start` - начальная позиция (по умолчанию 0)
- `limit` - количество записей на странице (по умолчанию 20)
- `filters[name][$contains]` - поиск по названию
- `filters[category][name][$eq]` - фильтр по категории
- `filters[price][$gte]` - минимальная цена
- `filters[price][$lte]` - максимальная цена
- `sort` - сортировка (по умолчанию 'name:asc')

### Примеры запросов

```
GET /api/products?start=0&limit=10
GET /api/products?filters[name][$contains]=спорт&sort=price:desc
GET /api/products?filters[category][name][$eq]=Баскетбол
```

## Оптимизации

1. **Мемоизация** - все компоненты обернуты в `memo()`
2. **Lazy loading** - изображения загружаются по мере скролла
3. **Intersection Observer** - автоматическая подгрузка при скролле
4. **React Query caching** - кеширование запросов на 5 минут
5. **Оптимизация изображений** - Next.js Image с lazy loading

## Конфигурация

### Изменить URL API

В `api/productApi.ts`:

```typescript
const API_URL = 'http://localhost:1337'
```

### Изменить размер страницы

В `lib/queries.ts`:

```typescript
const params = {
	...filters,
	start: pageParam,
	limit: 20, // Измените здесь
}
```

## Типы

Все типы находятся в `@/shared/types`:

- `Product` - основной тип товара для UI
- `ApiProduct` - тип из API
- `ApiResponse<T>` - обертка ответа API
- `ApiErrorResponse` - тип ошибки API
- `ProductFilters` - фильтры для товаров
- `PaginationParams` - параметры пагинации

## Troubleshooting

### Ошибка подключения к API

Убедитесь что API запущен на порту 1337:

```bash
# В директории бэкенда
npm run dev
```

### Товары не загружаются

1. Проверьте консоль браузера на ошибки
2. Проверьте Network tab в DevTools
3. Убедитесь что API возвращает правильную структуру данных
4. Проверьте что товары имеют статус `published: true`

### Ошибки трансформации данных

Если товары загружаются, но не отображаются правильно:

1. Проверьте что все обязательные поля присутствуют в API ответе
2. Убедитесь что изображения имеют правильные URL
3. Проверьте функцию `transformApiProduct` в `productApi.ts`
