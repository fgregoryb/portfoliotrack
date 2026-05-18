# PortfolioTrack

Rastreador pessoal de carteira de investimentos full stack. Registre aportes em ações, FIIs, renda fixa e cripto — o sistema calcula preço médio e rentabilidade em tempo real com cotações da B3.

**[Demo ao vivo →](https://portfoliotrack-six.vercel.app)**

```
email: demo@portfoliotrack.com
senha: 123456
```

---

## Funcionalidades

- Autenticação com JWT e senhas criptografadas com bcrypt
- Cadastro de ativos por categoria (Ações, FIIs, Cripto, Renda Fixa)
- Registro de compras e vendas com histórico completo
- Cálculo de preço médio em runtime a partir das transações
- Cotações em tempo real via API Brapi
- Cálculo de rentabilidade individual e total da carteira
- Dashboard com tabela de posições e gráficos de alocação e evolução
- Rotas protegidas — cada usuário acessa apenas seus próprios dados

## Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Recharts
- Axios

**Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT + bcrypt

**Infra**
- Frontend: Vercel
- Backend: Render
- Banco: Railway

## Arquitetura

```
frontend/          # React + Vite
└── src/
    ├── components/    # PortfolioTable, AllocationChart, EvolutionChart
    ├── context/       # AuthContext (estado global de autenticação)
    ├── hooks/         # usePortfolio
    ├── pages/         # LoginPage, DashboardPage
    └── services/      # api.js (axios com interceptor JWT)

backend/           # Node.js + Express
└── src/
    ├── controllers/   # Coordenação HTTP
    ├── services/      # Regras de negócio e cálculos financeiros
    ├── routes/        # Definição das rotas REST
    ├── middlewares/   # authMiddleware (validação JWT)
    └── prisma/        # PrismaClient singleton
```

## API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastro de usuário |
| POST | /auth/login | Login e geração de JWT |
| GET | /assets | Listar ativos do usuário |
| POST | /assets | Cadastrar ativo |
| DELETE | /assets/:id | Remover ativo |
| GET | /assets/:id/transactions | Listar transações |
| POST | /assets/:id/transactions | Registrar transação |
| DELETE | /assets/:id/transactions/:id | Remover transação |
| GET | /portfolio | Posições com cotação e rentabilidade |
| GET | /portfolio/evolution | Evolução histórica do patrimônio |

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/fgregoryb/portfoliotrack.git
cd portfoliotrack

# Backend
cd backend
cp .env.example .env  # configure DATABASE_URL, JWT_SECRET, BRAPI_TOKEN
npm install
npx prisma migrate dev
node prisma/seed.js
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Autor

Gregory Rodrigues — [github.com/fgregoryb](https://github.com/fgregoryb)
