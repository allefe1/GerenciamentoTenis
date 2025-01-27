# Sistema de Gerenciamento de Tênis

Um sistema de administração desenvolvido em Angular para gerenciar vendas de tênis, permitindo o controle de produtos, clientes e status de pedidos.

## 🚀 Funcionalidades

- ✨ Interface moderna com Material Design
- 📱 Layout responsivo com menu lateral
- 🔍 Busca de produtos
- ✏️ CRUD completo (Criar, Ler, Atualizar, Deletar)
- 🎯 Gestão de status (Completed, Pending, Cancelled)
- 📊 Paginação de resultados
- 🎨 Indicadores visuais de status com cores diferentes

## 🛠️ Tecnologias Utilizadas

- Angular 17
- Angular Material
- JSON Server (para simular API REST)
- TypeScript
- RxJS

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM (Node Package Manager)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/allefe1/GerenciamentoTenis]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor JSON:
```bash
npm run server
```

4. Em outro terminal, inicie a aplicação:
```bash
npm start
```

## 💻 Como usar

1. Acesse a aplicação através do navegador em `http://localhost:4200`
2. Use o menu lateral para navegar entre as seções
3. Para adicionar um novo item, clique no botão "Adicionar Novo"
4. Para editar ou excluir, use os botões de ação na tabela
5. Use o campo de busca para filtrar os resultados

## 🗄️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-dialog/
│   │   └── sneaker-dialog/
│   ├── models/
│   │   └── sneaker.model.ts
│   ├── services/
│   │   └── sneaker.service.ts
│   └── app.component.ts
├── assets/
└── styles/
```

## 📝 Funcionalidades Detalhadas

### Gestão de Produtos
- Cadastro de novos tênis
- Edição de produtos existentes
- Exclusão de produtos
- Visualização em tabela com paginação

### Status do Pedido
- Completed (Verde)
- Pending (Amarelo)
- Cancelled (Vermelho)

### Busca e Filtros
- Busca por texto em todos os campos
- Paginação com opções de 5, 10, 25 ou 100 itens por página

## 👥 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎯 Status do Projeto

O projeto está em desenvolvimento ativo e aberto para contribuições.

## 📌 Versão

1.0.0

## ✒️ Autor

Allefe Filipe - [allefe1](https://github.com/allefe1)

---
⌨️ feito por [Allefe Filipe]
