# Octopus Case — Mini E-Commerce

> [English version below](#english)

---

## Turkce

Mini e-ticaret uygulamasi. Kullanici girisi, urun listeleme ve urun detay sayfalarindan olusur. Backend olarak [DummyJSON](https://dummyjson.com) API kullanilir.

### Kurulum ve Calistirma

```bash
# 1. Bagimliliklari yukleyin
npm install
# veya
yarn install

# 2. Ortam degiskeni dosyasini olusturun
cp .env.local.example .env.local
# veya manuel olarak:
echo "NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com" > .env.local

# 3. Gelistirme sunucusunu baslatin
npm run dev
# veya
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde calisir.

### Ortam Degiskenleri

| Degisken | Aciklama | Ornek Deger |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | DummyJSON API adresi | `https://dummyjson.com` |

### Uretim Derlemesi

```bash
npm run build
npm start
# veya
yarn build
yarn start
```

### Test Giris Bilgileri

```
Kullanici adi: emilys
Sifre:         emilyspass
```

### Sayfalar

| Sayfa | Yol | Aciklama |
|---|---|---|
| Giris | `/login` | Kullanici girisi. Basarili giriste `/products` sayfasina yonlendirir. |
| Urun Listesi | `/products` | Kategori filtresi, arama ve sayfalama. Sayfa basina 9 urun. |
| Urun Detay | `/products/[id]` | Urun bilgileri, gorseller, yorumlar ve sepete ekleme. |

`/products` ve `/products/[id]` sayfalari oturum gerektirir. Giris yapilmamissa `/login` sayfasina yonlendirilir.

### Teknolojiler

- **Next.js 16** — App Router ile sayfa yonetimi
- **TypeScript** — Strict mod, `any` kullanilmaz
- **Tailwind CSS v4** — Stil yonetimi
- **Zustand 5** — Global state (oturum ve sepet)
- **Native fetch** — HTTP istekleri

### Proje Yapisi

```
app/
  login/              Giris sayfasi
  products/
    (list)/           Urun listesi
    [id]/             Urun detay
components/
  auth/               Giris formu
  layout/             Header, navbar
  products/           Urun karti, filtreler, sayfalama
  ui/                 Button, Input, Checkbox
lib/
  api/                API cagri fonksiyonlari
  constants/          Endpoint tanimlari
  types/              TypeScript tip tanimlari
store/
  authStore.ts        Oturum yonetimi (Zustand + localStorage)
  cartStore.ts        Sepet yonetimi (Zustand + localStorage)
```

### Isleyis

- Sayfalar varsayilan olarak Server Component. Kullanici etkilesimi gerektiren bilesenler `"use client"` ile isaretlenir.
- Tum API cagrilari `lib/api/` altindaki merkezi fonksiyonlar uzerinden yapilir.
- Oturum bilgisi Zustand store'da tutulur ve localStorage ile kalici hale getirilir.
- Sepet islemleri optimistic update ile calisir; hata durumunda geri alinir.

---

<a id="english"></a>

## English

A mini e-commerce application with login, product listing, and product detail pages. Uses [DummyJSON](https://dummyjson.com) as the backend API.

### Setup and Running

```bash
# 1. Install dependencies
npm install
# or
yarn install

# 2. Create environment variable file
cp .env.local.example .env.local
# or manually:
echo "NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com" > .env.local

# 3. Start development server
npm run dev
# or
yarn dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | DummyJSON API base URL | `https://dummyjson.com` |

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Test Credentials

```
Username: emilys
Password: emilyspass
```

### Pages

| Page | Path | Description |
|---|---|---|
| Login | `/login` | User authentication. Redirects to `/products` on success. |
| Product List | `/products` | Category filter, search, and pagination. 9 products per page. |
| Product Detail | `/products/[id]` | Product info, images, comments, and add-to-cart. |

`/products` and `/products/[id]` are protected routes. Unauthenticated users are redirected to `/login`.

### Tech Stack

- **Next.js 16** — App Router for page management
- **TypeScript** — Strict mode, no `any`
- **Tailwind CSS v4** — Styling
- **Zustand 5** — Global state (auth and cart)
- **Native fetch** — HTTP requests

### Project Structure

```
app/
  login/              Login page
  products/
    (list)/           Product listing
    [id]/             Product detail
components/
  auth/               Login form
  layout/             Header, navbar
  products/           Product card, filters, pagination
  ui/                 Button, Input, Checkbox
lib/
  api/                API call functions
  constants/          Endpoint definitions
  types/              TypeScript type definitions
store/
  authStore.ts        Auth state (Zustand + localStorage)
  cartStore.ts        Cart state (Zustand + localStorage)
```

### How It Works

- Pages are Server Components by default. Components requiring user interaction use `"use client"`.
- All API calls go through centralized functions in `lib/api/`.
- Session data is managed via Zustand and persisted with localStorage.
- Cart operations use optimistic updates with rollback on failure.
