# 🍕 Pizza Planet - Sistema Interno de Gestão de Cardápio e Pedidos

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Pizza Planet é um sistema interno em **Next.js** para gerenciamento de cardápio e pedidos de pizzaria. Permite cadastrar, editar e remover pizzas, além de criar, atualizar e finalizar pedidos com interface moderna e intuitiva.

---

## 💻 Funcionalidades

- **Home:** Página inicial com informações do sistema e botões de acesso rápido para Cardápio e Pedidos.
- **Cardápio:** 
  - Cadastrar, editar e remover pizzas.
  - Campos obrigatórios: Nome, Descrição, Preço e Imagem.
- **Pedidos:** 
  - Criar e atualizar pedidos.
  - Selecionar pizzas e quantidade.
  - Finalizar pedidos.
  - Filtrar pedidos por status: Todos, Em execução, Finalizados.
  - Modal com total do pedido e verificação de campos obrigatórios.

---

## 🗂 Estrutura do Projeto
```
app/
├─ page.tsx # Página inicial
├─ cardapio.tsx # Página de gerenciamento de cardápio
└─ pedido.tsx # Página de gerenciamento de pedidos

data/
└─ cardapio.js # Base inicial do cardápio

components/
└─ Header.tsx # Componente de header/navegação

```

---

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/pizza-planet.git
```

2. Acesse o projeto:
```bash
cd pizza-planet
```

3. Instale as dependências:
```bash
npm install
```

4. Rode o projeto em modo de desenvolvimento:
```bash
npm run dev
```
5. Abra no navegador:
```bash
http://localhost:3000
```

## 🎨 Layout e Design

- Design moderno com cores preto e verde neon.
- Cards com animação "float" para pizzas.
- Layout responsivo, otimizado para desktop e mobile.
- Modal interativo para criação/edição de pedidos.

## 📸 Screenshots
- Home
- Cardápio
- Pedidos

⚙️ Observações

- Projeto front-end sem integração real com API.
- Dados armazenados localmente em estado React.
- Estudo de Next.js, Tailwind CSS e gerenciamento de estado.
