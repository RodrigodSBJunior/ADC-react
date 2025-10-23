# Sistema ADC - CRUD de Usuários

Sistema completo de gerenciamento de usuários com frontend React e backend Spring Boot conectado ao SQL Server.

## Configuração do Banco de Dados

### 1. Instalar SQL Server
- Baixe e instale o SQL Server Express
- Configure com usuário `sa` e senha `123456`

### 2. Criar o Banco de Dados
Execute o script `BACK/database_setup.sql` no SQL Server Management Studio:

```sql
CREATE DATABASE divulgai_db;
GO
USE divulgai_db;
GO
```

## Configuração do Backend

### 1. Navegar para a pasta do backend
```bash
cd BACK
```

### 2. Executar a aplicação Spring Boot
```bash
./mvnw spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

### Endpoints da API:
- `POST /api/v1/usuarios/cadastro` - Cadastrar usuário
- `POST /api/v1/usuarios/login` - Login
- `GET /api/v1/usuarios/{id}` - Buscar usuário por ID
- `PUT /api/v1/usuarios/{id}` - Atualizar usuário
- `DELETE /api/v1/usuarios/{id}` - Deletar usuário
- `GET /api/v1/usuarios` - Listar todos os usuários

## Configuração do Frontend

### 1. Navegar para a pasta do frontend
```bash
cd FRONT
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Executar a aplicação React
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## Funcionalidades

### Cadastro de Usuário
- Nome completo
- Email (único)
- CPF (único)
- Telefone
- Data de nascimento
- Sexo
- Tipo de usuário (Paciente/Profissional)
- Senha

### Login
- Email e senha
- Validação do tipo de usuário
- Redirecionamento automático baseado no tipo

### Gerenciamento de Estado
- Dados do usuário salvos no localStorage
- Contexto React para gerenciar estado global
- Persistência de sessão

## Estrutura do Projeto

```
ADC-react-1/
├── BACK/                          # Backend Spring Boot
│   ├── src/main/java/com/itb/inf2am/divulgai/
│   │   ├── controller/            # Controllers REST
│   │   ├── model/
│   │   │   ├── entity/           # Entidades JPA
│   │   │   ├── repository/       # Repositórios
│   │   │   └── services/         # Serviços de negócio
│   │   └── config/               # Configurações
│   ├── src/main/resources/
│   │   └── application.properties # Configurações do banco
│   └── database_setup.sql        # Script de criação do banco
├── FRONT/                        # Frontend React
│   ├── src/
│   │   ├── services/             # Serviços de API
│   │   ├── context/              # Contextos React
│   │   ├── pages/                # Páginas
│   │   └── assets/               # Recursos estáticos
│   └── package.json
└── README.md
```

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.5.3
- Spring Data JPA
- SQL Server
- Maven

### Frontend
- React 18
- Vite
- React Router
- Context API
- CSS3

## Configurações Importantes

### Banco de Dados (application.properties)
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=divulgai_db;encrypt=false;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
```

### CORS
O backend está configurado para aceitar requisições de qualquer origem (`@CrossOrigin(origins = "*")`).

### API Base URL (Frontend)
```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

## Testando o Sistema

1. Inicie o SQL Server
2. Execute o backend (`./mvnw spring-boot:run`)
3. Execute o frontend (`npm run dev`)
4. Acesse `http://localhost:5173`
5. Teste o cadastro e login de usuários

## Dados de Teste

O script SQL inclui dois usuários de exemplo:
- **Paciente**: joao@email.com / 123456
- **Profissional**: maria@email.com / 123456