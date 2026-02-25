# Central de Defesa Digital — Roadmap Técnico

## Stack Tecnológico

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Next.js 14 (App Router) | SSR nativo para SEO máximo |
| Linguagem | TypeScript | Type safety e manutenibilidade |
| Estilo | Tailwind CSS | Design system escalável |
| Banco de Dados | PostgreSQL + Prisma | Escalável, relacional, tipado |
| Autenticação | NextAuth.js | Auth social + credenciais |
| Pagamentos | Stripe | Padrão de mercado, seguro |
| Deploy | Vercel (app) + Railway/Supabase (DB) | Escalabilidade automática |
| CDN/Storage | Vercel Edge + S3 | PDFs e assets |
| Email | Resend | Entrega confiável |
| Analytics | Vercel Analytics + GA4 | Sem cookies para LGPD |
| Monitoramento | Sentry | Error tracking |

---

## Fases de Desenvolvimento

### FASE 1 — MVP (Semanas 1-4) ✅
- [x] Landing page otimizada para "golpe pix o que fazer"
- [x] Classificador de golpes (client-side)
- [x] Ferramenta MED gratuita (prévia) + paga (PDF completo)
- [x] Gerador de BO (gratuito)
- [x] Checklist interativo
- [x] Simulador de recuperação
- [x] Blog com artigos fundamentais
- [x] Página educacional
- [x] Páginas individuais por tipo de golpe (7 tipos)
- [x] Sistema de parceiros jurídicos
- [x] Pricing page
- [x] Auth (login/cadastro)
- [x] Dashboard básico
- [x] Schema Prisma completo
- [x] APIs: /casos, /classify, /stripe
- [x] Sitemap e robots.txt
- [x] Schema FAQ para SEO

### FASE 2 — Crescimento (Semanas 5-8)
- [ ] Integração completa com Stripe (webhooks)
- [ ] Geração de PDF real com jsPDF
- [ ] Upload de documentos (evidências) para S3
- [ ] Email de confirmação e acompanhamento
- [ ] Dashboard com casos reais do banco de dados
- [ ] Sistema de depoimentos com aprovação
- [ ] Newsletter com Resend
- [ ] 20+ artigos no blog (cluster de conteúdo)
- [ ] Google Search Console setup
- [ ] Schema Review para depoimentos
- [ ] Páginas de golpe: CARTAO, PHISHING, CONSIGNADO
- [ ] Ferramenta: Queixa BACEN
- [ ] Página: Termos, Privacidade, LGPD, Cookies

### FASE 3 — Escala (Semanas 9-16)
- [ ] Área do especialista (dashboard de parceiros jurídicos)
- [ ] Sistema de agendamento de consultas
- [ ] Chat de suporte (Intercom/Crisp)
- [ ] Integração com Procon (API onde disponível)
- [ ] Ferramenta: Rastreador de processo (webscraping)
- [ ] App móvel (React Native)
- [ ] API pública para parceiros
- [ ] Programa de afiliados para advogados
- [ ] Relatórios automatizados de casos

### FASE 4 — Monetização Avançada (Semanas 17-24)
- [ ] Plano Mensal com documentos ilimitados (R$47/mês)
- [ ] White-label para escritórios de advocacia
- [ ] Marketplace de serviços jurídicos
- [ ] Integração com plataformas de crédito (Score de recuperação)
- [ ] B2B: Licenciamento para bancos (prevenção antifraude)

---

## Estratégia SEO

### Pilares de Conteúdo (Cluster Structure)

```
PILLAR: "Golpe Pix o que fazer" (Home)
├── CLUSTER: Tipos de golpe
│   ├── golpe-pix (alta concorrência, alto volume)
│   ├── golpe-whatsapp (médio volume)
│   ├── golpe-boleto (médio volume)
│   ├── golpe-romance (baixo volume, low competition)
│   ├── golpe-emprego (baixo volume)
│   ├── golpe-investimento (médio volume)
│   └── golpe-clone-app (baixo volume)
├── CLUSTER: Ferramentas
│   ├── contestacao-med (alta intenção de compra)
│   ├── gerador-bo (alta intenção)
│   ├── notificacao-banco (alta intenção)
│   └── simulador-recuperacao (alto engajamento)
└── CLUSTER: Blog (long-tail)
    ├── "MED banco central como funciona"
    ├── "banco responsavel golpe digital STJ"
    ├── "como registrar BO online"
    └── [40+ artigos planejados]
```

