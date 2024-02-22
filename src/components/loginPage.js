export const loginLayout =()=>{
    let html
    return (html = `

    <div class="logindiv">
            <h2>Welcom to Z01-Dakar</h2>
            <h2 class="title_login">Login</h2>

            <form method="POST" class="form login">

                <div class="form__field">
                   
                    <input autocomplete="username" id="login__username" type="text" name="username" class="form__input login__username"
                        placeholder="Username or email" required>
                </div>

                <div class="form__field">
                    <input id="login__password" type="password" name="password" class="form__input login__password"
                        placeholder="Password" required>
                </div>
                
                <div class="form__field">
                <input type="submit" class="submit_login" value="Sign In">
                </div>
                <div class="errorMsg"></div>

            </form>

    </div>
    `);
}