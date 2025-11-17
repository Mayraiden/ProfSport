# Checkout Feature

Модуль оформления заказа с архитектурой для будущих интеграций с СДЭК и Точка банк.

## Архитектура

### Структура
```
Checkout/
├── api/
│   └── checkoutApi.ts        # API слой с абстракциями для интеграций
├── lib/
│   └── validation.ts          # Валидация форм
├── model/
│   └── types.ts               # Типы и интерфейсы
└── ui/
    ├── CustomerDataForm.tsx   # Форма данных покупателя
    ├── DeliveryMethodForm.tsx # Форма способа доставки
    └── PaymentMethodForm.tsx  # Форма способа оплаты
```

## Интеграции

### СДЭК (доставка)
- **Текущее состояние**: Заглушка с базовой стоимостью 990 руб.
- **Место интеграции**: `checkoutApi.calculateDeliveryCost()`
- **TODO**: Заменить на реальный вызов API СДЭК для расчета стоимости доставки

```typescript
// После интеграции:
async calculateDeliveryCost(address: DeliveryAddress, items: OrderItem[]) {
  // Вызов API СДЭК
  const response = await fetch(CDEK_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      // Параметры для расчета доставки
    })
  })
  return response.json()
}
```

### Точка банк (оплата)
- **Текущее состояние**: Заглушка с моковым токеном платежа
- **Место интеграции**: 
  - `checkoutApi.createPayment()` - создание платежа
  - `checkoutApi.checkPaymentStatus()` - проверка статуса
- **TODO**: 
  1. Заменить на реальный вызов API Точка банк
  2. Добавить редирект на страницу оплаты после создания платежа
  3. Реализовать webhook для обработки уведомлений о статусе платежа

```typescript
// После интеграции:
async createPayment(amount: number, orderId: string, provider: PaymentProvider) {
  // Вызов API Точка банк
  const response = await fetch(TOCHKA_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      // Параметры для создания платежа
    })
  })
  const data = await response.json()
  return {
    paymentToken: data.payment_token,
    redirectUrl: data.redirect_url,
    status: 'pending'
  }
}
```

## Типы данных

### CheckoutFormData
Полная форма оформления заказа:
- `customer`: Данные покупателя (имя, телефон, email)
- `delivery`: Способ доставки (самовывоз/доставка)
- `payment`: Способ оплаты (онлайн/при получении)
- `agreements`: Согласия на обработку данных

### DeliveryData
Данные доставки:
- `type`: 'pickup' | 'delivery'
- `address`: ShippingAddress (объединенный тип для обоих вариантов)
- `deliveryCost`: Стоимость доставки (будет рассчитываться через СДЭК)
- `deliveryDate`: Дата доставки (от СДЭК)
- `deliveryTime`: Время доставки (от СДЭК)

### PaymentData
Данные оплаты:
- `type`: 'online' | 'cash_on_delivery'
- `provider`: 'tochka' | 'sbp' | 'card' | null
- `paymentToken`: Токен платежа (от Точка банк)
- `redirectUrl`: URL для редиректа на оплату

## Валидация

Валидация формы находится в `lib/validation.ts`:
- Проверка обязательных полей
- Валидация форматов (email, телефон)
- Проверка согласий

## Использование

```tsx
import { Checkout } from '@/widgets/Checkout/Checkout'

export default function CheckoutPage() {
  return <Checkout />
}
```

## TODO для полной интеграции

### СДЭК
- [ ] Интегрировать API расчета стоимости доставки
- [ ] Добавить выбор тарифов доставки
- [ ] Добавить карту с пунктами выдачи
- [ ] Рассчитывать дату и время доставки

### Точка банк
- [ ] Интегрировать API создания платежа
- [ ] Реализовать редирект на страницу оплаты
- [ ] Добавить webhook для обработки уведомлений
- [ ] Реализовать проверку статуса платежа
- [ ] Добавить выбор платежных методов (СБП, карты, Точка Pay)

### Общее
- [ ] Добавить обработку ошибок от внешних API
- [ ] Реализовать retry логику при ошибках
- [ ] Добавить логирование для отладки
- [ ] Добавить тесты для интеграций

