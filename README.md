# LiMessenger

LiMessenger is a [messenger](https://www.messenger.com/) clone. It has most of the messenger features.

- Real time chat - an online communication channel that allows you to conduct real-time conversations.
- File upload - a way to share images and files a chat participant
- Emojis - built with emoji-mart allows to use emojis in chat.

It has been created because I wanted to get familiar with `type-graphql` and `react`.

![app main screen](https://github.com/gwardziak/LiMessenger/blob/master/misc/appMainScreen.png)

## How to run

1. Open terminal and execute:

   ```bash
   git clone git@github.com:gwardziak/chatApp.git
   cd ./chatApp
   npm --prefix ./server install && npm --prefix ./web install
   ```

   It's going to clone the repository and install all the required dependencies.

2. In 2 different terminals run:

   ```bash
   npm --prefix ./server run start # to start the server
   npm --prefix ./web run start # to start the frontend
   ```

3. Navitage to the `http://localhost:3000` in the browser.

## Built With

- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [TypeGraphql](https://typegraphql.com/)
- [SQLite](https://www.sqlite.org/index.html)

## Contributing

Pull requests are welcome. Before implementing any major/breaking changes please open an issue and lets discuss it here first.
