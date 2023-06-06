# Teste FrontEnd NEXT.JS
## (Atualizado) - 05/06/2023
### Este é o arquivo README para o projeto de teste para vaga de emprego. O projeto consiste em criar um aplicativo utilizando Next.js!

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML e TailwindCSS
- JavaScript e JSON
- React

## 💻 Projeto

O objetivo do site é fornecer uma plataforma para exibir aulas e permitir que os usuários filtrem, visualizem os detalhes e marquem aulas como favoritas. Além disso, há também a implementação de um sistema de autenticação.


## 💻 Instalação

Estou trabalhando para colocar o site na vercel, mas enquanto isso nao acontece voce pode usar o app no seu localhost!
- depois de clonar o projeto adicione esse comando no terminal "npm install"
- Crie um banco de dados na nuvem ou utilize o mysql do XAMPP, agora coloque o "link" dele no .env
- Depois de criar o seu banco de dados e colocar a informacao dele no .env, digite esse codigo para ser criado a tabela do prisma... npx prisma migrate dev --name nome-da-migracao
- Com esse codigo adicionado no terminal do seu projeto, ele estara pronto para ser usado, seu banco de dados ja estara preparado!
- Agora é só dar um "NPM RUN DEV" e o site sera emulado! 



## 🔖 Layout

<div align="center">
<img src="/public/login.png">
</div>
<div align="center">
<img src="/public/aulas.png">
</div>

## Melhorias?
- [ ] Colocar o site na vercel!;
- [ ] Colocar mais informaçoes no cadastro como Nome, telefone e etc...;
- [ ] Colocar no banco de dados a JSON para possibilitar que os favoritos fiquem salvos mesmo depois de sair da conta!
- [ ] Substituir o CONTEXT por JWT para melhorar a segurança e etc...;
- [ ] Fatorar o código, substituindo alguns arquivos ou screens por componentes;
- [ ] Utilizar uma biblioteca nodemailer que envia email para recuperar a senha...
- [ ] Utilizar uma api que verifica que o email exista antes de criar a conta!
