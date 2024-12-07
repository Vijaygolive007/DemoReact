# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




-starts with <Signup/>
    -collects info of profile , name, mail, set password and confirm password   //new_.some
    -if form does not match with regex condithions it shows error 
    -when all the data filled with regex conditions then it store data in relavent profile(proceed with sign in)
-sign in button will route the page to <Login/>
    -it collects the information from signup form using state and useNavigation
    -enter the details of email and password 
    -validates the email and password 
    -based on the validation(find) it will enters into user or admin page
-Admin(<Admin/>)
    -can see the data of users and modify and delete
-User(<UserDashboard/>)
    -it shows only the data of that user 