### Palavras-chave Prioritárias

| Keyword | Volume Est. | Dificuldade | Prioridade |
|---------|------------|-------------|-----------|
| golpe pix o que fazer | 40.500/mês | Alta | P1 |
| recuperar dinheiro golpe pix | 22.200/mês | Alta | P1 |
| MED pix mecanismo devolução | 8.100/mês | Média | P1 |
| golpe whatsapp o que fazer | 12.100/mês | Alta | P2 |
| boletim ocorrência golpe digital | 6.600/mês | Baixa | P2 |
| banco responsável golpe pix | 4.400/mês | Média | P2 |
| investimento falso recuperar dinheiro | 3.600/mês | Média | P3 |

### Backlink Strategy
1. **PR/Imprensa**: Dados sobre golpes → EXAME, UOL, G1
2. **Guest posts**: Blogs jurídicos e de finanças
3. **Ferramentas gratuitas**: Links naturais de quem compartilha o gerador de BO
4. **Parcerias**: Procon, Febraban, delegacias digitais
5. **YouTube**: Canal educativo → links na bio e vídeos

---

## Arquitetura de Banco de Dados

```
users (1) ──< (N) casos ──< (N) documentos
users (1) ──< (N) payments ──> (N) documentos
casos (1) ──< (N) acoes_caso
users (1) ──< (N) depoimentos
artigos (standalone)
parceiros (standalone)
newsletter_subscribers (standalone)
```

### Escalabilidade
- **Índices**: emailVitima, tipoGolpe, createdAt, status em `casos`
- **Particionamento**: Por data em `casos` quando > 100k registros
- **Cache**: Redis para `artigos` (TTL: 1h) e classificação de golpes
- **CDN**: Vercel Edge para páginas estáticas (ISR com revalidation)

---

## Estimativa de Custos (MRR)

| Serviço | Custo/mês |
|---------|-----------|
| Vercel Pro | $20 |
| Railway PostgreSQL | $20 |
| Resend (email) | $20 |
| Stripe (2.9% + R$0,09/tx) | variável |
| **Total fixo** | ~$60/mês |

### Projeção de Receita (6 meses)

| Mês | Visitantes | Conv. 1% | Receita |
|-----|-----------|----------|---------|
| 1 | 2.000 | 20 docs | R$580 |
| 2 | 5.000 | 50 docs | R$1.450 |
| 3 | 12.000 | 120 docs | R$3.480 |
| 4 | 25.000 | 250 docs | R$7.250 |
| 5 | 40.000 | 400 docs | R$11.600 |
| 6 | 60.000 | 600 docs | R$17.400 |

---

## Estrutura de Monetização

```
GRATUITO
├── Classificador de golpes
├── Checklist personalizado
├── Simulador de recuperação
├── Guias educativos (blog)
├── Modelos de BO (texto)
└── Plano de ação básico

PAGO — TRANSAÇÃO
├── R$29: Documento individual em PDF
│   └── MED, BO, Notificação, Checklist Premium
└── R$97: Revisão por especialista
    └── Todos os docs + análise humana + indicação de advogado

PAGO — RECORRENTE (Fase 2)
└── R$47/mês: Plano Mensal
    └── Documentos ilimitados + dashboard + suporte

B2B (Fase 4)
├── Licença para escritórios: R$497/mês
└── White-label para bancos: sob consulta
```

---

## Métricas de Sucesso (KPIs)

### SEO
- Posição média para "golpe pix o que fazer": Top 3 em 6 meses
- Tráfego orgânico: 60.000 visitas/mês em 6 meses
- Backlinks únicos: 200+ em 12 meses
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Produto
- Taxa de conversão gratuito → pago: 1%
- Taxa de conclusão do checklist: 60%
- NPS: > 70
- Churn: < 5% (planos mensais)

### Negócio
- MRR em 12 meses: R$50.000
- CAC: < R$30
- LTV: > R$150
