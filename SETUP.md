# Central de Defesa Digital — Setup Guide

## Pré-requisitos
- Node.js 18+
- PostgreSQL 14+ (ou Supabase/Railway)
- Conta Stripe (modo teste disponível)
- Conta Resend (email)

## Instalação

```bash
# 1. Instalar dependências
cd central-defesa-digital
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Criar o banco de dados
npx prisma db push

# 4. (Opcional) Gerar dados de seed
npx prisma db seed

# 5. Rodar em desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
central-defesa-digital/
├── app/                    # Next.js App Router
│   ├── (public)/          # Páginas públicas com header/footer
│   │   ├── page.tsx       # Home — "golpe pix o que fazer"
│   │   ├── golpes/        # Páginas por tipo de golpe
│   │   ├── ferramentas/   # Ferramentas interativas
│   │   ├── blog/          # Blog educativo
│   │   ├── educacao/      # Guias educacionais
│   │   ├── parceiros/     # Parceiros jurídicos
│   │   └── sobre/         # Sobre a empresa
│   ├── (auth)/            # Login e cadastro
│   ├── (dashboard)/       # Área logada do usuário
│   ├── api/               # API Routes
│   │   ├── casos/         # CRUD de casos
│   │   ├── classify/      # Classificador de golpes
│   │   └── stripe/        # Pagamentos
│   ├── layout.tsx         # Root layout + meta SEO
│   ├── sitemap.ts         # Sitemap automático
│   └── robots.ts          # Robots.txt
│
├── components/
│   ├── layout/            # Header, Footer
│   ├── home/              # GolpeClassifier, Pricing, Stats, FAQ
│   └── tools/             # Ferramentas interativas
│
├── lib/
│   ├── golpe-classifier.ts # IA de classificação de golpes
│   ├── pdf-generator.ts    # Gerador de texto dos documentos
│   ├── prisma.ts           # Cliente Prisma singleton
│   ├── stripe.ts           # Cliente Stripe
│   └── utils.ts            # Utilitários gerais
│
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
│
├── ROADMAP.md              # Roadmap técnico completo
└── SETUP.md                # Este arquivo
```

## Variáveis de Ambiente Obrigatórias

```env
DATABASE_URL=              # PostgreSQL connection string
NEXTAUTH_SECRET=           # Gerado com: openssl rand -base64 32
STRIPE_SECRET_KEY=         # Dashboard Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=     # Criado no Stripe Dashboard
NEXT_PUBLIC_APP_URL=       # URL do app (ex: https://defesapix.com.br)
```

## Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### PostgreSQL
Recomendamos Railway ou Supabase para PostgreSQL gerenciado.

### Stripe Webhooks
Configure o endpoint no Stripe Dashboard:
- URL: https://seudominio.com.br/api/stripe
- Eventos: checkout.session.completed, payment_intent.succeeded

## Customização de Conteúdo

### Adicionar novo tipo de golpe
1. Editar `lib/golpe-classifier.ts` → adicionar keywords e meta
2. Criar `app/(public)/golpes/[nome]/page.tsx`
3. Adicionar ao sitemap em `app/sitemap.ts`
4. Adicionar ao nav em `components/layout/Header.tsx`

### Adicionar artigo ao blog
1. Adicionar ao array `ARTIGOS` em `app/(public)/blog/[slug]/page.tsx`
2. Adicionar slug ao `generateStaticParams`
3. Adicionar ao sitemap em `app/sitemap.ts`
4. Adicionar à listagem em `app/(public)/blog/page.tsx`

Em produção, os artigos devem vir do banco de dados Prisma (`Artigo` model).
